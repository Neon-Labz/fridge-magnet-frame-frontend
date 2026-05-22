import Image from "next/image";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";

type ContactCard = {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
};

type SocialIcon = {
  id: string;
  label: string;
  icon?: LucideIcon;
  imagePath?: string;
};

const contactCards: ContactCard[] = [
  {
    id: "phone",
    label: "PHONE",
    value: "+94 75 391 2534",
    subtext: "Mon-Fri, 9am - 6pm",
    icon: Phone,
  },
  {
    id: "email",
    label: "EMAIL",
    value: "magnifyofficials@gmail.com",
    subtext: "Response within 24 hours",
    icon: Mail,
  },
  {
    id: "address",
    label: "ADDRESS",
    value: "Kokuvil West, Jaffna",
    subtext: "Find us here",
    icon: MapPin,
  },
];

const socialIcons: SocialIcon[] = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "facebook", label: "Facebook", imagePath: "/facebook.svg" },
  { id: "instagram", label: "Instagram", imagePath: "/instagram-icon.svg" },
  { id: "tiktok", label: "TikTok", imagePath: "/tiktok-icon.svg" },
];

function CompanyInfoCard({ label, value, subtext, icon: Icon }: ContactCard) {
  return (
    <article className="flex items-center gap-4 rounded-[12px] border border-[#C3C6D4] bg-white p-3 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#0040A1]/10 text-[#0040A1]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-inter text-[14px] font-medium uppercase tracking-[0.02em] text-[#747784]">
          {label}
        </p>
        <p className="font-inter text-[16px] font-semibold leading-[1.35] text-[#1B1E2A]">
          {value}
        </p>
        {subtext && (
          <p className="font-inter text-[14px] leading-[1.45] text-[#747784]">
            {subtext}
          </p>
        )}
      </div>
    </article>
  );
}

export default function OurCompanySection() {
  return (
    <div className="w-full md:pl-4 lg:pl-6" aria-labelledby="our-company-title">
      <header className="flex flex-col gap-2">
        <h1
          id="our-company-title"
          className="font-manrope text-[30px] font-bold leading-[1.2] text-[#002B73]"
        >
          Our Company
        </h1>

        <p className="font-inter text-[16px] leading-[29px] text-[#434652]">
          We are here to support your business inquiries and partnerships. 
          Reach out through phone, email, or visit us in person.
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-2">
        {contactCards.map((card) => (
          <CompanyInfoCard key={card.id} {...card} />
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <p className="font-inter text-[14px] font-medium uppercase tracking-[0.04em] text-[#747784]">
          FOLLOW US
        </p>

        <div className="flex gap-4">
          {socialIcons.map(({ id, label, imagePath }) => (
            <button
              key={id}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDEDF2] transition hover:bg-[#DFE1EB]"
              aria-label={label}
            >
              {id === "whatsapp" ? (
                <svg
                  viewBox="0 0 16 16"
                  className="h-6 w-6 text-black"
                  fill="currentColor"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 8.043.003a7.935 7.935 0 0 0-6.087 2.79A7.908 7.908 0 0 0 .02 8.269a7.8 7.8 0 0 0 1.018 3.9L0 16l3.91-1.013a7.95 7.95 0 0 0 4.114 1.159h.003c4.392 0 7.964-3.548 7.964-7.91a7.95 7.95 0 0 0-2.39-5.912Z" />
                </svg>
              ) : (
                imagePath && (
                  <Image
                    src={imagePath}
                    alt={label}
                    width={22}
                    height={22}
                    style={{ objectFit: "contain" }}
                  />
                )
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
