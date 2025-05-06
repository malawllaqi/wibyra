import { Button } from '@repo/design-system/components/ui/button';

export default function Home() {
  return (
    <div className="">
      <main className="flex h-screen flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <Button className="w-36" size={'sm'}>
            Hey
          </Button>
          <Button className="w-36" size={'sm'} variant={'secondary'}>
            Hey
          </Button>
        </div>
      </main>
    </div>
  );
}
