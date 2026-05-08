import ContactSection from '@/components/website/ContactSection';
import Header from '@/components/website/ContactHero';

export const metadata = {
  title: 'Contact Us - Magnify',
  description: 'Get in touch with us for your photo restoration and custom album needs.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <ContactSection />
    </main>
  );
}
