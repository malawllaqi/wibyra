import { Button } from '@repo/design-system/components/ui/button';

export default function Home() {
  return (
    <main className="">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <Button className="w-24" size={'xs'}>
            Hey
          </Button>
          <Button className="w-24" size={'xs'} variant={'secondary'}>
            Hey
          </Button>
        </div>
      </div>
    </main>
  );
}
