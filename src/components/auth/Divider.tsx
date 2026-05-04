import React from "react";

export default function Divider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-[#D1D5DB]" />
      <span className="text-neutral-400 text-sm font-medium">OR</span>
      <div className="flex-1 h-px bg-[#D1D5DB]" />
    </div>
  );
}
