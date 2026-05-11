import Image from 'next/image';
import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';

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
    id: 'phone',
    label: 'PHONE',
    value: '+ 075 391 2534',
    subtext: 'Mon-Fri, 9am - 6pm',
    icon: Phone,
  },
  {
    id: 'email',
    label: 'EMAIL',
    value: 'magnifyofficials@gmail.com',
    subtext: 'Response within 24 hours',
    icon: Mail,
  },
  {
    id: 'address',
    label: 'ADDRESS',
    value: 'Kokuvil West, Jaffna',
    icon: MapPin,
  },
];

const socialIcons: SocialIcon[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'facebook', label: 'Facebook', imagePath: '/facebook.svg' },
  { id: 'instagram', label: 'Instagram', imagePath: '/instagram-icon.svg' },
  { id: 'tiktok', label: 'TikTok', imagePath: '/tiktok-icon.svg' },
];

function CompanyInfoCard({ label, value, subtext, icon: Icon }: ContactCard) {
  return (
    <article className="flex items-start gap-4 rounded-[12px] border border-[#C3C6D4] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#0040A1]/10 text-[#0040A1]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-inter text-[14px] font-medium uppercase tracking-[0.02em] text-[#747784]">
          {label}
        </p>
        <p className="font-inter text-[18px] font-semibold leading-[1.35] text-[#1B1E2A]">
          {value}
        </p>
        {subtext ? (
          <p className="font-inter text-[14px] leading-[1.45] text-[#747784]">
            {subtext}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function OurCompanySection() {
  return (
    <div className="w-full" aria-labelledby="our-company-title">
      <header className="flex flex-col gap-4">
        <h1 id="our-company-title" className="font-manrope text-[30px] font-bold leading-[1.2] text-[#002B73]">
          Our Company
        </h1>
        <p className="font-inter text-[18px] leading-[29px] text-[#434652]">
          We are here to support your business inquiries and partnerships.
          Reach out through phone, email, or visit us in person.
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-4">
        {contactCards.map((card) => (
          <CompanyInfoCard key={card.id} {...card} />
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-[#D6D8E2] pt-6">
        <p className="font-inter text-[14px] font-medium uppercase tracking-[0.04em] text-[#747784]">
          FOLLOW US
        </p>
        <div className="flex gap-4">
          {socialIcons.map(({ id, label, icon: Icon, imagePath }) => (
            <button
              key={id}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDEDF2] transition-colors duration-200 hover:bg-[#DFE1EB]"
              aria-label={label}
            >
              {id === 'whatsapp' ? (
                <svg
                  viewBox="0 0 16 16"
                  className="h-6 w-6 text-[#000000]"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 8.043.003a7.935 7.935 0 0 0-6.087 2.79A7.908 7.908 0 0 0 .02 8.269a7.8 7.8 0 0 0 1.018 3.9L0 16l3.91-1.013a7.95 7.95 0 0 0 4.114 1.159h.003c4.392 0 7.964-3.548 7.964-7.91a7.95 7.95 0 0 0-2.39-5.912Zm-5.53 12.4a6.56 6.56 0 0 1-3.344-.915l-.24-.144-2.32.6.619-2.25-.155-.231a6.48 6.48 0 0 1-1.028-3.486c.003-3.57 2.934-6.476 6.53-6.476a6.55 6.55 0 0 1 4.641 1.906 6.46 6.46 0 0 1 1.92 4.604c-.003 3.569-2.935 6.391-6.623 6.391Zm3.616-4.933c-.197-.098-1.17-.578-1.352-.643-.181-.066-.314-.098-.445.098-.131.197-.51.643-.625.775-.114.131-.23.147-.427.049-.197-.098-.832-.305-1.585-.97-.586-.52-.98-1.164-1.094-1.36-.115-.197-.012-.304.086-.402.087-.086.197-.23.295-.344.098-.115.131-.197.197-.328.065-.131.033-.246-.016-.344-.05-.098-.445-1.07-.61-1.464-.16-.387-.323-.334-.445-.34-.114-.006-.245-.007-.377-.007a.725.725 0 0 0-.525.246c-.18.197-.689.676-.689 1.647 0 .97.706 1.909.804 2.04.098.131 1.387 2.105 3.36 2.95.47.202.838.323 1.124.413.472.15.902.129 1.242.078.379-.056 1.17-.479 1.335-.941.164-.463.164-.857.115-.94-.05-.082-.181-.131-.378-.23Z" />
                </svg>
              ) : (
                imagePath && (
                  <div className="flex items-center justify-center">
                    <Image
                      src={imagePath}
                      alt={label}
                      width={22}
                      height={22}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
