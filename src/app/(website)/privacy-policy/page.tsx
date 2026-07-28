import PolicyContent, {
  type PolicySection,
} from "@/components/website/PolicyContent";

export const metadata = {
  title: "Privacy Policy | Magnify Creations",
  description:
    "How Magnify Creations collects, uses, and protects your personal information.",
};

const sections: PolicySection[] = [
  {
    heading: "Information We Collect",
    body: [
      "When you use our website or place an order, we may collect: Full Name, Email Address, Phone Number, Delivery Address, Uploaded Photos, Order Details, and messages submitted through our contact form.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use your information to process and fulfill orders, create your custom fridge magnets and frames, contact you regarding your order, provide customer support, and improve our products and services. We do not sell or rent your personal information to third parties.",
    ],
  },
  {
    heading: "Your Photos",
    body: [
      "The photos you upload are used solely for creating your custom fridge magnets and frames. Your photos are treated as private and confidential. We do not sell, share, publish, or use your photos for any purpose other than fulfilling your order.",
    ],
  },
  {
    heading: "Payment Security",
    body: [
      "We use secure payment methods to protect your transactions. Magnify Creations does not store your complete debit or credit card information.",
    ],
  },
  {
    heading: "Data Protection",
    body: [
      "We take appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of online transmission or storage is completely secure.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website may use cookies to improve your browsing experience, remember your preferences, and analyze website performance. You may disable cookies through your browser settings.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "We may use trusted third-party services for secure payment processing, website analytics, email communication, and courier & delivery services. These providers receive only the information necessary to perform their services.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information where applicable by contacting us.",
    ],
  },
  {
    heading: "Changes to This Privacy Policy",
    body: [
      "Magnify Creations may update this Privacy Policy from time to time. Any changes will be published on this page with the updated revision date.",
    ],
  },
  {
    heading: "Contact Us",
    body: ["Email: magnifyofficials@gmail.com", "Phone: +94 75 391 2534"],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PolicyContent
        eyebrow="Legal"
        title="Privacy Policy"
        lastUpdated="July 2026"
        sections={sections}
      />
    </main>
  );
}
