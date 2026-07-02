"use client";

import { useState } from "react";
import { useToastStore } from "@/store/toastStore";

interface FeedbackCardProps {
  orderNumber?: string;
}

export default function FeedbackCard({ orderNumber }: FeedbackCardProps) {
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  const { addToast } = useToastStore();

  const handleWhatsAppContact = () => {
    const whatsappNumber = "94753912534";
    const message = `Hi Magnify! I'm contacting you about my order ${orderNumber}. I need assistance with:`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadReceipt = async () => {
    if (!orderNumber || downloadingReceipt) return;

    setDownloadingReceipt(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${apiUrl}/orders/${orderNumber}/receipt`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to generate receipt");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${orderNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      addToast("Receipt downloaded successfully", "success");
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : "Failed to download receipt",
        "error"
      );
    } finally {
      setDownloadingReceipt(false);
    }
  };

  const steps = [
    "Continue shopping through WhatsApp",
    "Send high-quality images",
    "Provide complete order details",
    "Our team will review and provide further assistance",
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#C0392B] bg-[#F5C6CB] shadow-md sm:rounded-3xl">
      <div className="flex flex-col p-5 sm:p-7">

        {/* Heading */}
        <h2 className="mb-4 font-manrope text-xl font-bold text-[#B91C1C] sm:text-2xl">
          Complete Your Order
        </h2>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-[#1A1C1F] sm:text-base">
          To process your custom frames, we require high-quality images and complete order details.
        </p>

        {/* Bullet steps */}
        <ul className="mb-6 flex flex-col gap-2 pl-1">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#1A1C1F] sm:text-base">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A1C1F]" />
              {step}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {/* WhatsApp button */}
          <button
            onClick={handleWhatsAppContact}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-5 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#22C55E] active:scale-95"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 shrink-0 fill-white">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.827.737 5.476 2.027 7.774L0 32l8.489-2.001A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.25a13.22 13.22 0 0 1-6.748-1.843l-.484-.287-5.037 1.187 1.23-4.906-.317-.503A13.193 13.193 0 0 1 2.75 16C2.75 8.682 8.682 2.75 16 2.75S29.25 8.682 29.25 16 23.318 29.25 16 29.25zm7.27-9.876c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.464.298-.862.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.175-.811.18-.178.398-.464.597-.696.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.696-.1-.199-.897-2.162-1.228-2.96-.324-.776-.653-.671-.897-.683l-.764-.013c-.265 0-.696.1-1.061.497-.365.398-1.394 1.362-1.394 3.324s1.427 3.856 1.626 4.122c.199.265 2.809 4.289 6.808 6.016.951.411 1.693.656 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.1-.166-.365-.265-.763-.464z" />
            </svg>
            <span className="text-center leading-tight">
              Chat with us on<br />WhatsApp
            </span>
          </button>

          {/* Download Receipt button */}
          <button
            onClick={handleDownloadReceipt}
            disabled={downloadingReceipt}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#C0392B] px-5 py-3 text-sm font-bold shadow-sm transition-all ${
              downloadingReceipt
                ? "cursor-not-allowed bg-[#F5C6CB]/60 text-[#B91C1C]/50"
                : "bg-white text-[#B91C1C] hover:bg-[#fdf0f0] active:scale-95"
            }`}
            type="button"
          >
            {downloadingReceipt ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 animate-spin" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Generating Receipt…
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15V3m0 12-4-4m4 4 4-4" />
                  <path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
                </svg>
                Download Receipt
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
