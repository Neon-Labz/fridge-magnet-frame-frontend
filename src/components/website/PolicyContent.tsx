export type PolicySection = {
  heading: string;
  body: string[];
  numbered?: boolean;
};

type PolicyContentProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
};

export default function PolicyContent({
  eyebrow,
  title,
  lastUpdated,
  sections,
}: PolicyContentProps) {
  let counter = 0;
  const numberedSections = sections.map((section) => ({
    ...section,
    number: section.numbered === false ? null : ++counter,
  }));

  return (
    <section className="w-full bg-white pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="mx-auto w-full max-w-[860px] px-4 md:px-6">
        <div className="mb-10 text-center md:mb-14">
          <div className="flex items-center justify-center gap-2">
            <span className="h-[2px] w-6 bg-[#BC0000]" aria-hidden="true" />
            <span className="font-inter text-[13px] font-bold uppercase tracking-[0.15em] text-[#BC0000]">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-4 font-manrope text-[32px] font-bold leading-[1.1] text-[#002B73] md:text-[42px]">
            {title}
          </h1>

          <p className="mt-3 font-inter text-[14px] text-[#747784]">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {numberedSections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-manrope text-[20px] font-bold leading-[1.3] text-[#002B73] md:text-[22px]">
                {section.number !== null ? `${section.number}. ` : ""}
                {section.heading}
              </h2>

              <div className="mt-2 flex flex-col gap-2">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-inter text-[15px] leading-[1.7] text-[#434652] md:text-[16px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
