import NextLink from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

type ButtonExtraProps = {
  variant?: React.ComponentProps<typeof Button>['variant'] | 'filled';
  size?: React.ComponentProps<typeof Button>['size'];
};

export function Link({className, variant = 'default', size, ...props}: (React.ComponentProps<typeof NextLink> & ButtonExtraProps)) {
  let variantToUse = variant === 'filled' ? 'default' : variant; // this is because default links should look like text links
  if (variant === 'default') variantToUse = 'link';

  return (
    <Button asChild={true} variant={variantToUse} size={size}>
      <NextLink className={cn(className, 'text-blue-500 hover:underline')} {...props} />
    </Button>
  )
}