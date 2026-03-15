'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

export interface InstagramEmbedProps {
  reelUrl: string
}

export function InstagramEmbed({ reelUrl }: InstagramEmbedProps) {
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    // Already loaded — just process
    if (window.instgrm) {
      window.instgrm.Embeds.process()
      setScriptReady(true)
      return
    }

    // Script tag already exists (another instance added it); poll until ready
    if (document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const interval = setInterval(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process()
          setScriptReady(true)
          clearInterval(interval)
        }
      }, 100)
      return () => clearInterval(interval)
    }

    // First instance — inject the script
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process()
      setScriptReady(true)
    }
    script.onerror = () => setScriptReady(true) // fail silently
    document.body.appendChild(script)
  }, [])

  return (
    <div className="instagram-embed-wrapper">
      {!scriptReady && (
        <div className="instagram-embed-placeholder" aria-hidden="true" />
      )}
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={reelUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: 'calc(100% - 2px)',
        }}
      />
    </div>
  )
}
