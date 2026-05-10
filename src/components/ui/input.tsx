import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'block w-full rounded-lg border border-[#C3C6D4] bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-[#6B7280] focus:border-[#0040A1] focus:ring-2 focus:ring-[#0040A1]/10',
        className,
      )}
      {...props}
    />
  );
};

export default Input;
