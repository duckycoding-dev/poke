"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { PokemonSprites } from 'pokenode-ts'
import Image from 'next/image'

export function PokemonSpritesCarousel({sprites}: { sprites: PokemonSprites }) {
  const [api, setApi] = useState<CarouselApi>()
  const [_current, setCurrent] = useState(0)
  const [_count, setCount] = useState(0)
  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const images: string[] = Object.values(sprites).filter((sprite) => {
    if (typeof sprite === 'string' && sprite) {
      return true
    } else return false
  })

  return (
    <div className="mx-auto">
      <Carousel setApi={setApi} className="w-full max-w-xs md:max-w-[80vw]" opts={{
        loop: true,
        dragFree: true,
      }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/3">
              <Card className="flex aspect-square items-center justify-center py-0">
                <Image
                  src={image}
                  alt={`Pokemon sprite ${index + 1}`}
                  width={320}
                  height={320}
                  priority={index === 0}
                  className="object-contain"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};