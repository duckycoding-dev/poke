import Image from 'next/image';
export async function PikachuWithMessage({ children }: { children?: React.ReactNode }) {    
  return (
    <div className='flex flex-col md:flex-row items-center gap-4'>
      {children}
    </div>
  );
};

PikachuWithMessage.PikachuImage = async function PikachuImage({flipHorizontally = false}: {flipHorizontally?: boolean}) {

  return (
    <div className={`${flipHorizontally ? 'scale-x-[-1]' : ''} w-[500px] md:max-w-[250px]`}>
      <div className='h-[250px] w-[500px] overflow-hidden md:-ml-[45%]'>
        <Image src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png'} alt={'pikachu'} width={500} height={500} className={`-mt-[21.5%] grayscale-50`} />  
      </div>
      <div className='h-[75px] w-[500px] grid grid-cols-1 overflow-hidden md:-ml-[45%]' >
        <div className="row-start-1 row-end-1 col-start-1 col-end-1 h-[100px] w-full z-10" style={{
          background: 'radial-gradient(farthest-corner at 50% top,rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%)',
        }}></div>
        <Image src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png'} alt={'pikachu shadow'} width={500} height={500} className={'row-start-1 row-end-1 col-start-1 col-end-1 -mt-[28.5%] rotate-x-180 grayscale-50 blur-[1px]'} />
      </div>
    </div>
  )
}