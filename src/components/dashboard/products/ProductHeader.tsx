import { SquarePlus } from 'lucide-react';

interface ProductHeaderProps {
  onAddClick: () => void;
}

export default function ProductHeader({ onAddClick }: ProductHeaderProps) {
  return (
    <section className="flex-shrink-0 flex items-end justify-between gap-2 mb-5 ">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-[26px] sm:text-[36px] lg:text-[40px] leading-tight"
          style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)', color: '#002B73', letterSpacing: '-1.2px' }}>
          Product Management
        </h1>
        
      </div>
      <button onClick={onAddClick}
        className="flex items-center gap-2 font-bold text-base text-white flex-shrink-0 transition hover:opacity-90"
        style={{ height: 56, padding: '0 32px', background: '#BC0000', borderRadius: 12, boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)' }}>
        <SquarePlus size={18} />
        Add Product
      </button>
    </section>
  );
}
