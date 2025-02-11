import { Variants } from 'framer-motion';

export const mainContainerVariants: Variants = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: {
         duration: 0.5,
         staggerChildren: 0.2,
      },
   },
};

export const subContainerVariants: Variants = {
   hidden: { opacity: 1 },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.2,
      },
   },
};

export const childrenContainerVariants: Variants = {
   hidden: { opacity: 0, scale: 0 },
   show: {
      opacity: 1,
      scale: 1,
      transition: {
         duration: 0.5,
         staggerChildren: 0.2,
         scale: { type: 'spring', visualDuration: 0.5, bounce: 0.3 },
      },
   },
};
