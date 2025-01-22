export default function NotFoundComponent() {
   return (
      <>
         <p className='text-2xl'>หาวิดีโอไม่เจอ</p>
         <picture>
            <img
               src='/img/sad-jellyfish.jpg'
               className='max-w-52'
               alt='sad-jellyfish'
            />
         </picture>
      </>
   );
}
