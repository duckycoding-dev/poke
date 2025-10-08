import Link from 'next/link';
import { PikachuWithMessage } from '../../../components/errors/pikachu-with-message';
import { Button } from '../../../components/ui/button';

export default async function NotFound() {
  return (
    <main className='max-w-[1024px] mx-auto p-4 flex flex-col gap-4'>
      <PikachuWithMessage>
        <PikachuWithMessage.PikachuImage />
        <section className='text-2xl font-extrabold max-w-[75%] text-center flex-grow flex flex-col gap-4'>
          <h1 className='text-balance'>Details for the requested Pokemon were not found.</h1>
          <Button variant={'default'} asChild={true} className={'mx-auto'}>
            <Link href="/">Go back home</Link>
          </Button>
          {/* <GoHomeButton /> */}
        </section>
      </PikachuWithMessage>
    </main>
  );
}

// function GoHomeButton() {
//   "use client";
//   return (
//     <Button onClick={() => redirect('/')}>Go back home</Button>
//   );
// }