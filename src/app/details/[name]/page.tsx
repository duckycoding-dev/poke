import {Link} from '@/components/link/basic';
import { getPokemonByName } from '../../../features/pokemon/pokemon.service';
import { notFound } from 'next/navigation';

export default async function DetailsPage(props: PageProps<'/details/[name]'>) {
  const { name } = await props.params;
  const pokemon = await getPokemonByName(name).catch(() => null);
  if (!pokemon) {
    notFound();
  }
  // await delay(2000);
  
  return (
    <main className='max-w-[1024px] mx-auto p-4 flex flex-col gap-4'>
      <h1>{name} details!</h1>
      <Link href="/">Go back home</Link>
    </main>
  );
}