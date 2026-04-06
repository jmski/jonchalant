import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/server';
import { getCourses } from '@/lib/sanity';
import { getCourseProgress } from '@/lib/portal-progress';
import PortalShell from '@/components/portal/PortalShell';
import type { SidebarCourse } from '@/components/portal/PortalShell';

// Auth-gated portal: prevent search engines from indexing lesson content
export const metadata: Metadata = {
  title: {
    default: 'Learning Portal | Jonchalant',
    template: '%s | Jonchalant Portal',
  },
  description: 'Access your Jonchalant learning portal. Complete lessons, track your progress, and develop executive presence through body-aware leadership training.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function PortalGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let sidebarCourses: SidebarCourse[] | null = null;

  if (user) {
    try {
      const courses = await getCourses();
      if (courses?.length) {
        sidebarCourses = await Promise.all(
          courses.map(async (course: any) => {
            const modules = (course.modules ?? [])
              .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
              .map((m: any) => ({
                _id: m._id,
                title: m.title,
                order: m.order ?? 0,
                lessons: (m.lessons ?? [])
                  .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
                  .map((l: any) => ({
                    slug: l.slug?.current ?? l.slug,
                    title: l.title,
                  })),
              }));

            const allLessonSlugs = modules.flatMap((m: any) =>
              m.lessons.map((l: any) => l.slug)
            );
            const { completedSlugs } = await getCourseProgress(
              supabase,
              user.id,
              course.slug.current
            );
            const progressPct =
              allLessonSlugs.length > 0
                ? Math.floor((completedSlugs.length / allLessonSlugs.length) * 100)
                : 0;

            return {
              title: course.title,
              slug: course.slug.current,
              progressPct,
              completedSlugs,
              modules,
            };
          })
        );
      }
    } catch {
      // Non-critical — sidebar renders without course data
    }
  }

  const firstName = user
    ? ((user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
        user.email?.split('@')[0] ??
        'there')
    : undefined

  return (
    <AuthProvider>
      <PortalShell
        courses={sidebarCourses}
        userId={user?.id ?? null}
        firstName={firstName}
      >
        {children}
      </PortalShell>
    </AuthProvider>
  );
}
