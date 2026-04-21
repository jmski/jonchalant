'use client';

import { useEffect, useRef, useState } from 'react';

interface FeaturedVideoProps {
  videoUrl: string;
  title?: string;
  caption?: string;
}

export default function FeaturedVideo({ videoUrl, title, caption }: FeaturedVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduceMotion(media.matches);

    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.5) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      },
      { threshold: [0, 0.5] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    setPaused(false);
  };

  return (
    <section ref={sectionRef} className="dance-reel">
      <video
        ref={videoRef}
        className="dance-reel-video"
        src={videoUrl}
        muted
        loop
        playsInline
        aria-hidden="true"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />

      <div className="dance-reel-overlay" aria-hidden="true" />

      {paused && (
        <button
          className="dance-reel-play-overlay"
          onClick={handlePlayClick}
          aria-label="Play video"
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
            <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M26 21l22 11-22 11V21z" />
          </svg>
        </button>
      )}

      {(title || caption) && (
        <div className="dance-reel-caption dance-reel-caption--visible">
          {title && <p className="dance-reel-caption-title">{title}</p>}
          {caption && <p className="dance-reel-caption-line">{caption}</p>}
        </div>
      )}

      <button
        className="dance-reel-sound"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </button>
    </section>
  );
}
