"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useToastStore } from "@/store/toastStore";
import { submitFeedback } from "@/services/feedbackService";

interface FeedbackCardProps {
  orderNumber?: string;
  customerName?: string;
  email?: string;
  onSubmit?: (rating: number, feedback: string) => void;
}

export default function FeedbackCard({
  orderNumber,
  customerName,
  email,
  onSubmit,
}: FeedbackCardProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  const { addToast } = useToastStore();

  const handleSubmitFeedback = async () => {
    if (submitting || submitted) return;

    if (rating === 0 && !feedback.trim()) {
      addToast("Please add a rating or a comment first", "info");
      return;
    }

    setSubmitting(true);

    try {
      await submitFeedback({
        rating,
        comment: feedback,
        orderNumber,
        customerName,
        email,
      });

      setSubmitted(true);
      addToast("Thank you! Your feedback was submitted successfully", "success");
      onSubmit?.(rating, feedback);

      setTimeout(() => {
        setRating(0);
        setFeedback("");
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : "Failed to submit feedback",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

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
      // Use the API base URL from environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${apiUrl}/orders/${orderNumber}/receipt`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to generate receipt');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${orderNumber}.html`;
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

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#DC2626] p-5 text-white shadow-lg sm:rounded-3xl sm:p-6 lg:p-8">
      <h2 className="mb-2 font-manrope text-lg font-bold sm:mb-3 sm:text-xl lg:text-2xl">
        Your order was successful
      </h2>

      <p className="mb-4 text-xs font-normal leading-relaxed text-red-100 sm:mb-5 sm:text-sm">
        Next steps to complete your custom magnets:
      </p>

      <ul className="mb-6 space-y-2 text-xs text-white sm:mb-7 sm:text-sm">
        <li className="flex items-start">
          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0"></span>
          Contact us via WhatsApp
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0"></span>
          Send your order confirmation receipt
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0"></span>
          Send your HD-quality images for customized magnets
        </li>
        <li className="flex items-start">
          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0"></span>
          Discuss the payment process
        </li>
      </ul>

      <div className="mb-6 space-y-3 sm:mb-7">
        <button
          onClick={handleWhatsAppContact}
          className="w-full rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#22C55E] active:scale-95 sm:text-base"
          type="button"
        >
          💬 Chat on WhatsApp
        </button>
        
        <button
          onClick={handleDownloadReceipt}
          disabled={downloadingReceipt}
          className={`w-full rounded-lg px-4 py-3 text-sm font-bold shadow-md transition-all sm:text-base ${
            downloadingReceipt
              ? "cursor-not-allowed bg-gray-400 text-gray-600"
              : "bg-white text-[#DC2626] hover:bg-gray-50 active:scale-95"
          }`}
          type="button"
        >
          {downloadingReceipt ? "Generating..." : "📄 Download Receipt"}
        </button>
      </div>

      <p className="mb-5 text-xs font-semibold text-white sm:mb-6 sm:text-sm">
        How would you rate your experience? (Optional)
      </p>

      <div className="mb-6 grid w-full grid-cols-5 gap-2 sm:mb-8 sm:gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`flex aspect-square w-full items-center justify-center rounded-lg border-2 transition-all hover:scale-105 ${
              rating >= star
                ? "border-[#FFD700] bg-[#B91C1C]"
                : "border-white/40 bg-[#B91C1C]/70"
            }`}
            type="button"
          >
            <Star
              className={`h-6 w-6 fill-current transition-all sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${
                rating >= star ? "text-[#FFD700]" : "text-white/50"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mb-6 sm:mb-8">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us what you liked..."
          rows={4}
          className="min-h-[120px] w-full resize-none rounded-xl border-2 border-red-300/60 bg-[#B91C1C]/50 px-4 py-3 text-xs text-white placeholder-red-100/60 transition-all focus:border-[#FFB800] focus:bg-[#B91C1C]/70 focus:outline-none sm:rounded-2xl sm:px-5 sm:py-4 sm:text-sm"
        />
      </div>

      <button
        onClick={handleSubmitFeedback}
        disabled={submitted || submitting}
        className={`w-full rounded-lg px-5 py-2.5 text-xs font-bold shadow-md transition-all sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm lg:text-base ${
          submitted || submitting
            ? "cursor-not-allowed bg-[#E8E8ED] text-[#434652]"
            : "bg-white text-[#DC2626] hover:bg-gray-50 active:scale-95"
        }`}
        type="button"
      >
        {submitted
          ? "✓ Thank you!"
          : submitting
            ? "Submitting..."
            : "Submit Feedback"}
      </button>
    </div>
  );
}