import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#0040A1] text-white hover:bg-[#00337f] shadow-[0_12px_24px_rgba(0,64,161,0.18)]",
  secondary: "bg-white text-[#1A1C1F] border border-[#C3C6D4] hover:border-[#0040A1] hover:text-[#0040A1]",
  outline: "bg-transparent text-[#0040A1] border border-[#0040A1] hover:bg-[#EFF6FF]",
  danger: "bg-[#E61D11] text-white hover:bg-[#c91a10] shadow-[0_10px_18px_rgba(230,29,17,0.16)]",
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-[15px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}