import NextLink from 'next/link';
import { cn } from '../../lib/utils';

export function Link({className, ...props}: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props} className={cn(className, 'text-blue-500 hover:underline')}/>
  )
}