export default function TopAppBar({ setMenu }: any) {
  return (
    <div className="flex items-center justify-end border-b px-10 py-4">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setMenu('notification')}
          className="relative text-slate-600 hover:text-blue-900"
        >
          🔔
          <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenu('profile')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 font-bold text-white"
          >
            A
          </button>

          <div className="text-sm">
            <p className="font-bold text-blue-900">Admin</p>
            <p className="text-xs text-slate-500">System Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}