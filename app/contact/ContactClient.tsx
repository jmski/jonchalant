'use client';

import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { PresenceAuditFlow } from "@/components/forms/PresenceAuditFlow";

export default function ContactClient() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageTransition animation="fade">

        <SectionWrapper variant="primary">
          <SectionContent>
            <div className="presence-audit-page">
              <div className="presence-audit-page-header">
                <div className="presence-audit-opening-mark" aria-hidden="true" />
                <span className="presence-audit-eyebrow">Free Presence Audit</span>
                <h1 className="presence-audit-page-title">
                  Find Out Where Your Presence Is Breaking Down
                </h1>
                <p className="presence-audit-page-subtitle">
                  Answer two quick questions and Jon will personally review
                  your biggest presence gap — free, within 48 hours. No sales
                  pitch. Just a real read.
                </p>
                <blockquote className="presence-audit-jon-note">
                  <p>"Most people I work with have never had someone sit with them and honestly name what's holding their presence back. That's what this is — straight talk, no pitch."</p>
                  <cite>— Jon</cite>
                </blockquote>
              </div>

              <PresenceAuditFlow />
            </div>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
