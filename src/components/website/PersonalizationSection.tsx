'use client';

import React, { useState } from 'react';

export type PersonalizationOption = 'without-frame' | 'with-frame';
export type FrameColor = 'black' | 'white';

export interface PersonalizationState {
  option: PersonalizationOption;
  frameColor?: FrameColor;
}

interface PersonalizationSectionProps {
  onChange?: (state: PersonalizationState) => void;
}

const MAIN_OPTIONS: { id: PersonalizationOption; label: string; description: string }[] = [
  {
    id: 'with-frame',
    label: 'With Frame',
    description: 'Add a premium frame to your print',
  },
  {
    id: 'without-frame',
    label: 'Without Frame',
    description: 'Print only, no frame included',
  },
];

const FRAME_COLORS: { id: FrameColor; label: string; swatch: string }[] = [
  { id: 'black', label: 'Black Frame', swatch: 'bg-[#111]' },
  { id: 'white', label: 'White Frame', swatch: 'bg-white border border-slate-300' },
];

export default function PersonalizationSection({ onChange }: PersonalizationSectionProps) {
  const [selectedOption, setSelectedOption] = useState<PersonalizationOption>('with-frame');
  const [selectedFrame, setSelectedFrame] = useState<FrameColor>('black');

  const handleOptionChange = (option: PersonalizationOption) => {
    setSelectedOption(option);
    const state: PersonalizationState =
      option === 'with-frame' ? { option, frameColor: selectedFrame } : { option };
    onChange?.(state);
  };

  const handleFrameChange = (frame: FrameColor) => {
    setSelectedFrame(frame);
    onChange?.({ option: 'with-frame', frameColor: frame });
  };

  return (
    <div className="w-full">
      <h3 className="text-[15px] font-semibold text-slate-800 mb-3">Personalization</h3>

      {/* Main Option Cards */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {MAIN_OPTIONS.map((opt) => {
          const isSelected = selectedOption === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleOptionChange(opt.id)}
              className={[
                'flex-1 flex items-start gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all duration-200',
                isSelected
                  ? 'border-[#1A2B5E] bg-[#1A2B5E]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
              ].join(' ')}
            >
              {/* Custom Radio */}
              <span
                className={[
                  'mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                  isSelected ? 'border-[#1A2B5E]' : 'border-slate-300',
                ].join(' ')}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#1A2B5E]" />
                )}
              </span>

              <span className="flex flex-col">
                <span
                  className={[
                    'text-sm font-semibold',
                    isSelected ? 'text-[#1A2B5E]' : 'text-slate-700',
                  ].join(' ')}
                >
                  {opt.label}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">{opt.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-option: Frame Color (only when "With Frame" selected) */}
      {selectedOption === 'with-frame' && (
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 transition-all duration-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Choose Frame Color
          </p>
          <div className="flex gap-3">
            {FRAME_COLORS.map((fc) => {
              const isActive = selectedFrame === fc.id;
              return (
                <button
                  key={fc.id}
                  onClick={() => handleFrameChange(fc.id)}
                  className={[
                    'flex items-center gap-2.5 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'border-[#1A2B5E] bg-white shadow-sm text-[#1A2B5E]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                  ].join(' ')}
                >
                  {/* Swatch circle */}
                  <span
                    className={[
                      'w-4 h-4 rounded-full flex-shrink-0',
                      fc.swatch,
                    ].join(' ')}
                  />
                  {fc.label}
                  {isActive && (
                    <span className="ml-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 text-[#1A2B5E]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selection summary */}
          <p className="mt-3 text-xs text-slate-400">
            Selected:{' '}
            <span className="font-semibold text-[#1A2B5E] capitalize">
              {selectedFrame} frame
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
