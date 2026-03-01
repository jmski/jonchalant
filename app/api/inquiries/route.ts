import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, company, collaborationType, message } = body;

    // Validate required fields
    if (!name || !email || !collaborationType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For now, just return success response
    // In the future, you can integrate with email service or database
    console.log('Inquiry received:', { name, email, company, collaborationType, message });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully. We will review and get back to you soon.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
