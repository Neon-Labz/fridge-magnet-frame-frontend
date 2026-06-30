"use client";

import React, { useEffect, useRef, useState } from "react";

export type FrameColor = "black" | "white";

export interface PersonalizationState {
  option: string;
  frameColor?: FrameColor;
}

interface PersonalizationSectionProps {
  onChange?: (state: PersonalizationState) => void;
  availableOptions?: string[];
  availableColors?: FrameColor[];
}

const DEFAULT_FRAME_COLORS: { id: FrameColor; label: string; bg: string }[] = [
  { id: "black", label: "Black", bg: "bg-black" },
  { id: "white", label: "White", bg: "bg-[#E8EAF0] border border-slate-200" },
];

export default function PersonalizationSection({
  onChange,
  availableOptions,
  availableColors,
}: PersonalizationSectionProps) {
  const options = (availableOptions ?? []).filter(Boolean).map((o) => ({
    id: o,
    label: o,
  }));

  const frameColors =
    availableColors === undefined
      ? DEFAULT_FRAME_COLORS
      : DEFAULT_FRAME_COLORS.filter((c) => availableColors.includes(c.id));

  const [selectedOption, setSelectedOption] = useState<string>(
    options[0]?.id ?? ""
  );
  const [selectedFrame, setSelectedFrame] = useState<FrameColor>(
    frameColors[0]?.id ?? "black"
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedOption) return;

    const state: PersonalizationState =
      frameColors.length > 0
        ? { option: selectedOption, frameColor: selectedFrame }
        : { option: selectedOption };

    onChange?.(state);
  }, [selectedOption, selectedFrame, onChange, frameColors.length]);

  if (options.length === 0) return null;

  return (
    <div className="w-full max-w-[551px]">
      <label className="block text-[15px] text-slate-700 mb-3">
        Personalization
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-full border-2 border-[#1A2B5E] bg-[#F0F2F8] text-[15px] font-semibold text-slate-800"
        >
          <span>
            {options.find((o) => o.id === selectedOption)?.label ?? "Select"}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-20 top-[calc(100%+6px)] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedOption(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 ${
                  selectedOption === opt.id
                    ? "bg-[#F0F2F8] text-[#1A2B5E] font-semibold"
                    : "hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {frameColors.length > 0 && (
        <div className="mt-6">
          <p className="text-[15px] text-slate-700 mb-4">Select Color</p>

          <div className="flex items-start gap-6">
            {frameColors.map((fc) => {
              const active = selectedFrame === fc.id;

              return (
                <button
                  key={fc.id}
                  onClick={() => setSelectedFrame(fc.id)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                      active ? "border-[#1A2B5E]" : "border-transparent"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${fc.bg}`}
                    />
                  </div>

                  <span
                    className={`text-sm ${
                      active ? "text-[#1A2B5E]" : "text-gray-400"
                    }`}
                  >
                    {fc.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}