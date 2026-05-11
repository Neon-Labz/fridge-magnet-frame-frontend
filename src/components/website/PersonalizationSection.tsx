'use client';

export type PersonalizationState =
  | {
      option: 'without-frame';
      frameColor?: never;
    }
  | {
      option: 'with-frame';
      frameColor: 'black' | 'white';
    };

interface PersonalizationSectionProps {
  initialOption: PersonalizationState['option'];
  initialFrameColor?: 'black' | 'white';
  onChange: (value: PersonalizationState) => void;
}

export default function PersonalizationSection({
  initialOption,
  initialFrameColor,
  onChange,
}: PersonalizationSectionProps) {
  return (
    <div className="rounded-[8px] border border-slate-200 p-4">
      <p className="mb-3 text-[15px] font-medium text-slate-800">Personalization</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onChange({ option: 'without-frame' })}
          className={
            initialOption === 'without-frame'
              ? 'rounded-[4px] bg-[#1A2B5E] px-4 py-2 text-sm font-medium text-white'
              : 'rounded-[4px] border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700'
          }
        >
          Without Frame
        </button>
        <button
          type="button"
          onClick={() => onChange({ option: 'with-frame', frameColor: 'black' })}
          className={
            initialOption === 'with-frame' && initialFrameColor === 'black'
              ? 'rounded-[4px] bg-[#1A2B5E] px-4 py-2 text-sm font-medium text-white'
              : 'rounded-[4px] border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700'
          }
        >
          Black Frame
        </button>
        <button
          type="button"
          onClick={() => onChange({ option: 'with-frame', frameColor: 'white' })}
          className={
            initialOption === 'with-frame' && initialFrameColor === 'white'
              ? 'rounded-[4px] bg-[#1A2B5E] px-4 py-2 text-sm font-medium text-white'
              : 'rounded-[4px] border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700'
          }
        >
          White Frame
        </button>
      </div>
    </div>
  );
}
