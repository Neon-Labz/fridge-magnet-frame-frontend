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
  initialOption?: PersonalizationOption;
  initialFrameColor?: FrameColor;
}

const OPTIONS: { id: PersonalizationOption; label: string }[] = [
  { id: 'with-frame', label: 'With Frame' },
  { id: 'without-frame', label: 'Without Frame' },
];

const FRAME_COLORS: { id: FrameColor; label: string }[] = [
  { id: 'black', label: 'Black' },
  { id: 'white', label: 'White' },
];

export default function PersonalizationSection({
  onChange,
  initialOption = 'with-frame',
  initialFrameColor = 'black',
}: PersonalizationSectionProps) {
  const [selectedOption, setSelectedOption] =
    useState<PersonalizationOption>(initialOption);
  const [selectedFrame, setSelectedFrame] =
    useState<FrameColor>(initialFrameColor);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  const handleOptionSelect = (opt: PersonalizationOption) => {
    setSelectedOption(opt);
    setIsOpen(false);

    const state: PersonalizationState =
      opt === 'with-frame'
        ? { option: opt, frameColor: selectedFrame }
        : { option: opt };

    onChange?.(state);
  };

  const handleFrameChange = (frame: FrameColor) => {
    setSelectedFrame(frame);
    onChange?.({ option: 'with-frame', frameColor: frame });
  };

  const selectedLabel =
    OPTIONS.find((o) => o.id === selectedOption)?.label ?? '';

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
          <div className="absolute z-20 mt-2 w-full bg-white border rounded-xl shadow-lg">
            {OPTIONS.map((opt) => (
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

      {/* Frame Color */}
      {selectedOption === 'with-frame' && (
        <div className="mt-6">
          <p className="text-[15px] text-slate-700 mb-4">Select Color</p>

          <div className="flex gap-6">
            {FRAME_COLORS.map((fc) => {
              const active = selectedFrame === fc.id;

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
                      className={`w-10 h-10 rounded-full ${
                        fc.id === 'black'
                          ? 'bg-black'
                          : 'bg-gray-200 border'
                      }`}
                    />
                  </div>

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