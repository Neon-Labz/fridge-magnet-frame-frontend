import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

export default function InputField({
  label,
  icon,
  containerClassName = "",
  labelClassName = "",
  ...props
}: InputFieldProps) {
  return (
    <label className={`block mb-6 ${containerClassName}`}> {/* 24px bottom margin */}
      <span className={`block text-[14px] text-[#111] font-medium mb-1 ${labelClassName}`}>{label}</span>
      <div className="flex items-center gap-3 border-b border-black py-2.5">
        <span className="text-black w-5 h-5 flex items-center justify-center">{icon}</span>
        <input
          className="bg-transparent outline-none w-full text-base placeholder:text-neutral-500"
          {...props}
        />
      </div>
    </label>
  );
}
