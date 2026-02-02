'use client';
import { useState, useEffect, useRef } from 'react';

interface PlatformStats {
  platform: string;
  followers: number;
  totalViews: number;
  avgEngagementRate: number;
  monthlyGrowth: number;
  profileUrl: string;
  updatedAt: string;
}

interface AnimatedStatCardProps {
  stat: PlatformStats;
}

function formatNumber(num: number, decimals = 0) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(decimals)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(decimals)}K`;
  return num.toString();
}

function AnimatedValue({ value, decimals = 0, duration = 2 }: { value: number; decimals?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(value * easeOut);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <div ref={ref}>{formatNumber(count, decimals)}</div>;
}

export default function AnimatedStatCard({ stat }: AnimatedStatCardProps) {
  return (
    <a
      href={stat.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-center p-6 card-enhanced hover:scale-105 transition-all duration-300 group"
    >
      <div className="text-sm font-medium mb-2 uppercase tracking-wider group-hover:transition-colors" style={{ color: 'var(--text-accent-secondary)' }}>
        {stat.platform}
      </div>
      <div className="text-4xl font-bold mb-4" style={{ color: 'var(--text-accent-bright)' }}>
        <AnimatedValue value={stat.followers} />
      </div>
      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Followers</p>

      {stat.totalViews > 0 && (
        <div className="py-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-light)' }}>
            <AnimatedValue value={stat.totalViews} />
          </div>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Total Views</p>
        </div>
      )}

      {stat.avgEngagementRate > 0 && (
        <div className="py-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-lg font-bold group-hover:transition-colors" style={{ color: 'var(--text-accent-secondary)' }}>
            <AnimatedValue value={stat.avgEngagementRate} decimals={1} duration={1.5} />%
          </div>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Avg Engagement</p>
        </div>
      )}
    </a>
  );
}
