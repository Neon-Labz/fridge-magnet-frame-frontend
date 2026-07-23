import {
  ArrowRight,
  ImagePlus,
  Truck,
  UploadCloud,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Upload Your Photo",
    description: "Choose your favorite photo and upload it easily.",
    icon: UploadCloud,
  },
  {
    number: 2,
    title: "Customize & Preview",
    description: "Select size, style and preview your magnet before printing.",
    icon: ImagePlus,
  },
  {
    number: 3,
    title: "We Print & Deliver",
    description:
      "We print with premium quality and deliver to your doorstep.",
    icon: Truck,
  },
];

export default function HowItWorksSection() {
  return (
<section className="mt-4 w-full bg-[#F7F8FC] py-10 sm:mt-6 sm:py-12 lg:mt-8 lg:py-14">
    <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
          {/* TITLE */}
        <div className="text-center">
          <h2 className="font-manrope text-[26px] font-extrabold leading-tight text-[#002B73] sm:text-[32px] lg:text-[38px]">
            How It Works In 3 Simple Steps
          </h2>
        </div>

        {/* STEPS */}
<div className="relative mt-6 grid grid-cols-1 gap-7 md:mt-8 md:grid-cols-3 md:gap-16 lg:mt-10 lg:gap-20">
            {/* DOTTED CONNECTOR LINE */}
          <div className="absolute left-[16%] right-[16%] top-[97px] hidden border-t-2 border-dashed border-[#D9DFEA] md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                {/* ARROW BETWEEN CARDS */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-[46px] top-[78px] z-20 hidden h-10 w-10 items-center justify-center rounded-full border border-[#E6EAF1] bg-white text-[#07357E] shadow-[0_5px_18px_rgba(15,23,42,0.12)] md:flex lg:-right-[60px]">
                    <ArrowRight size={19} strokeWidth={2.5} />
                  </div>
                )}

                {/* CARD */}
                <div className="relative z-10 flex min-h-[285px] flex-col items-center rounded-[16px] border border-white bg-white px-6 py-8 text-center shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:px-8">
                  {/* ICON CIRCLE */}
                  <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#F3F6FB]">
                    <Icon
                      size={39}
                      strokeWidth={1.8}
                      className="text-[#07357E]"
                    />
                  </div>

                  {/* NUMBER */}
                  <div className="relative -mt-1 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[3px] border-white bg-[#07357E] font-inter text-[12px] font-bold text-white shadow-sm">
                    {step.number}
                  </div>

                  {/* CONTENT */}
                  <h3 className="mt-4 font-manrope text-[17px] font-extrabold text-[#101828] sm:text-[18px]">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-[260px] font-inter text-[13px] leading-[21px] text-[#667085] sm:text-[14px]">
                    {step.description}
                  </p>
                </div>

                {/* MOBILE ARROW */}
                {index < steps.length - 1 && (
                  <div className="mx-auto mt-5 flex h-10 w-10 rotate-90 items-center justify-center rounded-full border border-[#E6EAF1] bg-white text-[#07357E] shadow-sm md:hidden">
                    <ArrowRight size={19} strokeWidth={2.5} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}