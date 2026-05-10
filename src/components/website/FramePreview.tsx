import { cn } from "@/lib/utils";

type FramePreviewVariant = "updated-1" | "updated-2" | "gradient";

export default function FramePreview({
  variant = "gradient",
  className,
}: {
  variant?: FramePreviewVariant;
  className?: string;
}) {
  if (variant === "updated-1") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-black/70 bg-[#141414] shadow-[0_10px_25px_rgba(15,23,42,0.22)]",
          className,
        )}
      >
        <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-3">
          <div className="rounded-[2px] border-[5px] border-[#0f0f0f] bg-[linear-gradient(135deg,#d7d7d7_0%,#bdbdbd_100%)] p-1">
            <div className="h-full w-full rounded-[1px] bg-[radial-gradient(circle_at_30%_28%,#f6ead4_0%,#f0d4c4_34%,#6f5847_35%,#d17b7c_62%,#2f2f2f_100%)] opacity-90" />
          </div>
          <div className="rounded-[2px] border-[5px] border-[#0f0f0f] bg-[linear-gradient(135deg,#d7d7d7_0%,#bdbdbd_100%)] p-1">
            <div className="relative h-full w-full overflow-hidden rounded-[1px] bg-[radial-gradient(circle_at_50%_18%,#f2d4d4_0%,#b3362a_45%,#6c1d12_100%)]">
              <div className="absolute left-1/2 top-[16%] h-[32%] w-[64%] -translate-x-1/2 rounded-[999px] bg-[#f7efe5]" />
              <div className="absolute left-1/2 top-[23%] h-[16%] w-[18%] -translate-x-1/2 rounded-full bg-[#d9d9d9]" />
              <div className="absolute bottom-[12%] left-[7%] h-[65%] w-[86%] rounded-[45%] bg-[radial-gradient(circle_at_50%_30%,#c98f5c_0%,#9d6a43_42%,#5a3d2d_100%)] opacity-85" />
            </div>
          </div>
          <div className="rounded-[2px] border-[5px] border-[#0f0f0f] bg-[linear-gradient(135deg,#d7d7d7_0%,#bdbdbd_100%)] p-1">
            <div className="relative h-full w-full overflow-hidden rounded-[1px] bg-[linear-gradient(180deg,#d5d7db_0%,#e9dcd5_100%)]">
              <div className="absolute inset-x-0 top-[18%] h-[28%] bg-[linear-gradient(180deg,#7eb7d6_0%,#f6e4c8_100%)] opacity-85" />
              <div className="absolute bottom-0 left-0 h-[54%] w-full bg-[linear-gradient(180deg,#ece7e1_0%,#d9d1c8_100%)]" />
              <div className="absolute left-[8%] top-[20%] h-[16%] w-[16%] rounded-full bg-[#7c5340]" />
              <div className="absolute left-[16%] top-[34%] h-[14%] w-[24%] rounded-full bg-[#8fb8d7] opacity-70" />
              <div className="absolute right-[12%] bottom-[12%] h-[18%] w-[36%] rounded-[50%] bg-[#4d352f] opacity-55" />
            </div>
          </div>
          <div className="rounded-[2px] border-[5px] border-[#0f0f0f] bg-[linear-gradient(135deg,#d7d7d7_0%,#bdbdbd_100%)] p-1">
            <div className="relative h-full w-full overflow-hidden rounded-[1px] bg-[linear-gradient(135deg,#f1dfb7_0%,#e9c3b5_36%,#f0e3c8_100%)]">
              <div className="absolute left-[10%] top-[12%] h-[72%] w-[42%] rounded-[20px] bg-[linear-gradient(180deg,#f6c8a8_0%,#f2a5a1_35%,#ffefcf_36%,#fefefe_100%)] opacity-90" />
              <div className="absolute right-[12%] top-[10%] h-[75%] w-[45%] rounded-[14px] bg-[linear-gradient(180deg,#c9d8e7_0%,#ffffff_100%)] opacity-95" />
              <div className="absolute right-[16%] top-[22%] h-[13%] w-[16%] rounded-full bg-[#d48d55]" />
              <div className="absolute left-[18%] top-[24%] h-[12%] w-[12%] rounded-full bg-[#d36c75]" />
              <div className="absolute bottom-[12%] right-[18%] h-[16%] w-[28%] rounded-full bg-[#5b5f76] opacity-55" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "updated-2") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-[#cfdceb] bg-[#dff0fb] shadow-[0_10px_25px_rgba(15,23,42,0.14)]",
          className,
        )}
      >
        <div className="absolute left-[12%] top-[10%] h-[24%] w-[26%] rounded-[16px] border border-[#ddd3c7] bg-white shadow-[0_8px_15px_rgba(15,23,42,0.14)]">
          <div className="absolute inset-[6px] rounded-[12px] bg-[radial-gradient(circle_at_35%_30%,#f8f1dc_0%,#cfd9e3_35%,#f6d7c0_75%,#b7c6d2_100%)]" />
        </div>
        <div className="absolute right-[10%] top-[10%] h-[25%] w-[26%] rounded-[16px] border border-[#ddd3c7] bg-white shadow-[0_8px_15px_rgba(15,23,42,0.14)]">
          <div className="absolute inset-[6px] rounded-[12px] bg-[radial-gradient(circle_at_56%_24%,#bde3f4_0%,#6f96b3_39%,#f6ebd7_40%,#cfae8f_72%,#ffffff_100%)]" />
        </div>
        <div className="absolute left-[16%] top-[44%] h-[24%] w-[26%] rounded-[16px] border border-[#9bc68d] bg-white shadow-[0_8px_15px_rgba(15,23,42,0.14)]">
          <div className="absolute inset-[6px] rounded-[12px] bg-[linear-gradient(135deg,#d2eac5_0%,#7bc06b_100%)]" />
        </div>
        <div className="absolute right-[13%] top-[44%] h-[24%] w-[26%] rounded-[16px] border border-[#9bc68d] bg-white shadow-[0_8px_15px_rgba(15,23,42,0.14)]">
          <div className="absolute inset-[6px] rounded-[12px] bg-[linear-gradient(135deg,#f0f6cf_0%,#90c97b_100%)]" />
        </div>
        <div className="absolute left-[20%] bottom-[12%] h-[23%] w-[31%] rounded-[16px] border border-[#e4d0be] bg-white shadow-[0_8px_15px_rgba(15,23,42,0.16)]">
          <div className="absolute inset-[5px] rounded-[11px] bg-[linear-gradient(135deg,#f3dcc4_0%,#e18f73_45%,#f0f4f7_46%,#fefefe_100%)]" />
          <div className="absolute -left-[14%] bottom-[-6%] h-[48%] w-[30%] rotate-[-18deg] rounded-[999px_999px_60px_60px] bg-[#ca9b72] shadow-[0_6px_18px_rgba(15,23,42,0.18)]" />
        </div>
        <div className="absolute right-[13%] bottom-[12%] h-[23%] w-[31%] rounded-[16px] border border-[#ddd3c7] bg-white shadow-[0_8px_15px_rgba(15,23,42,0.14)]">
          <div className="absolute inset-[5px] rounded-[11px] bg-[linear-gradient(135deg,#f8e2df_0%,#e7a78e_55%,#f6f7f8_56%,#ffffff_100%)]" />
        </div>
        <div className="absolute right-[2%] bottom-[2%] h-[18px] w-[18px] rounded-full bg-white/70" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-[#C3C6D4] bg-gradient-to-br from-slate-100 via-white to-slate-200 shadow-[0_10px_25px_rgba(15,23,42,0.12)]",
        className,
      )}
    />
  );
}