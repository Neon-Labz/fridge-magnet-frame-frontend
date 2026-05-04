"use client";

import { Search, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20"
    >
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/avplantations/image/upload/v1775207120/472498951_122218526744196803_2522232841400099127_n_f75t26.jpg?w=1920&q=80"
          alt="Luxury Home"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-48 right-20 hidden xl:block floating">
        <div className="glass rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-80">Property Sold</p>
              <p className="font-bold">Modern Villa, Colombo 7</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-20 right-32 hidden xl:block floating"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="glass rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <Star className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <p className="text-sm opacity-80">Rated</p>
              <p className="font-bold">4.9/5 ⭐ (2,400+ Reviews)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-5 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
            <span className="text-white text-sm font-medium">
              Sri Lanka&apos;s #1 Real Estate Platform
            </span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Find Your <br />
            <span className="text-accent">Perfect</span> Land & Property
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
            Trusted real estate solutions with verified properties, bank loan
            assistance, and legal support.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl" />
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by location, title, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-32 py-5 glass backdrop-blur-sm rounded-1xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 text-slate-100 placeholder-slate-200 shadow-xl"
              />
              <Link
                href={`/properties/?search=${searchQuery}`}
                className="absolute right-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-1xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/30"
              >
                Search
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { val: "30", label: "Properties Listed" },
              { val: "8K", label: "Happy Customers" },
              { val: "25", label: "Cities Covered" },
              { val: "12", label: "Years Experience" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-8">
                <div className="text-white">
                  <p className="text-3xl font-bold">
                    {stat.val}
                    <span className="text-accent">+</span>
                  </p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
                {i < 3 && (
                  <div className="w-px h-10 bg-white/20 hidden sm:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
