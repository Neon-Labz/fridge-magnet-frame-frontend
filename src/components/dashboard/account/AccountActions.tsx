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
    <div className="mt-8 flex items-center justify-end gap-4 border-t border-[#E2E2E7] pt-7">
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="min-w-[180px] rounded-lg border-2 border-[#002B73] px-8 py-3 text-center text-[17px] font-semibold leading-tight text-[#002B73] hover:bg-[#f0f4ff] disabled:opacity-60"
      >
        Cancel Changes
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saving || loading}
        className="min-w-[220px] rounded-lg bg-[#0040A1] px-8 py-3 text-center text-[17px] font-semibold leading-tight text-white shadow-[0px_20px_25px_-5px_rgba(0,64,161,0.25),0px_8px_10px_-6px_rgba(0,64,161,0.2)] hover:bg-[#003285] disabled:opacity-60"
      >
        {saving ? 'Saving...' : 'Save Account Settings'}
      </button>
    </div>
  );
}
