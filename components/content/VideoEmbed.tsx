'use client';

interface VideoEmbedProps {
  src: string;
  title: string;
  aspectRatio?: '16:9' | '4:3';
  lazy?: boolean;
}

export default function VideoEmbed({
  src,
  title,
  aspectRatio = '16:9',
  lazy = true,
}: VideoEmbedProps) {
  const paddingBottom = aspectRatio === '4:3' ? '75%' : '56.25%';

  return (
    <div className="video-container" style={{ paddingBottom }}>
      <iframe
        src={src}
        title={title}
        allowFullScreen
        loading={lazy ? 'lazy' : 'eager'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
