"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Cake,
  Gem,
  GraduationCap,
  Heart,
  PawPrint,
  Plane,
  Smile,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ImagePreviewModal } from "@/components/ui/ImagePreviewModal";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

type Tab = {
  name: string;
  icon: LucideIcon;
};

const tabs: Tab[] = [
  { name: "Wedding", icon: Gem },
  { name: "Birthday", icon: Cake },
  { name: "Family", icon: Users },
  { name: "Graduation", icon: GraduationCap },
  { name: "Couples", icon: Heart },
  { name: "Kids", icon: Smile },
  { name: "Pets", icon: PawPrint },
  { name: "Travel", icon: Plane },
  { name: "Corporate", icon: Building2 },
];

const INITIAL_VISIBLE_COUNT = 10;

const galleryImages: GalleryImage[] = [
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8028.JPG.jpeg", alt: "Gallery image 1", category: "Wedding", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8029.JPG.jpeg", alt: "Gallery image 2", category: "Family", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8030.JPG.jpeg", alt: "Gallery image 3", category: "Kids", width: 992, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8031.JPG.jpeg", alt: "Gallery image 4", category: "Couples", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8033.JPG.jpeg", alt: "Gallery image 5", category: "Wedding", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8034.JPG.jpeg", alt: "Gallery image 6", category: "Birthday", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8035.JPG.jpeg", alt: "Gallery image 7", category: "Graduation", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8036.JPG.jpeg", alt: "Gallery image 8", category: "Travel", width: 1164, height: 860 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8037.JPG.jpeg", alt: "Gallery image 9", category: "Wedding", width: 2847, height: 3796 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8038.JPG.jpeg", alt: "Gallery image 10", category: "Family", width: 1600, height: 1142 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8039.JPG.jpeg", alt: "Gallery image 11", category: "Pets", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8040.JPG.jpeg", alt: "Gallery image 12", category: "Corporate", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8041.JPG.jpeg", alt: "Gallery image 13", category: "Wedding", width: 648, height: 761 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8042.JPG.jpeg", alt: "Gallery image 14", category: "Kids", width: 1200, height: 1600 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8043.JPG.jpeg", alt: "Gallery image 15", category: "Family", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8044.JPG.jpeg", alt: "Gallery image 16", category: "Wedding", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8045.JPG.jpeg", alt: "Gallery image 17", category: "Graduation", width: 960, height: 1280 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8046.JPG.jpeg", alt: "Gallery image 18", category: "Birthday", width: 1424, height: 2532 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8047.JPG.jpeg", alt: "Gallery image 19", category: "Travel", width: 3024, height: 4032 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8048.JPG.jpeg", alt: "Gallery image 20", category: "Couples", width: 3024, height: 4032 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8049.JPG.jpeg", alt: "Gallery image 21", category: "Wedding", width: 4032, height: 3024 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8050.JPG.jpeg", alt: "Gallery image 22", category: "Kids", width: 2396, height: 3197 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8051.JPG.jpeg", alt: "Gallery image 23", category: "Family", width: 3024, height: 4032 },
  { src: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/gallery_images/IMG_8052.JPG.jpeg", alt: "Gallery image 24", category: "Wedding", width: 1440, height: 1920 },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("Wedding");
  const [showAll, setShowAll] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    setShowAll(false);
  }, [activeTab]);

  const filteredImages = galleryImages.filter(
    (img) => img.category === activeTab,
  );
  const visibleImages = showAll
    ? filteredImages
    : filteredImages.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMoreImages = filteredImages.length > INITIAL_VISIBLE_COUNT;

  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1700px] px-4 pt-[92px] sm:px-6 lg:px-[120px]">
        <section className="flex min-h-[300px] flex-col lg:flex-row">
          <div className="relative z-10 flex w-full flex-col justify-center px-4 py-6 lg:w-[40%] lg:py-0 lg:pl-8 lg:pr-4">
            <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
              <Link href="/" className="text-gray-400 hover:text-[#D40B0B]">
                Home
              </Link>
              <span className="mx-1 text-gray-400">&rsaquo;</span>
              <span className="text-[#D40B0B] font-medium">Gallery</span>
            </div>

            <h1 className="text-[32px] lg:text-[52px] font-extrabold leading-tight mb-2">
              <span className="text-[#071B3D]">Our </span>
              <span className="text-[#D40B0B]">Gallery</span>
            </h1>

            <div className="w-14 h-[3px] bg-[#D40B0B] rounded-full mb-4" />

            <p className="text-[14px] lg:text-[18px] leading-relaxed text-gray-500 max-w-[360px]">
              Explore our collection of beautifully designed fridge magnets
              and frames. Made with love, printed with precision.
            </p>
          </div>
          <div className="relative z-0 h-[200px] w-full overflow-hidden lg:h-auto lg:flex-1">
            <Image
              src="/gallery_final.png"
              alt="Gallery Hero"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center lg:object-left"
            />
          </div>
        </section>

        <div className="mt-4 w-full overflow-x-auto border-b border-gray-200 bg-white">
          <div className="flex min-w-max flex-nowrap justify-start px-4 lg:min-w-0 lg:w-full lg:justify-between lg:px-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex flex-col items-center gap-1 whitespace-nowrap border-b-2 py-3 px-4 text-[10px] font-semibold cursor-pointer transition-all duration-300 sm:text-xs lg:flex-1 lg:py-4 lg:px-2 lg:text-xs ${
                    isActive
                      ? "border-[#D40B0B] text-[#D40B0B]"
                      : "border-transparent text-[#071B3D] hover:text-[#D40B0B]"
                  }`}
                >
                  <tab.icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pb-8">
          <div className="grid grid-cols-2 items-start gap-2 py-4 sm:grid-cols-3 lg:grid-cols-5">
            {visibleImages.map((image, index) => (
              <div
                key={image.src}
                onClick={() => setPreviewIndex(index)}
                className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {hasMoreImages && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="cursor-pointer rounded-full bg-[#D40B0B] px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b50909] hover:shadow-lg"
              >
                {showAll ? "Show Less" : "View All Gallery"}
              </button>
            </div>
          )}
        </div>
      </div>

      {previewIndex !== null && (
        <ImagePreviewModal
          images={visibleImages}
          currentIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onNavigate={setPreviewIndex}
        />
      )}
    </div>
  );
}
