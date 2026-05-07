'use client';

import React, { useState, useRef, useEffect } from 'react';

export type PersonalizationOption = 'with-frame' | 'without-frame';
export type FrameColor = 'black' | 'white';

export interface PersonalizationState {
  option: PersonalizationOption;
  frameColor?: FrameColor;
}

interface PersonalizationSectionProps {
  onChange?: (state: PersonalizationState) => void;
}

const OPTIONS: { id: PersonalizationOption; label: string }[] = [
  { id: 'with-frame', label: 'With Frame' },
  { id: 'without-frame', label: 'Without Frame' },
];

const FRAME_COLORS: { id: FrameColor; label: string }[] = [
  { id: 'black', label: 'Black' },
  { id: 'white', label: 'White' },
];

export default function PersonalizationSection({ onChange }: PersonalizationSectionProps) {
  const [selectedOption, setSelectedOption] = useState<PersonalizationOption>('with-frame');
  const [selectedFrame, setSelectedFrame] = useState<FrameColor>('black');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (opt: PersonalizationOption) => {
    setSelectedOption(opt);
    setIsOpen(false);
    const state: PersonalizationState =
      opt === 'with-frame' ? { option: opt, frameColor: selectedFrame } : { option: opt };
    onChange?.(state);
  };

  const handleFrameChange = (frame: FrameColor) => {
    setSelectedFrame(frame);
    onChange?.({ option: 'with-frame', frameColor: frame });
  };

  const selectedLabel = OPTIONS.find((o) => o.id === selectedOption)?.label ?? '';

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
            {OPTIONS.map((opt) => (
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

      {/* ── Color Swatches (only when With Frame) ────────────────── */}
      {selectedOption === 'with-frame' && (
        <div className="mt-6">
          <p className="text-[15px] text-slate-700 mb-4">Select Color</p>
          <div className="flex items-start gap-6">
            {FRAME_COLORS.map((fc) => {
              const isActive = selectedFrame === fc.id;
              return (
                <button
                  key={fc.id}
                  onClick={() => handleFrameChange(fc.id)}
                  className="flex flex-col items-center gap-2 group"
                >
                  {/* Outer ring */}
                  <div
                    className={[
                      'w-14 h-14 rounded-full flex items-center justify-center border-[3px] transition-all duration-200',
                      isActive ? 'border-[#1A2B5E]' : 'border-transparent group-hover:border-slate-300',
                    ].join(' ')}
                  >
                    {/* Inner swatch */}
                    <div
                      className={[
                        'w-10 h-10 rounded-full transition-transform duration-200 group-hover:scale-105',
                        fc.id === 'black'
                          ? 'bg-[#0D1B40]'
                          : 'bg-[#E8EAF0] border border-slate-200',
                      ].join(' ')}
                    />
                  </div>
                  {/* Label */}
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
