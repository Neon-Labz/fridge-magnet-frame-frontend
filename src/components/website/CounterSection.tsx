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

  // Countdown
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

  // Format time
  const formatTime = (time: number) =>
    time.toString().padStart(2, "0");

  return (
<section className="w-full bg-[#f9f9fe] px-[100px] pt-[60px]">      
      <div
        className="relative mx-auto flex w-full max-w-[1800px] flex-col items-center justify-between overflow-hidden rounded-[28px] p-8 md:p-12 lg:min-h-[340px] lg:flex-row lg:px-20"
        style={{
          background:
            "linear-gradient(105deg, #071E54 75%, #133074 75%)",
          
        }}
      >

        {/* LEFT CONTENT */}
        {/* LEFT */}
        <div className="z-10 w-[390px]">
          <div className="mb-[18px] inline-flex rounded-full text-white/95 bg-[#b11010] px-[14px] py-[4px] text-[12px] font-bold tracking-[2px]">
            LIMITED RELEASE
          </div>

          <h2 className="font-manrope text-[34px] text-white/95 font-bold leading-[42px]">
            Limited Time Gallery
            <br />
            Opening Offer
          </h2>

          <p className="mt-[8px] w-[360px] font-inter text-[17px] leading-[24px] text-white/95">
            Elevate your home with 20% off all Gallery Frames. Exclusive seasonal
            pricing.
          </p>
        </div>

        {/* TIMER */}
        <div className="z-10 flex items-center justify-center gap-[28px] text-center text-white/95">
          <div>
            <div className="font-manrope text-[48px] font-bold leading-none">
              {formatTime(timeLeft.days)}
            </div>
            <div className="mt-[5px] text-[12px] font-medium tracking-[2px] text-white/60">
              DAYS
            </div>
          </div>

          <div className="mb-[20px] text-[34px] font-bold text-[#D90000]">:</div>

          <div>
            <div className="font-manrope text-[48px] font-bold leading-none">
              {formatTime(timeLeft.hours)}
            </div>
            <div className="mt-[5px] text-[12px] font-medium tracking-[2px] text-white/60">
              HOURS
            </div>
          </div>

          <div className="mb-[20px] text-[34px] font-bold text-[#D90000]">:</div>

          <div>
            <div className="font-manrope text-[48px] font-bold leading-none">
              {formatTime(timeLeft.minutes)}
            </div>
            <div className="mt-[5px] text-[12px] font-medium tracking-[2px] text-white/60">
              MINS
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="z-10 h-[62px] w-[160px] rounded-[7px] bg-white font-inter text-[15px] font-bold leading-[24px] text-[#07357E]">
          Claim
          Offer
        </button>
      </div>
    </section>
  );
}