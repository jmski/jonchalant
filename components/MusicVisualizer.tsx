'use client';

import { useEffect, useRef } from 'react';

interface MusicVisualizerProps {
  audioElement: HTMLAudioElement | null;
  width?: number;
  height?: number;
  barCount?: number;
  className?: string;
}

export default function MusicVisualizer({
  audioElement,
  width = 400,
  height = 100,
  barCount = 32,
  className = '',
}: MusicVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<boolean>(false);

  useEffect(() => {
    if (!audioElement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupAudio = () => {
      if (audioContextRef.current) return;

      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioContextRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        try {
          const source = audioCtx.createMediaElementSource(audioElement);
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
        } catch (e) {
          // Already connected
        }
      } catch (e) {
        console.warn('Audio context setup failed:', e);
      }
    };

    const handlePlay = () => {
      setupAudio();
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    let animationId: number;
    const animate = () => {
      if (!analyserRef.current || !dataArrayRef.current || !ctx) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      (analyserRef.current.getByteFrequencyData as any)(dataArrayRef.current);

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 6, 20, 0.1)';
      ctx.fillRect(0, 0, width, height);

      const barWidth = width / barCount;
      let x = 0;

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * dataArrayRef.current.length);
        const barHeight = (dataArrayRef.current[dataIndex] / 255) * height;

        // Calculate color based on frequency
        const hue = (i / barCount) * 360 + 180;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
        ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }

      animationId = requestAnimationFrame(animate);
    };

    audioElement.addEventListener('play', handlePlay);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      audioElement.removeEventListener('play', handlePlay);
    };
  }, [audioElement, width, height, barCount]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`${className}`}
      style={{
        display: 'block',
        borderRadius: '8px',
        backgroundColor: 'var(--bg-secondary)',
      }}
    />
  );
}
