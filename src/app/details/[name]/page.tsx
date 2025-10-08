import {Link} from '@/components/link/basic';
import { getPokemonByName } from '../../../features/pokemon/pokemon.service';
import { notFound } from 'next/navigation';
import { PokemonSpritesCarousel } from '../../../features/pokemon/components/pokemon-sprites-carousel';
import Image from 'next/image';
import { OtherPokemonSprites } from 'pokenode-ts';

export default async function DetailsPage(props: PageProps<'/details/[name]'>) {
  const { name } = await props.params;
  const pokemon = await getPokemonByName(name).catch(() => null);
  if (!pokemon) {
    notFound();
  }
  
  return (
    <main className='max-w-[1024px] mx-auto p-4 flex flex-col gap-4'>
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-4xl font-extrabold">{name.toUpperCase()}</h1>
        <Image src={(pokemon.sprites.other as OtherPokemonSprites & { showdown: Record<string, string> })?.showdown?.front_default ?? ''} alt={name} width={75} height={75} />
      </div>
      <PokemonSpritesCarousel sprites={pokemon.sprites} />
      <Link href="/">Go back home</Link>
    </main>
  );
}
