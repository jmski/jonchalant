'use client';

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top left floating orb */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-float" style={{ background: 'linear-gradient(135deg, var(--light-accent-primary), var(--light-accent-secondary))' }}></div>

      {/* Top right accent */}
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full blur-3xl animate-float-delayed" style={{ background: 'linear-gradient(135deg, var(--light-accent-secondary), var(--light-pink))' }}></div>

      {/* Bottom left accent */}
      <div className="absolute bottom-32 left-1/4 w-48 h-48 rounded-full blur-3xl animate-float-slower" style={{ background: 'linear-gradient(180deg, var(--light-accent-primary), transparent)' }}></div>

      {/* Bottom right accent */}
      <div className="absolute bottom-20 right-10 w-36 h-36 rounded-full blur-3xl animate-float-delayed" style={{ background: 'linear-gradient(225deg, var(--light-accent-secondary), var(--light-accent-primary))' }}></div>

      {/* Center floating geometric shape */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full animate-spin-slow" style={{ borderColor: 'var(--light-accent-primary)' }}></div>
    </div>
  );
}
