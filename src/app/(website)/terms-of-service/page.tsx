import PolicyContent, {
  type PolicySection,
} from "@/components/website/PolicyContent";

export const metadata = {
  title: "Terms of Service | Magnify Creations",
  description:
    "The terms and conditions that apply when you order from Magnify Creations.",
};

const sections: PolicySection[] = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By accessing or placing an order through the Magnify Creations website, you agree to these Terms of Service.",
    ],
  },
  {
    heading: "Custom Products",
    body: [
      "All products are custom-made using the photos provided by the customer. Please ensure all uploaded images are accurate and of suitable quality before placing an order.",
    ],
  },
  {
    heading: "Orders",
    body: [
      "Orders will be processed after successful confirmation and payment (where applicable). Once production has started, custom orders cannot be cancelled or modified.",
    ],
  },
  {
    heading: "Pricing",
    body: [
      "All prices are displayed in Sri Lankan Rupees (LKR) and may change without prior notice.",
    ],
  },
  {
    heading: "Payments",
    body: [
      "We accept approved payment methods available on our website. Orders will only be processed after payment confirmation where advance payment is required.",
    ],
  },
  {
    heading: "Delivery",
    body: [
      "Delivery times may vary depending on your location and courier services. Magnify Creations is not responsible for delays caused by third-party delivery providers.",
    ],
  },
  {
    heading: "Returns & Refunds",
    body: [
      "As all products are personalized, returns or refunds are generally not accepted unless you receive the wrong product, the product arrives damaged, or there is a manufacturing defect. Contact us within 48 hours of receiving your order.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "All website content, including logos, graphics, text, and designs, belongs to Magnify Creations and may not be copied or reproduced without permission.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "Magnify Creations shall not be liable for indirect, incidental, or consequential damages resulting from the use of our products or website.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: ["We reserve the right to update these Terms of Service at any time."],
  },
  {
    heading: "Contact Us",
    numbered: false,
    body: ["Email: magnifyofficials@gmail.com", "Phone: +94 75 391 2534"],
  },
];

export default function TermsOfServicePage() {
  return (
    <main>
      <PolicyContent
        eyebrow="Legal"
        title="Terms of Service"
        lastUpdated="July 2026"
        sections={sections}
      />
    </main>
  );
}
