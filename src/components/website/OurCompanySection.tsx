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
  url: string;
  icon?: LucideIcon;
  imagePath?: string;
};

const contactCards: ContactCard[] = [
  {
    id: "phone",
    label: "Phone",
    value: "+94 753 912 534",
    subtext: "Mon – Sat, 9AM – 6PM",
    icon: Phone,
  },
  {
    id: "email",
    label: "Email",
    value: "magnifyofficials@gmail.com",
    subtext: "We reply within 24 hours",
    icon: Mail,
  },
  {
    id: "address",
    label: "Address",
    value: "125A, KKS Road, Kokuvil",
    subtext: "Jaffna, Sri Lanka",
    icon: MapPin,
  },
];

const socialIcons: SocialIcon[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/94753912534",
    icon: MessageCircle,
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://web.facebook.com/MagnifyMagnets",
    imagePath: "/facebook.svg",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/magnify_magnets?igsh=MWZxc2U3ZmR1OXR1Mw==",
    imagePath: "/instagram-icon.svg",
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@magnify_magnets?_r=1&_t=ZS-97RfTSn7LJE",
    imagePath: "/tiktok-icon.svg",
  },
];

function CompanyInfoCard({ label, value, subtext, icon: Icon }: ContactCard) {
  return (
    <article className="mb-4 flex w-full flex-row items-center gap-4 rounded-[16px] border border-[#F9FAFB] bg-white p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] sm:p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-[#FEF2F2]">
        <Icon className="h-6 w-6 text-[#D10A0A]" aria-hidden="true" />
      </div>

      <div className="flex min-w-0 flex-col">
        <p className="font-inter text-[14px] font-medium text-[#9CA3AF]">
          {label}
        </p>
        <p className="break-words font-manrope text-[18px] font-bold leading-[1.35] text-[#001E50]">
          {value}
        </p>
        {subtext && (
          <p className="break-words font-inter text-[12px] leading-[1.4] text-[#9CA3AF]">
            {subtext}
          </p>
        )}
      </div>
    </article>
  );
}

export default function OurCompanySection() {
  return (
    <div className="w-full" aria-labelledby="our-company-title">
      <header>
        <h1
          id="our-company-title"
          className="font-manrope text-[24px] font-bold leading-[1.2] text-[#001E50]"
        >
          Our Company
        </h1>

        <p className="mb-8 mt-4 font-inter text-[16px] leading-[26px] text-[#6B7280]">
          We are here to support your business inquiries and partnerships.
          Reach out through phone, email, or visit us in person.
        </p>
      </header>

      <div className="flex flex-col">
        {contactCards.map((card) => (
          <CompanyInfoCard key={card.id} {...card} />
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <p className="font-inter text-[14px] font-medium uppercase tracking-[0.04em] text-[#747784]">
          FOLLOW US
        </p>

        <div className="flex gap-4">
          {socialIcons.map(({ id, label, imagePath, url }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}