export default function SadJellyfish() {
   return (
      <div className='flex flex-col gap-2 items-center justify-center'>
         <picture>
            <img
               src={'/img/sad-jellyfish.png'}
               alt='sad-jellyfish'
               className='w-16 animate-bounce'
            />
         </picture>
         <p>sad jellyfish</p>
      </div>
   );
}
