import OurCompanySection from "@/components/website/OurCompanySection";
import ContactSection from "@/components/website/ContactSection";
import Header from "@/components/website/ContactHero";

export const metadata = {
  title: 'Contact Us - Magnify',
  description: 'Get in touch with us for your photo restoration and custom album needs.',
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-white text-slate-900">
      <Header />

      <div className="w-full overflow-hidden bg-[#F8F9FB] px-0 py-12">
        <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
          <div className="flex w-full flex-col gap-8 rounded-[32px] bg-white p-8 shadow-[0px_10px_50px_rgba(0,0,0,0.04)] lg:flex-row lg:p-12">
            <div className="w-full lg:w-[35%]">
              <OurCompanySection />
            </div>

            <div className="w-full rounded-[24px] bg-[#F9FAFF] p-6 lg:w-[65%] lg:p-10">
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}