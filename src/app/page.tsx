import { Link } from '@/components/link/basic';
import { getPokemonList, MAX_POKEMON } from '@/features/pokemon/pokemon.service';
import { randomInt } from 'crypto';
import { Suspense } from 'react';
import z from 'zod';

const queryParamsSchema = z.object({
  offset: z.coerce.number().optional(),
});

export default async function Home(props: PageProps<'/'> & { searchParams: z.infer<typeof queryParamsSchema> }) {
  let { offset } = queryParamsSchema.parse(await props.searchParams);
  if (typeof offset === 'undefined') {
    offset = randomInt(0, MAX_POKEMON - 10);
  }
  const pokemonList = await getPokemonList(offset, 10);
  
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Welcome to the Pokémon App!</h1>
      <h2>Here's a random list of Pokémons:</h2>
      <main>
        <Suspense fallback={<div>Loading Pokémons...</div>}>
          <PokemonList pokemonList={pokemonList} />
        </Suspense>
      </main>
    </main>
  );
}

function PokemonList({ pokemonList }: { pokemonList: { name: string; url: string }[] }) {
  if (!pokemonList[0]) {
    return <div>No Pokémons found.</div>;
  }

  return (
    <>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <Link href={`/details/${pokemonList[0].name}`}>See {pokemonList[0].name} details</Link>
    </>
  );
}
