import { motion } from 'framer-motion';

export default function LunaLoading() {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{
            duration: 0.5,
            ease: 'easeOut',
         }}
         className='h-full w-full flex justify-center items-center'
      >
         <picture>
            <img
               alt='loading'
               src='/img/luna_fast.png'
               className='animate-reverse-spin h-24'
            />
         </picture>
      </motion.div>
   );
}
