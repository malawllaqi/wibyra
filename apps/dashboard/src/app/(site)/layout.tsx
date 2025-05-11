import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import SiteHeader from '@/components/layout/site-header';
import { auth } from '@repo/auth/server';
import {
  SidebarInset,
  SidebarProvider,
} from '@repo/design-system/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
