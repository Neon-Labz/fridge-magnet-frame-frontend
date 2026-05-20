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
          background: 'linear-gradient(105deg, #071E54 75%, #133074 75%)',
        }}
      >
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

        {/* RIGHT: timer + button */}
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-center md:justify-end z-10">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold">{formatTime(timeLeft.days)}</span>
              <span className="text-xs font-medium tracking-widest mt-2 opacity-80">DAYS</span>
            </div>

            <div className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#BC0000' }}>:</div>

            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold">{formatTime(timeLeft.hours)}</span>
              <span className="text-xs font-medium tracking-widest mt-2 opacity-80">HOURS</span>
            </div>

            <div className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#BC0000' }}>:</div>

            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold">{formatTime(timeLeft.minutes)}</span>
              <span className="text-xs font-medium tracking-widest mt-2 opacity-80">MINS</span>
            </div>
          </div>

          <button
            className="font-semibold text-sm md:text-base px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all hover:shadow-xl active:scale-95"
            style={{ backgroundColor: 'white', color: '#071E54' }}
          >
            Claim Offer
          </button>
        </div>
      </div>
    </section>
  );
}