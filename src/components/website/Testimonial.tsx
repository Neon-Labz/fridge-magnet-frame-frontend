"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Sureka Appuththurai",
    role: "Google Review",
    initials: "S",
    review:
      "Very satisfied with the fridge magnets! The print quality is amazing, photos are clear, and the finishing looks premium. Fast delivery and great customer service. Highly recommended.",
  },
  {
    name: "Vaishu Sutha",
    role: "Google Review",
    initials: "V",
    review:
      "Excellent quality fridge magnets 😍 Photos came out very clear and beautiful. Fast delivery and easy ordering process. Really happy with the product and highly recommend it!",
  },
  {
    name: "Rakshana Varatharajan",
    role: "Google Review",
    initials: "R",
    review:
      "Thank you for this amazing idea. Packaging was good and the magnets stick well. I'm happy to order this product.",
  },
  {
    name: "Geerthiga",
    role: "Google Review",
    initials: "G",
    review:
      "Good quality fridge magnet with a clear photo print. Looks nice and delivery was smooth. Happy with the order.",
  },
  {
    name: "Infinite Bliss",
    role: "Google Review",
    initials: "I",
    review:
      "Really liked the fridge magnet. The print quality and finishing were good, and it came exactly as expected.",
  },
  {
    name: "Jalani Kaneswaran",
    role: "Google Review",
    initials: "J",
    review:
      "Good quality magnet frame with a strong magnet and nice finishing. Looks beautiful and worth the price. Happy with the purchase! 😊🥰",
  },
];

export default function CustomerSection() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleTestimonials = Array.from({ length: 3 }, (_, index) => {
    return testimonials[(startIndex + index) % testimonials.length];
  });

  const handleNext = () => {
    setStartIndex(
      (previousIndex) => (previousIndex + 1) % testimonials.length,
    );
  };

  const handlePrevious = () => {
    setStartIndex(
      (previousIndex) =>
        (previousIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="w-full overflow-hidden bg-[#F9F9FE] py-[60px] md:py-[80px] lg:py-[60px]">
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[580px]">
            <h2 className="font-manrope text-[28px] font-bold leading-[38px] text-[#002B73] sm:text-[32px] sm:leading-[44px] lg:text-[35px] lg:leading-[52px]">
              What Our Customers Say
            </h2>

            <p className="mt-[12px] font-inter text-[15px] leading-[26px] text-[#64748B] sm:text-[16px] lg:text-[18px] lg:leading-[28px]">
              Real feedback from customers who chose Magnify to preserve their
              favourite memories.
            </p>
          </div>

          <div className="flex items-center gap-[12px] md:justify-end">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous testimonials"
              className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-[#002B73] text-[#002B73] transition duration-300 hover:bg-[#002B73] hover:text-white"
            >
              <ArrowLeft size={22} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
              className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-[#002B73] text-[#002B73] transition duration-300 hover:bg-[#002B73] hover:text-white"
            >
              <ArrowRight size={22} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="mt-[35px] grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${startIndex}-${index}`}
              className="flex min-h-[296px] w-full animate-[fadeIn_0.35s_ease-in-out] flex-col rounded-[17px] bg-white p-[26px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-[30px] lg:p-[33px]"
            >
              <div
                className="flex gap-[4px] text-[24px] leading-none text-[#F5B301]"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>

              <p className="mt-[30px] flex-1 font-inter text-[15px] italic leading-[25px] text-[#434652] sm:text-[16px] lg:text-[16.7px]">
                “{testimonial.review}”
              </p>

              <div className="mt-[25px] flex items-center gap-[16px]">
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#002B73] font-manrope text-[18px] font-bold text-white">
                  {testimonial.initials}
                </div>

                <div className="min-w-0">
                  <h4 className="font-inter text-[16px] font-semibold leading-[25px] text-[#002B73] sm:text-[16.7px]">
                    {testimonial.name}
                  </h4>

                  <p className="font-inter text-[13px] leading-[17px] text-[#434652] sm:text-[14px]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}