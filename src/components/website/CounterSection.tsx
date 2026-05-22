"use client";

import React, { useState, useEffect } from "react";

export interface OfferTime {
  days: number;
  hours: number;
  minutes: number;
}

export function getGalleryOfferInitialTime(): OfferTime {
  return {
    days: 2,
    hours: 14,
    minutes: 45,
  };
}

interface GalleryOfferSectionProps {
  initialDays?: number;
  initialHours?: number;
  initialMinutes?: number;
}

export default function GalleryOfferSection({
  initialDays = 2,
  initialHours = 14,
  initialMinutes = 45,
}: GalleryOfferSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes,
  });

  /* COUNTDOWN */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes } = prev;

        if (minutes > 0) {
          minutes -= 1;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
        } else {
          clearInterval(timer);
        }

        return { days, hours, minutes };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  /* FORMAT */
  const formatTime = (time: number) =>
    time.toString().padStart(2, "0");

  return (
    <section className="w-full bg-[#f9f9fe] pt-[40px] lg:pt-[10px] pb-[40px] lg:pb-[100px]">

      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-[100px]">

        <div
          className="
            relative
            overflow-hidden
            rounded-[24px]
            px-5 py-8
            sm:px-8 sm:py-10
            lg:px-16 lg:py-14
          "
          style={{
            background:
              "linear-gradient(105deg, #071E54 75%, #133074 75%)",
          }}
        >

          {/* MAIN FLEX */}
          <div
            className="
              flex flex-col
              items-center
              text-center
              gap-2

              xl:flex-row
              xl:items-center
              xl:justify-between
              xl:text-left
            "
          >

            {/* LEFT CONTENT */}
            <div className="z-10 w-full max-w-[420px]">

              <div className="mb-[18px] inline-flex rounded-full bg-[#b11010] px-[14px] py-[5px] text-[11px] font-bold tracking-[2px] text-white/95 sm:text-[12px]">
                LIMITED RELEASE
              </div>

              <h2 className="font-manrope text-[28px] font-bold leading-[36px] text-white/95 sm:text-[34px] sm:leading-[42px]">
                Limited Time Gallery
                <br />
                Opening Offer
              </h2>

              <p className="mt-[10px] font-inter text-[15px] leading-[24px] text-white/90 sm:text-[17px]">
                Elevate your home with 20% off all Gallery Frames.
                Exclusive seasonal pricing.
              </p>

            </div>

            {/* TIMER */}
            <div
              className="
                z-10
                flex items-center justify-center
                gap-4 sm:gap-6 lg:gap-7
                text-center text-white/95
                flex-wrap
              "
            >

              {/* DAYS */}
              <div>
                <div className="font-manrope text-[38px] font-bold leading-none sm:text-[48px]">
                  {formatTime(timeLeft.days)}
                </div>

                <div className="mt-[6px] text-[11px] font-medium tracking-[2px] text-white/60 sm:text-[12px]">
                  DAYS
                </div>
              </div>

              <div className="mb-[16px] text-[26px] font-bold text-[#D90000] sm:text-[34px]">
                :
              </div>

              {/* HOURS */}
              <div>
                <div className="font-manrope text-[38px] font-bold leading-none sm:text-[48px]">
                  {formatTime(timeLeft.hours)}
                </div>

                <div className="mt-[6px] text-[11px] font-medium tracking-[2px] text-white/60 sm:text-[12px]">
                  HOURS
                </div>
              </div>

              <div className="mb-[16px] text-[26px] font-bold text-[#D90000] sm:text-[34px]">
                :
              </div>

              {/* MINUTES */}
              <div>
                <div className="font-manrope text-[38px] font-bold leading-none sm:text-[48px]">
                  {formatTime(timeLeft.minutes)}
                </div>

                <div className="mt-[6px] text-[11px] font-medium tracking-[2px] text-white/60 sm:text-[12px]">
                  MINS
                </div>
              </div>

            </div>

            {/* BUTTON */}
            <button
              className="
                z-10
                flex items-center justify-center

                h-[54px]
                w-full
                max-w-[220px]

                rounded-[10px]
                bg-white

                px-6

                font-inter
                text-[14px]
                font-bold
                text-[#07357E]

                transition-all
                hover:scale-[1.02]

                sm:h-[62px]
                sm:text-[15px]

                xl:w-[160px]
              "
            >
              Claim Offer
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}