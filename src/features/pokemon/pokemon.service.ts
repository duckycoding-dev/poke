import { PokemonClient } from 'pokenode-ts';
const client = new PokemonClient();

export const MAX_POKEMON = 1300; // As of now, there are 1300 Pokémons in the API

export const getPokemonList = async (offset: number, limit: number) => {
  const res = await client.listPokemons(offset, limit);
  return res.results;
};