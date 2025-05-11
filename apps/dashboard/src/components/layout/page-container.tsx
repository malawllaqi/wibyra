import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import type { ReactNode } from 'react';

export default function PageContainer({
  children,
  scrollable = true,
}: {
  children: ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <main className="flex flex-1 p-4 md:px-6">{children}</main>
        </ScrollArea>
      ) : (
        <main className="flex flex-1 p-4 md:px-6">{children}</main>
      )}
    </>
  );
}
