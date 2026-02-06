'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillNode {
  id: string;
  label: string;
  title: string;
  icon: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  positionStyle?: React.CSSProperties;
}

const skillNodes: SkillNode[] = [
  {
    id: 'dance',
    label: 'Dance',
    title: 'Choreography & Performance',
    icon: '💃',
    position: { top: '-12%', left: '50%' },
    positionStyle: { transform: 'translateX(-50%)' },
  },
  {
    id: 'creative',
    label: 'Creative',
    title: 'Content Creation',
    icon: '🎨',
    position: { top: '20%', left: '-6%' },
    positionStyle: {},
  },
  {
    id: 'tech',
    label: 'Tech',
    title: 'Technical Skills',
    icon: '⚙️',
    position: { top: '20%', right: '-6%' },
    positionStyle: {},
  },
  {
    id: 'collab',
    label: 'Collab',
    title: 'Collaboration',
    icon: '🤝',
    position: { bottom: '20%', left: '-6%' },
    positionStyle: {},
  },
  {
    id: 'community',
    label: 'Community',
    title: 'Community Building',
    icon: '🌟',
    position: { bottom: '20%', right: '-6%' },
    positionStyle: {},
  },
];

interface LeaderLineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  isActive: boolean;
  accentColor: string;
  containerWidth?: number;
  containerHeight?: number;
}

type SmiskiPose = 'neutral' | 'dance' | 'creative' | 'tech' | 'collab' | 'community';

interface SmiskiProps {
  pose: SmiskiPose;
}

const Smiski: React.FC<SmiskiProps> = ({ pose }) => {
  const orange = 'rgba(255, 95, 31, 0.85)';
  const orangeDarker = 'rgba(255, 95, 31, 1)';
  const pink = 'rgba(236, 72, 153, 0.5)';
  const black = 'rgba(15, 23, 42, 0.95)';

  return (
    <svg
      className="w-24 h-40 mx-auto"
      viewBox="0 0 60 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 8px 20px rgba(255, 95, 31, 0.3))',
      }}
    >
      {/* Body (rounder, more proportional teardrop shape) */}
      <ellipse
        cx="30"
        cy="48"
        rx="18"
        ry="26"
        fill={orange}
        stroke={orangeDarker}
        strokeWidth="1.5"
      />

      {/* Head (rounder, positioned to overlap with body properly) */}
      <circle
        cx="30"
        cy="18"
        r="16"
        fill={orange}
        stroke={orangeDarker}
        strokeWidth="1.5"
      />

      {/* Left Eye - BIG expressive eyes with personality */}
      <circle cx="22" cy="14" r="6" fill={black} />
      <circle cx="24" cy="11" r="2.5" fill="rgba(255, 255, 255, 0.9)" />

      {/* Right Eye - BIG expressive eyes */}
      <circle cx="38" cy="14" r="6" fill={black} />
      <circle cx="40" cy="11" r="2.5" fill="rgba(255, 255, 255, 0.9)" />

      {/* Left Eyebrow (adds expression) */}
      <path d="M 18 8 Q 22 6 26 8" stroke={black} strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Right Eyebrow (adds expression) */}
      <path d="M 34 8 Q 38 6 42 8" stroke={black} strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Smile mouth */}
      <path d="M 25 27 Q 30 31 35 27" stroke={black} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Left Cheek blush (larger, more vibrant) */}
      <circle cx="13" cy="22" r="4.5" fill={pink} />

      {/* Right Cheek blush (larger, more vibrant) */}
      <circle cx="47" cy="22" r="4.5" fill={pink} />

      {/* Left Arm (thicker, better connected to body) */}
      <rect x="0" y="42" width="12" height="25" rx="6" fill={orange} stroke={orangeDarker} strokeWidth="1" />
      {/* Left Hand (larger, more proportional) */}
      <circle cx="6" cy="70" r="5.5" fill={orange} stroke={orangeDarker} strokeWidth="1" />
      {/* Left Hand fingers detail */}
      <circle cx="3" cy="74" r="1.5" fill={orangeDarker} opacity="0.6" />
      <circle cx="9" cy="74" r="1.5" fill={orangeDarker} opacity="0.6" />

      {/* Right Arm (thicker, better connected to body) */}
      <rect x="48" y="42" width="12" height="25" rx="6" fill={orange} stroke={orangeDarker} strokeWidth="1" />
      {/* Right Hand (larger, more proportional) */}
      <circle cx="54" cy="70" r="5.5" fill={orange} stroke={orangeDarker} strokeWidth="1" />
      {/* Right Hand fingers detail */}
      <circle cx="51" cy="74" r="1.5" fill={orangeDarker} opacity="0.6" />
      <circle cx="57" cy="74" r="1.5" fill={orangeDarker} opacity="0.6" />

      {/* Left Leg (better proportioned with body) */}
      <rect x="14" y="73" width="11" height="28" rx="5.5" fill={orange} stroke={orangeDarker} strokeWidth="1" />
      {/* Left Foot (larger, better proportioned) */}
      <ellipse cx="19.5" cy="103" rx="7" ry="5" fill={orange} stroke={orangeDarker} strokeWidth="0.8" />
      {/* Left Foot toe detail */}
      <circle cx="16" cy="107" r="1.5" fill={orangeDarker} opacity="0.5" />
      <circle cx="23" cy="107" r="1.5" fill={orangeDarker} opacity="0.5" />

      {/* Right Leg (better proportioned with body) */}
      <rect x="35" y="73" width="11" height="28" rx="5.5" fill={orange} stroke={orangeDarker} strokeWidth="1" />
      {/* Right Foot (larger, better proportioned) */}
      <ellipse cx="40.5" cy="103" rx="7" ry="5" fill={orange} stroke={orangeDarker} strokeWidth="0.8" />
      {/* Right Foot toe detail */}
      <circle cx="37" cy="107" r="1.5" fill={orangeDarker} opacity="0.5" />
      <circle cx="44" cy="107" r="1.5" fill={orangeDarker} opacity="0.5" />

      {/* Belly button */}
      <circle cx="30" cy="52" r="1.2" fill={orangeDarker} opacity="0.7" />

      {/* Heart/Love accent on chest */}
      <g transform="translate(30, 38)">
        <path
          d="M -2 0 Q -3 -2 -4 -1.5 Q -5 -0.5 -3 1 Q -2 2 0 3 Q 2 2 3 1 Q 5 -0.5 4 -1.5 Q 3 -2 2 0 Q 1 1 0 1 Q -1 1 -2 0"
          fill={pink}
          opacity="0.7"
        />
      </g>

      {/* Highlight on head for 3D dimension and shine */}
      <ellipse cx="24" cy="6" rx="7" ry="5" fill="rgba(255, 255, 255, 0.18)" opacity="0.5" />

      {/* Subtle body highlight for depth */}
      <ellipse cx="28" cy="35" rx="5" ry="8" fill="rgba(255, 255, 255, 0.1)" opacity="0.3" />
    </svg>
  );
};

const SkillNode: React.FC<{ node: SkillNode; isHovered: boolean; onHover: (id: string | null) => void }> = ({
  node,
  isHovered,
  onHover,
}) => {
  return (
    <motion.div
      onHoverStart={() => onHover(node.id)}
      onHoverEnd={() => onHover(null)}
      style={{ ...node.position, ...node.positionStyle }}
      className="absolute"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -3 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`
            px-3 py-1 cursor-pointer flex items-center gap-1 backdrop-blur-md
            bg-white/6 border border-orange-400/40
            hover:bg-white/10 hover:border-orange-300/80
            transition-all duration-300 rounded-sm
            hover:shadow-lg hover:shadow-orange-500/30 text-nowrap
          `}
        >
          <span className="text-sm">{node.icon}</span>
          <div>
            <div className="text-xs font-bold text-orange-300">{node.label}</div>
            <div className="text-xs text-slate-400">{node.title}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SmiskiInteractive() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getPose = (): SmiskiPose => {
    if (!hoveredId) return 'neutral';
    return hoveredId as SmiskiPose;
  };

  return (
    <div
      className="relative w-full py-12 px-4"
      style={{
        background: `
          linear-gradient(135deg, rgba(255, 95, 31, 0.03) 0%, rgba(255, 127, 67, 0.02) 100%),
          radial-gradient(circle at 30% 50%, rgba(255, 95, 31, 0.03) 0%, transparent 50%)
        `,
      }}
    >
      {/* Central Smiski Character */}
      <div className="relative mx-auto max-w-2xl flex items-center justify-center py-8">
        <Smiski pose={getPose()} />
      </div>

      {/* Skill Nodes - positioned around Smiski */}
      {skillNodes.map((node) => (
        <SkillNode
          key={node.id}
          node={node}
          isHovered={hoveredId === node.id}
          onHover={setHoveredId}
        />
      ))}
    </div>
  );
}
