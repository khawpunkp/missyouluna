'use client';

import React, {
   Dispatch,
   Fragment,
   SetStateAction,
   useEffect,
   useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, List, X } from '@phosphor-icons/react';
import { RemoveScroll } from 'react-remove-scroll';
import { usePathname } from 'next/navigation';

const menuPath = [
   {
      title: 'คิดถึงลูน่า',
      href: '/missyouluna',
   },
   {
      title: 'การ์ดของลูน่า',
      href: '/card-list',
   },
];

export default function Navbar() {
   const pathname = usePathname();
   const [open, setOpen] = useState(false);

   useEffect(() => {
      setOpen(false);
   }, [pathname]);

   return (
      <RemoveScroll removeScrollBar={false} enabled={open}>
         <NavbarComponent open={open} setOpen={setOpen} />
      </RemoveScroll>
   );
}

function NavbarComponent({
   open,
   setOpen,
}: {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}) {
   return (
      <nav
         className={`fixed top-0 z-50 shadow-md w-full flex items-center justify-center transition-all duration-500 ease-out h-16 mobile:h-14 mobile:px-4 bg-white backdrop-filter backdrop-blur-sm ${
            open ? 'bg-opacity-100' : 'bg-opacity-50'
         }`}
      >
         <div className='flex w-full max-w-7xl items-center justify-between'>
            <Link className='hover:scale-[1.03] transition-all duration-300' href={'/'}>
               <picture>
                  <img
                     alt='logo'
                     src='/img/pirate-official.png'
                     className={
                        'h-[48px]'
                     }
                  />
               </picture>
            </Link>
            <div className='hidden gap-4 lg:flex text-xl'>
               {menuPath.map((path, index) => (
                  <Link
                     key={index}
                     href={path.href}
                     className={`hover:scale-105 transition-all duration-300 min-w-[100px] px-4 text-primary`}
                  >
                     {path.title}
                  </Link>
               ))}
            </div>
            <MobileMenu open={open} setOpen={setOpen} />
         </div>
      </nav>
   );
}

function MobileMenu({
   open,
   setOpen,
}: {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}) {
   return (
      <div className='block lg:hidden'>
         <button
            onClick={() => setOpen((prev) => !prev)}
            className={`block p-2 text-primary`}
         >
            {open ? <X size={24} /> : <List size={24} />}
         </button>
         <AnimatePresence>
            {open && (
               <motion.nav
                  initial={{ x: '100vw' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100vw' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className='fixed left-0 top-0 flex h-screen w-full flex-col bg-white backdrop-filter backdrop-blur-sm mt-[55px] px-6 border-t-border border'
               >
                  <div className='h-screen overflow-y-auto flex flex-col text-base text-primary'>
                     {menuPath.map((path, index) => (
                        <Fragment key={index}>
                           <Link
                              href={path.href}
                              className={`hover:scale-105 transition-all duration-500 min-w-[100px] py-4 text-foreground-primary items-center flex justify-between`}
                           >
                              <p className='font-[500px]'>{path.title}</p>
                              <div className='p-2'>
                                 <ArrowRight size={24} />
                              </div>
                           </Link>
                           <div className='h-px w-full bg-secondary' />
                        </Fragment>
                     ))}
                  </div>
               </motion.nav>
            )}
         </AnimatePresence>
      </div>
   );
}
