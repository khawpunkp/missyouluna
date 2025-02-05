import { motion } from 'framer-motion';
export default function SadJellyfish() {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{
            duration: 0.5,
            ease: 'easeOut',
         }}
         className='flex flex-col gap-2 items-center justify-center'
      >
         <picture>
            <img
               src={'/img/sad-jellyfish.png'}
               alt='sad-jellyfish'
               className='w-16 animate-bounce'
            />
         </picture>
         <p>sad jellyfish</p>
      </motion.div>
   );
}
