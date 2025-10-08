'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

const DEFAULT_LIMITS = [10, 20, 30, 50, 100];

export default function OffsetPagination({ offsetParamName = 'offset', limitParamName = 'limit', defaultLimit, totalElements, customLimits }: { offsetParamName?: string, limitParamName?: string, defaultLimit: number, totalElements: number, customLimits?: number[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentOffset = Number(searchParams.get(offsetParamName)) || 1;
  const currentLimit = Number(searchParams.get(limitParamName)) || defaultLimit;

  const limits = customLimits && customLimits.length > 0 ? customLimits : DEFAULT_LIMITS;

  const createPageURL = (newOffset: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(offsetParamName, newOffset.toString());
    params.set(limitParamName, newLimit.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleLimitChangeSelect = (value: string) => {
    const newLimit = Number(value);
    if (!isNaN(newLimit)) {
      router.push(createPageURL(0, newLimit));
    }
  };

  const nextOffset = currentOffset + currentLimit >= totalElements ? currentOffset : currentOffset + currentLimit;
  const prevOffset = currentOffset - currentLimit < 0 ? 0 : currentOffset - currentLimit;
  return (
    <div className='flex flex-col md:flex-row justify-between md:items-center flex-wrap gap-4'>
      <Select defaultValue={currentLimit.toString()} onValueChange={handleLimitChangeSelect}>
        <SelectTrigger className='w-full md:w-auto'>
          <SelectValue placeholder="Limit">Limit: {currentLimit}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Limit</SelectLabel>
            {limits.map((limit) => (
              <SelectItem key={limit} value={limit.toString()}>{limit}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className='flex space-between gap-2'>
        <Button className='grow shrink flex-1' disabled={currentOffset === 0} onClick={() => router.push(createPageURL(prevOffset, currentLimit))}>Previous</Button>
        <Button className='grow shrink flex-1' disabled={currentOffset === totalElements} onClick={() => router.push(createPageURL(nextOffset, currentLimit))}>Next</Button>
      </div>
    </div>
  )
  // ...
}