import Image from 'next/image';
import { Pokemon } from 'pokenode-ts';
import { Card, CardContent, CardTitle } from '../../../components/ui/card';
import { Link } from '../../../components/link/basic';
import { Skeleton } from '../../../components/ui/skeleton';

export function PokemonSummaryCard({ pokemon }: { pokemon: Pokemon}) {
  return (
    <Card className='justify-center'>
      <CardContent className='flex flex-wrap items-center gap-4'>
        <Image src={pokemon.sprites.front_default || ''} alt={pokemon.name} width={100} height={100} className="border-2 rounded-xl" />
        <CardTitle className='grow'>{pokemon.name}</CardTitle>
        <Link variant={'filled'} href={`/details/${pokemon.name}`} className='shrink'>Details</Link>
      </CardContent>
    </Card>
  );
}

PokemonSummaryCard.Skeleton = function PokemonSummaryCardSkeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className='justify-center h-[150px]'>
      <CardContent className='flex items-center gap-4'>
        <Skeleton className='w-[100px] h-[100px]' />
        <Skeleton className='grow h-[1.5rem]' />
        <Skeleton className='shrink h-[1.5rem] min-w-16' />
      </CardContent>
    </Card>
  );
}