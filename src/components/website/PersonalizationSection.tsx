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

  // All hooks must be called unconditionally
  const [selectedOption, setSelectedOption] = useState<string>(options[0]?.id ?? '');
  const [selectedFrame, setSelectedFrame] = useState<FrameColor>(frameColors[0]?.id ?? 'black');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Now safe to early-return after all hooks
  if (options.length === 0) return null;

  const handleOptionSelect = (optId: string) => {
    setSelectedOption(optId);
    setIsOpen(false);
    onChange?.({ option: optId });
  };

  const handleFrameChange = (frame: FrameColor) => {
    setSelectedFrame(frame);
    onChange?.({ option: selectedOption, frameColor: frame });
  };

  const selectedLabel = options.find((o) => o.id === selectedOption)?.label ?? '';

  return (
    <div className="w-full">
      {/* ── Personalization Dropdown ─────────────────────────────── */}
      <label className="block text-[15px] text-slate-700 mb-3">Personalization</label>

      <div className="relative" ref={dropdownRef}>
        {/* Trigger button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-full border-2 border-[#1A2B5E] bg-[#F0F2F8] text-[15px] font-semibold text-slate-800 hover:bg-[#E8EBFA] transition-colors"
        >
          <span>{selectedLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={[
              'w-5 h-5 text-slate-700 transition-transform duration-200',
              isOpen ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <div className="absolute z-20 top-[calc(100%+6px)] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt.id)}
                className={[
                  'w-full text-left px-5 py-3.5 text-[15px] font-medium transition-colors',
                  selectedOption === opt.id
                    ? 'bg-[#F0F2F8] text-[#1A2B5E] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Frame Color Swatches (shown only if colors available) ─── */}
      {frameColors.length > 0 && (
        <div className="mt-6">
          <p className="text-[15px] text-slate-700 mb-4">Select Color</p>
          <div className="flex items-start gap-6">
            {frameColors.map((fc) => {
              const isActive = selectedFrame === fc.id;
              return (
                <button
                  key={fc.id}
                  onClick={() => handleFrameChange(fc.id)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={[
                      'w-14 h-14 rounded-full flex items-center justify-center border-[3px] transition-all duration-200',
                      isActive ? 'border-[#1A2B5E]' : 'border-transparent group-hover:border-slate-300',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'w-10 h-10 rounded-full transition-transform duration-200 group-hover:scale-105',
                        fc.bg,
                      ].join(' ')}
                    />
                  </div>
                  <span
                    className={[
                      'text-sm font-semibold',
                      isActive ? 'text-[#1A2B5E]' : 'text-slate-400',
                    ].join(' ')}
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
