import Link from 'next/link';
import { use } from 'react';

export default function DetailsPage(props: PageProps<'/pokemon/[slug]'>) {
  const { slug } = use(props.params);

  return (
    <>
      <h1>{slug} details!</h1>
      <Link href="/">Go back home</Link>
    </>
  );
}