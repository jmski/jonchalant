import { Collaboration } from '@/components/shared/collaboration';

interface CollaborationPackagesProps {
  packages: any[];
}

export function CollaborationPackages({ packages }: CollaborationPackagesProps) {
  return (
    <section id="collaboration-section">
      <div className="space-y-3 mb-12">
        <h2 
          className="text-3xl sm:text-4xl font-bold leading-tight"
          style={{ 
            fontSize: 'clamp(1.875rem, 5vw, 2.25rem)',
            color: 'var(--text-primary)' 
          }}
        >
          Collaboration Packages
        </h2>
        <div 
          className="w-20 h-1"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
      </div>

      <Collaboration packages={packages} />
    </section>
  );
}
