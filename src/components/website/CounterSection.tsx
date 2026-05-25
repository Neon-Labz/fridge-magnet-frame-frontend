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

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <section className="w-full bg-[#f9f9fe] pt-[40px] lg:pt-[10px] pb-[40px] lg:pb-[20px]">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-[100px]">
        
        <div
          className="relative overflow-hidden rounded-[24px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-14"
          style={{
            background: "linear-gradient(105deg, #071E54 75%, #133074 75%)",
          }}
        >

          {/* MAIN CONTENT */}
          <div className="flex flex-col xl:flex-row items-center justify-between text-center xl:text-left gap-6">

            {/* LEFT TEXT */}
            <div className="z-10 w-full max-w-[420px]">
              <div className="mb-[18px] inline-flex rounded-full bg-[#b11010] px-[14px] py-[5px] text-[11px] font-bold tracking-[2px] text-white/95 sm:text-[12px]">
                LIMITED RELEASE
              </div>

              <h2 className="font-manrope text-[28px] sm:text-[34px] font-bold leading-[36px] sm:leading-[42px] text-white/95">
                Limited Time Gallery
                <br />
                Opening Offer
              </h2>

              <p className="mt-[10px] text-[15px] sm:text-[17px] leading-[24px] text-white/90">
                Elevate your home with 20% off all Gallery Frames. Exclusive seasonal pricing.
              </p>
            </div>

            {/* TIMER */}
            <div className="z-10 flex items-center justify-center gap-4 sm:gap-6 text-white/95">

              <div className="text-center">
                <div className="text-[38px] sm:text-[48px] font-bold">
                  {formatTime(timeLeft.days)}
                </div>
                <div className="text-[11px] sm:text-[12px] tracking-[2px] text-white/60 mt-1">
                  DAYS
                </div>
              </div>

              <div className="text-[26px] sm:text-[34px] font-bold text-[#D90000]">:</div>

              <div className="text-center">
                <div className="text-[38px] sm:text-[48px] font-bold">
                  {formatTime(timeLeft.hours)}
                </div>
                <div className="text-[11px] sm:text-[12px] tracking-[2px] text-white/60 mt-1">
                  HOURS
                </div>
              </div>

              <div className="text-[26px] sm:text-[34px] font-bold text-[#D90000]">:</div>

              <div className="text-center">
                <div className="text-[38px] sm:text-[48px] font-bold">
                  {formatTime(timeLeft.minutes)}
                </div>
                <div className="text-[11px] sm:text-[12px] tracking-[2px] text-white/60 mt-1">
                  MINS
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button className="z-10 flex items-center justify-center h-[54px] sm:h-[62px] w-full max-w-[220px] rounded-[10px] bg-white text-[#07357E] font-bold text-[14px] sm:text-[15px] transition hover:scale-[1.02]">
              Claim Offer
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}