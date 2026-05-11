import OurCompanySection from '../../../components/website/OurCompanySection';
import ContactSection from '../../../components/website/ContactSection';
import Header from '../../../components/website/ContactHero';
import styles from '../../../components/website/ContactLayout.module.css';

export const metadata = {
  title: 'Contact Us - Magnify',
  description: 'Get in touch with us for your photo restoration and custom album needs.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <div className={styles.contactWrapper}>
        <div className={styles.contactContainer}>
          <div className={styles.leftColumn}>
            <OurCompanySection />
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}