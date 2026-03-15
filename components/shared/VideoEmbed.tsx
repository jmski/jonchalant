function getEmbedUrl(url: string): string | null {
  // YouTube: watch?v=ID or youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

export interface VideoEmbedProps {
  url: string
  title?: string
}

export function VideoEmbed({ url, title = 'Video' }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <div className="video-embed-wrapper">
      <iframe
        src={embedUrl}
        className="video-embed-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  )
}
