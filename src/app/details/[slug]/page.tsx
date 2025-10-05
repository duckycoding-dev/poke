import {Link} from '@/components/link/basic';
import { use } from 'react';

export default function DetailsPage(props: PageProps<'/details/[slug]'>) {
  const { slug } = use(props.params);

  return (
    <>
      <h1>{slug} details!</h1>
      <Link href="/">Go back home</Link>
    </>
  );
}