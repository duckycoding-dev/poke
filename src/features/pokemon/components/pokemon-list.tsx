import { getPokemonByName, getPokemonList } from '../pokemon.service';
import { PokemonSummaryCard } from './pokemon-summary-card';

export async function PokemonList({ offset, limit }: { offset: number; limit: number }) {
  const pokemonList = await getPokemonList(offset, limit);
  if (!pokemonList[0]) {
    return <div>No Pokémons found.</div>;
  }
  
  const pokemons = await Promise.all(pokemonList.map((p) => {
    return getPokemonByName(p.name);
  }));

  return (
    <ul className='grid gap-4 md:grid-cols-2'>
      {pokemons.map((pokemon) => (
        <li key={pokemon.name}>
          <PokemonSummaryCard pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}


PokemonList.Skeleton = function PokemonListSkeleton({limit}: {limit: number} ) {
  return (
    <ul className='grid gap-4 md:grid-cols-2'>
      {Array.from({ length: limit }).map((_, index) => (
        <li key={`pokemon-list-skeleton-element-${index}`}>
          <PokemonSummaryCard.Skeleton />
        </li>
      ))}
    </ul>
  );
}