'use client'

import { useState } from 'react'
import { PresenceCoach } from './PresenceCoach'

export default function PresenceCoachWidget({
  userId,
  firstName,
}: {
  userId: string
  firstName: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="portal-coach-widget">
      {/* Drawer — always mounted to preserve chat history, shown/hidden via CSS */}
      <div
        className={`portal-coach-drawer${open ? ' portal-coach-drawer--open' : ''}`}
        role="dialog"
        aria-label="AI Presence Coach"
        aria-hidden={!open}
      >
        <div className="portal-coach-drawer-header">
          <span className="portal-coach-drawer-title">AI Presence Coach</span>
          <button
            className="portal-coach-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close coach"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="portal-coach-drawer-body">
          <PresenceCoach userId={userId} firstName={firstName} />
        </div>
      </div>

      {/* Floating action button */}
      <button
        className={`portal-coach-fab${open ? ' portal-coach-fab--active' : ''}`}
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close AI Coach' : 'Open AI Coach'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M17 2H3a1 1 0 00-1 1v10a1 1 0 001 1h6l3 3 3-3h2a1 1 0 001-1V3a1 1 0 00-1-1z"
              fill="currentColor"
            />
          </svg>
        )}
        <span className="portal-coach-fab-label">{open ? 'Close' : 'AI Coach'}</span>
      </button>
    </div>
  )
}
