'use client';

interface AccountActionsProps {
  saving: boolean;
  loading: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function AccountActions({
  saving,
  loading,
  onCancel,
  onSave,
}: AccountActionsProps) {
  return (
    <div
      className="
        mt-8
        flex
        flex-col
        gap-3
        border-t
        border-[#E2E2E7]
        pt-6

        sm:flex-row
        sm:items-center
        sm:justify-end
        sm:gap-4
        sm:pt-7
      "
    >
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="
          w-full
          rounded-lg
          border-2
          border-[#002B73]
          px-5
          py-3
          text-center
          text-[15px]
          font-semibold
          leading-tight
          text-[#002B73]
          transition-colors
          hover:bg-[#f0f4ff]
          disabled:cursor-not-allowed
          disabled:opacity-60

          sm:w-auto
          sm:min-w-[180px]
          sm:px-8
          sm:text-[17px]
        "
      >
        Cancel Changes
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={saving || loading}
        className="
          w-full
          rounded-lg
          bg-[#0040A1]
          px-5
          py-3
          text-center
          text-[15px]
          font-semibold
          leading-tight
          text-white
          shadow-[0px_20px_25px_-5px_rgba(0,64,161,0.25),0px_8px_10px_-6px_rgba(0,64,161,0.2)]
          transition-colors
          hover:bg-[#003285]
          disabled:cursor-not-allowed
          disabled:opacity-60

          sm:w-auto
          sm:min-w-[220px]
          sm:px-8
          sm:text-[17px]
        "
      >
        {saving ? 'Saving...' : 'Save Account Settings'}
      </button>
    </div>
  );
}