export default function LunaLoading() {
   return (
      <div className='h-full w-full flex justify-center items-center'>
                     <picture>
                        <img
                           alt='loading'
                           src='/img/luna_fast.png'
                           className='animate-reverse-spin h-32'
                        />
                     </picture>
                  </div>
   );
}
