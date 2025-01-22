export default function FilterButton({
   children,
   code,
   currentFilter,
   onClick,
}: {
   children: React.ReactNode;
   code: string;
   currentFilter: string;
   onClick: () => void;
}) {
   return (
      <button
         type='button'
         onClick={onClick}
         className={`mobile:h-8 mobile:w-[31%] w-[24%] py-2 rounded-full border transition-all duration-300 hover:scale-[1.03] ${
            currentFilter === code
               ? 'bg-primary border-white text-white'
               : 'bg-white border-primary'
         }`}
      >
         {children}
      </button>
   );
}
