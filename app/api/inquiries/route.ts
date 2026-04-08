import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip, 5, 60_000)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  try {
    // Import services only when needed
    const { createClient } = await import("@supabase/supabase-js");
    const { Resend } = await import("resend");

    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        {
          success: false,
          error:
            "Server not configured. Please contact the administrator to set up the database.",
        },
        { status: 503 },
      );
    }

    if (!resendApiKey) {
      console.warn("Resend not configured - email notifications will be skipped");
    }

    // Initialize clients
    // Use SERVICE_KEY for database writes (bypasses RLS policies)
    // Use ANON_KEY as fallback (respects RLS policies)
    const supabaseKey = supabaseServiceKey || supabaseAnonKey;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    const body = await request.json();

    // Destructure and validate form data
    // Accept both `type` (new clients) and `inquiry_type` (legacy) as the type field
    const {
      name,
      email,
      inquiry_type: inquiry_type_raw,
      type: type_raw,
      message,
      phone,
      company,
      budget,
      timeline,
    } = body;

    const inquiry_type = inquiry_type_raw || type_raw;

    // Validate required fields
    if (!name || !email || !inquiry_type || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: name, email, type, message",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Validate inquiry type
    const validInquiryTypes = [
      "coaching", "collaboration", "media", "other",
      "1-on-1-coaching", "general", "presence-audit",
    ];
    if (!validInquiryTypes.includes(inquiry_type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid inquiry type. Must be one of: ${validInquiryTypes.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Save inquiry to Supabase
    const { data, error: supabaseError } = await supabase
      .from("inquiries")
      .insert([
        {
          name,
          email,
          inquiry_type,
          message,
          phone: phone || null,
          company: company || null,
          budget: budget || null,
          timeline: timeline || null,
          status: "new",
        },
      ])
      .select();

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save inquiry to database",
          details: supabaseError.message,
        },
        { status: 500 },
      );
    }

    // Define contact email address
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@jonchalant.com";

    // --- Send confirmation email to visitor ---
    if (resend) {
      try {
        await resend.emails.send({
          from: "Jonchalant <no-reply@jonchalant.com>",
          to: email,
          subject: `We Received Your ${inquiry_type.charAt(0).toUpperCase() + inquiry_type.slice(1)} Inquiry`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #2563eb;">Hi ${name},</h2>
              <p>Thanks for reaching out! I've received your inquiry and will get back to you within 24 hours.</p>
              
              <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Inquiry Type:</strong> ${inquiry_type.charAt(0).toUpperCase() + inquiry_type.slice(1)}</p>
                <p style="margin: 8px 0;"><strong>Received:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              
              <p>In the meantime, feel free to explore more about my services at <a href="https://jonchalant.com" style="color: #2563eb;">jonchalant.com</a></p>
              
              <p style="margin-top: 30px;">Looking forward to connecting!</p>
              <p>— <strong>Jonchalant</strong><br>The Kinetic Leader</p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="font-size: 12px; color: #6b7280;">
                This is an automated response. Please don't reply to this email—your response won't be received.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the form submission if email fails
      }
    } else {
      console.warn("Resend not configured - confirmation email not sent");
    }

    // --- Send notification email to Jon ---
    if (resend) {
      try {
        const inquiryTypeLabel = {
          coaching: "Leadership Coaching Inquiry",
          collaboration: "Brand Collaboration Inquiry",
          media: "Media/Speaking Inquiry",
          other: "General Inquiry",
        }[inquiry_type] || "New Inquiry";

        const messageDetails = `
          <h3>${inquiryTypeLabel}</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            ${phone ? `<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>` : ""}
            ${company ? `<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${company}</td></tr>` : ""}
            ${budget ? `<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Budget:</td><td style="padding: 8px;">${budget}</td></tr>` : ""}
            ${timeline ? `<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Timeline:</td><td style="padding: 8px;">${timeline}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px; font-weight: bold;">Submitted:</td>
              <td style="padding: 8px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          <h4 style="margin-top: 20px; color: #1f2937;">Message:</h4>
          <div style="background: #f9fafb; padding: 16px; border-left: 4px solid #2563eb; border-radius: 4px;">
            <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
          </div>
        `;

        await resend.emails.send({
          from: "Jonchalant <no-reply@jonchalant.com>",
          to: contactEmail,
          subject: `[New] ${inquiryTypeLabel}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
              <h2 style="color: #2563eb;">📬 New Inquiry in Your Dashboard</h2>
              ${messageDetails}
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="font-size: 13px; color: #6b7280;">
                <a href="https://supabase.com" style="color: #2563eb; text-decoration: none;">View all inquiries →</a>
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send notification email to Jon:", emailError);
        // Don't fail the submission if notification email fails
      }
    } else {
      console.warn("Resend not configured - notification email not sent to administrator");
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully! You'll receive a confirmation email shortly.",
        data: data?.[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Optional: GET endpoint for healthcheck
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      message: "Inquiry API endpoint is running",
      endpoints: {
        POST: "/api/inquiries - Submit a new inquiry",
      },
    },
    { status: 200 },
  );
}
