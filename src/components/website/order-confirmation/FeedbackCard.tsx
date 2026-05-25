"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface FeedbackCardProps {
  onSubmit?: (rating: number, feedback: string) => void;
}

export default function FeedbackCard({ onSubmit }: FeedbackCardProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmitFeedback = () => {
    if (rating > 0 || feedback.trim()) {
      setSubmitted(true);
      showToast("Thank you! Your feedback was submitted successfully", "success", 3000);
      onSubmit?.(rating, feedback);
      setTimeout(() => {
        setRating(0);
        setFeedback("");
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-[#0040A1] p-5 sm:p-6 lg:p-8 text-white shadow-lg w-full flex flex-col">
      <h2 className="font-manrope text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
        Your order was successful
      </h2>

      <p className="text-xs sm:text-sm text-[#A8C7FF] mb-3 sm:mb-4 leading-relaxed font-normal">
        Help us improve the framing experience for everyone.
      </p>

      <p className="text-xs sm:text-sm font-semibold text-white mb-5 sm:mb-6">
        How would you rate your experience?
      </p>

      {/* Star Rating */}
      <div className="mb-6 sm:mb-8 flex justify-start gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`flex h-16 w-16 sm:h-18 sm:w-18 lg:h-20 lg:w-20 items-center justify-center rounded-lg transition-all transform hover:scale-110 ${
              rating >= star
                ? "bg-[#0A56D4] border-2 border-[#FFD700]"
                : "bg-[#0A56D4]/70 border-2 border-white/40"
            }`}
            type="button"
          >
            <Star className={`h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 fill-current transition-all ${
              rating >= star
                ? "text-[#FFD700]"
                : "text-white/50"
            }`} />
          </button>
        ))}
      </div>

      {/* Feedback Textarea */}
      <div className="mb-6 sm:mb-8 flex-1 flex flex-col">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us what you liked..."
          className="w-full flex-1 rounded-xl sm:rounded-2xl bg-[#003A7F]/50 border-2 border-[#0A7FFF]/60 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-white placeholder-[#A8C7FF]/60 focus:outline-none focus:border-[#FFB800] focus:bg-[#003A7F]/70 resize-none transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitFeedback}
        disabled={submitted}
        className={`w-full rounded-lg sm:rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 font-bold text-xs sm:text-sm lg:text-base transition-all shadow-md ${
          submitted
            ? "bg-[#E8E8ED] text-[#434652] cursor-not-allowed"
            : "bg-white text-[#0040A1] hover:bg-gray-50 active:scale-98"
        }`}
        type="button"
      >
        {submitted ? "✓ Thank you!" : "Submit Feedback"}
      </button>
    </div>
  );
}
