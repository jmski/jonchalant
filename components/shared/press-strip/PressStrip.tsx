import Image from 'next/image'

interface PressMention {
  _id: string
  outlet: string
  type?: string
  url?: string
  logo?: { asset: { url: string } }
}

interface PressStripProps {
  mentions: PressMention[]
}

export function PressStrip({ mentions }: PressStripProps) {
  if (!mentions || mentions.length === 0) return null

  return (
    <div className="press-strip">
      <p className="press-strip-label">As heard &amp; seen on</p>
      <ul className="press-strip-list">
        {mentions.map((mention) => {
          const inner = mention.logo?.asset?.url ? (
            <Image
              src={mention.logo.asset.url}
              alt={mention.outlet}
              width={120}
              height={40}
              className="press-strip-logo"
              sizes="120px"
              quality={60}
            />
          ) : (
            <span className="press-strip-name">{mention.outlet}</span>
          )

          return (
            <li key={mention._id} className="press-strip-item">
              {mention.url ? (
                <a
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-strip-link"
                  aria-label={mention.outlet}
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
