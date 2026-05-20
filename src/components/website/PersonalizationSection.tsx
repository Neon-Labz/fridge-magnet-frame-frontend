'use client';

import React, { useState, useRef, useEffect } from 'react';

export type FrameColor = 'black' | 'white';

export interface PersonalizationState {
  option: string;
  frameColor?: FrameColor;
}

interface PersonalizationSectionProps {
  onChange?: (state: PersonalizationState) => void;
  /** Personalization option strings from DB — e.g. ["Name engraving", "Gift wrap"] */
  availableOptions?: string[];
  /** Frame color ids from DB — defaults to both if omitted */
  availableColors?: string[];
}

const DEFAULT_FRAME_COLORS: { id: FrameColor; label: string; bg: string }[] = [
  { id: 'black', label: 'Black', bg: 'bg-[#0D1B40]' },
  { id: 'white', label: 'White', bg: 'bg-[#E8EAF0] border border-slate-200' },
];

export default function PersonalizationSection({
  onChange,
  availableOptions,
  availableColors,
}: PersonalizationSectionProps) {
  // Derive items from DB data
  const options = (availableOptions ?? []).filter(Boolean).map((o) => ({ id: o, label: o }));
  const frameColors = DEFAULT_FRAME_COLORS.filter(
    (c) => !availableColors || availableColors.length === 0 || availableColors.includes(c.id),
  );

<<<<<<< HEAD
  // All hooks must be called unconditionally
  const [selectedOption, setSelectedOption] = useState<string>(options[0]?.id ?? '');
  const [selectedFrame, setSelectedFrame] = useState<FrameColor>(frameColors[0]?.id ?? 'black');
=======
export default function PersonalizationSection({
  onChange,
  initialOption = 'with-frame',
  initialFrameColor = 'black',
}: PersonalizationSectionProps) {
  const [selectedOption, setSelectedOption] =
    useState<PersonalizationOption>(initialOption);
  const [selectedFrame, setSelectedFrame] =
    useState<FrameColor>(initialFrameColor);
>>>>>>> development
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

<<<<<<< HEAD
=======
  // Close dropdown when clicking outside
>>>>>>> development
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Now safe to early-return after all hooks
  if (options.length === 0) return null;

  const handleOptionSelect = (optId: string) => {
    setSelectedOption(optId);
    setIsOpen(false);
<<<<<<< HEAD
    onChange?.({ option: optId });
=======

    const state: PersonalizationState =
      opt === 'with-frame'
        ? { option: opt, frameColor: selectedFrame }
        : { option: opt };

    onChange?.(state);
>>>>>>> development
  };

  const handleFrameChange = (frame: FrameColor) => {
    setSelectedFrame(frame);
    onChange?.({ option: selectedOption, frameColor: frame });
  };

<<<<<<< HEAD
  const selectedLabel = options.find((o) => o.id === selectedOption)?.label ?? '';
=======
  const selectedLabel =
    OPTIONS.find((o) => o.id === selectedOption)?.label ?? '';
>>>>>>> development

  return (
    <div className="w-full">
      {/* Title */}
      <label className="block text-[15px] text-slate-700 mb-3">
        Personalization
      </label>

      {/* Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-full border-2 border-[#1A2B5E] bg-[#F0F2F8] text-[15px] font-semibold text-slate-800"
        >
          <span>{selectedLabel}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 transition-transform ${
              isOpen ? 'rotate-180' : ''
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

        {/* Options */}
        {isOpen && (
<<<<<<< HEAD
          <div className="absolute z-20 top-[calc(100%+6px)] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            {options.map((opt) => (
=======
          <div className="absolute z-20 mt-2 w-full bg-white border rounded-xl shadow-lg">
            {OPTIONS.map((opt) => (
>>>>>>> development
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt.id)}
                className={`w-full text-left px-5 py-3 ${
                  selectedOption === opt.id
                    ? 'bg-[#F0F2F8] text-[#1A2B5E] font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* ── Frame Color Swatches (shown only if colors available) ─── */}
      {frameColors.length > 0 && (
        <div className="mt-6">
          <p className="text-[15px] text-slate-700 mb-4">Select Color</p>
          <div className="flex items-start gap-6">
            {frameColors.map((fc) => {
              const isActive = selectedFrame === fc.id;
=======
      {/* Frame Color */}
      {selectedOption === 'with-frame' && (
        <div className="mt-6">
          <p className="text-[15px] text-slate-700 mb-4">Select Color</p>

          <div className="flex gap-6">
            {FRAME_COLORS.map((fc) => {
              const active = selectedFrame === fc.id;

>>>>>>> development
              return (
                <button
                  key={fc.id}
                  onClick={() => handleFrameChange(fc.id)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                      active ? 'border-[#1A2B5E]' : 'border-transparent'
                    }`}
                  >
                    <div
<<<<<<< HEAD
                      className={[
                        'w-10 h-10 rounded-full transition-transform duration-200 group-hover:scale-105',
                        fc.bg,
                      ].join(' ')}
                    />
                  </div>
=======
                      className={`w-10 h-10 rounded-full ${
                        fc.id === 'black'
                          ? 'bg-black'
                          : 'bg-gray-200 border'
                      }`}
                    />
                  </div>

>>>>>>> development
                  <span
                    className={`text-sm ${
                      active ? 'text-[#1A2B5E]' : 'text-gray-400'
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