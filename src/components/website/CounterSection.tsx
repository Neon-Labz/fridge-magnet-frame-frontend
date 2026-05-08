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

  // Client-side countdown effect
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
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, []);

  // Format numbers to have leading zero
  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <section 
      className="w-full flex justify-center px-[20px] py-[40px]"
    >
      <div 
        className="w-full max-w-[1273px] rounded-[24px] overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 lg:px-20 relative"
        style={{
          background: "linear-gradient(105deg, #071E54 75%, #133074 75%)",
          color: "white"
        }}
      >
        {/* Left Content */}
        <div className="flex flex-col items-start max-w-2xl z-10 space-y-4">
          <div 
            className="text-xs font-bold px-3 py-1 rounded-full tracking-wider"
            style={{ backgroundColor: "#BC0000", color: "white" }}
          >
            LIMITED RELEASE
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Limited Time Gallery Opening Offer
          </h2>
          
          <p className="text-base md:text-lg opacity-90 max-w-md">
            Elevate your home with 20% off all Gallery Frames. Exclusive seasonal pricing.
          </p>
        </div>

        {/* Right Content: Timer & Button */}
        <div className="flex flex-col md:flex-row items-center mt-8 lg:mt-0 gap-8 z-10">
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">{formatTime(timeLeft.days)}</span>
              <span className="text-xs font-medium tracking-widest mt-1 opacity-80">DAYS</span>
            </div>
            
            <div className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#BC0000" }}>:</div>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">{formatTime(timeLeft.hours)}</span>
              <span className="text-xs font-medium tracking-widest mt-1 opacity-80">HOURS</span>
            </div>
            
            <div className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#BC0000" }}>:</div>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold">{formatTime(timeLeft.minutes)}</span>
              <span className="text-xs font-medium tracking-widest mt-1 opacity-80">MINS</span>
            </div>
          </div>

          {/* Button */}
          <button 
            className="font-semibold text-sm md:text-base px-8 py-4 rounded shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: "white", color: "#071E54" }}
          >
            Claim<br/>Offer
          </button>

        </div>
      </div>
    </section>
  );
}
