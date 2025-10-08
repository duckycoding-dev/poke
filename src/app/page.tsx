import { MAX_POKEMON } from '@/features/pokemon/pokemon.service';
import { randomInt } from 'crypto';
import { Suspense } from 'react';
import z from 'zod';
import { PokemonList } from '@/features/pokemon/components/pokemon-list';
import OffsetPagination from '@/components/pagination/offset-pagination';
import { redirect } from 'next/navigation';

const queryParamsSchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional().default(10),
});

export default async function Home(props: PageProps<'/'> & { searchParams: z.infer<typeof queryParamsSchema> }) {
  const { data: queryData } = queryParamsSchema.safeParse(await props.searchParams);
  let offset = queryData?.offset;
  if (typeof offset === 'undefined') {
    offset = randomInt(0, MAX_POKEMON - 10);
  } else if (offset < 0) {
    offset = 0;
  }
  const limit = queryData?.limit || 10;
  if(queryData?.offset === undefined || !queryData?.limit) return redirect(`/?offset=${offset}&limit=${limit}`);
  
  return (
    <main className='max-w-[1024px] mx-auto p-4 flex flex-col gap-4'>
      <h1 className="text-center text-3xl font-bold underline">Welcome to the Pokémon App!</h1>
      <section className='flex flex-col gap-4'>
        <h2>{`Here's a ${!queryData?.offset ? 'random list of Pokémons' : `list of Pokémons starting from the N° ${offset+1}`}:`}</h2>
        <Suspense fallback={<PokemonList.Skeleton limit={limit} />}>
          <PokemonList offset={offset} limit={limit} />
        </Suspense>
        <OffsetPagination defaultLimit={limit} totalElements={MAX_POKEMON} />
      </section>
    </main>
  );
}