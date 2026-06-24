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

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#0040A1] p-5 text-white shadow-lg sm:rounded-3xl sm:p-6 lg:p-8">
      <h2 className="mb-2 font-manrope text-lg font-bold sm:mb-3 sm:text-xl lg:text-2xl">
        Your order was successful
      </h2>

      <p className="mb-3 text-xs font-normal leading-relaxed text-[#A8C7FF] sm:mb-4 sm:text-sm">
        Help us improve the framing experience for everyone.
      </p>

      <p className="mb-5 text-xs font-semibold text-white sm:mb-6 sm:text-sm">
        How would you rate your experience?
      </p>

      <div className="mb-6 grid w-full grid-cols-5 gap-2 sm:mb-8 sm:gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`flex aspect-square w-full items-center justify-center rounded-lg border-2 transition-all hover:scale-105 ${
              rating >= star
                ? "border-[#FFD700] bg-[#0A56D4]"
                : "border-white/40 bg-[#0A56D4]/70"
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
          className="min-h-[120px] w-full resize-none rounded-xl border-2 border-[#0A7FFF]/60 bg-[#003A7F]/50 px-4 py-3 text-xs text-white placeholder-[#A8C7FF]/60 transition-all focus:border-[#FFB800] focus:bg-[#003A7F]/70 focus:outline-none sm:rounded-2xl sm:px-5 sm:py-4 sm:text-sm"
        />
      </div>

      <button
        onClick={handleSubmitFeedback}
        disabled={submitted || submitting}
        className={`w-full rounded-lg px-5 py-2.5 text-xs font-bold shadow-md transition-all sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm lg:text-base ${
          submitted || submitting
            ? "cursor-not-allowed bg-[#E8E8ED] text-[#434652]"
            : "bg-white text-[#0040A1] hover:bg-gray-50 active:scale-95"
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