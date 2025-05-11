import { Icons } from '@/components/icons';
import { Heading } from '@/components/layout/heading';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@repo/design-system/components/ui/button';
import { Separator } from '@repo/design-system/components/ui/separator';
import { cn } from '@repo/design-system/lib/utils';
import Link from 'next/link';

export default function ProjectPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Projects"
            // description="Manage projects (Server side table functionalities.)"
          />
          <Link
            href="/projects/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Icons.project className="h-4 w-4" /> Create project
          </Link>
        </div>
        <Separator />
      </div>
    </PageContainer>
  );
}
