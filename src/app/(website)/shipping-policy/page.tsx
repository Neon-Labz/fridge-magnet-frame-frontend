import PolicyContent, {
  type PolicySection,
} from "@/components/website/PolicyContent";

export const metadata = {
  title: "Shipping Policy | Magnify Creations",
  description:
    "Order processing times, delivery areas, and shipping charges for Magnify Creations.",
};

const sections: PolicySection[] = [
  {
    heading: "Order Processing",
    body: [
      "Orders are typically processed within 1–3 business days after order confirmation. Custom orders may require additional production time.",
    ],
  },
  {
    heading: "Delivery Areas",
    body: ["We deliver islandwide across Sri Lanka."],
  },
  {
    heading: "Delivery Time",
    body: [
      "Estimated delivery: Jaffna: 1–2 business days. Other Areas: 2–5 business days. Delivery times may vary due to courier operations or public holidays.",
    ],
  },
  {
    heading: "Shipping Charges",
    body: [
      "Shipping charges are calculated during checkout based on your delivery location. Free shipping promotions may be available from time to time.",
    ],
  },
  {
    heading: "Order Tracking",
    body: [
      "Once your order has been dispatched, you may receive courier details or tracking information where available.",
    ],
  },
  {
    heading: "Incorrect Address",
    body: [
      "Please ensure your delivery address is accurate. Magnify Creations is not responsible for delays or failed deliveries caused by incorrect address information.",
    ],
  },
  {
    heading: "Damaged Packages",
    body: [
      "If your package arrives damaged, please contact us within 48 hours and include clear photos of the package and product.",
    ],
  },
  {
    heading: "Contact Us",
    numbered: false,
    body: ["Email: magnifyofficials@gmail.com", "Phone: +94 75 391 2534"],
  },
];

export default function ShippingPolicyPage() {
  return (
    <main>
      <PolicyContent
        eyebrow="Legal"
        title="Shipping Policy"
        lastUpdated="July 2026"
        sections={sections}
      />
    </main>
  );
}
