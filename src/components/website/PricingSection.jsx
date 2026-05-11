'use client';

import styles from './PricingSection.module.css';

const occasionItems = [
  { id: 1, emoji: '💍', label: 'Weddings' },
  { id: 2, emoji: '🎓', label: 'Graduations' },
  { id: 3, emoji: '🎂', label: 'Birthdays' },
  { id: 4, emoji: '👨‍👩', label: 'Families' },
  { id: 5, emoji: '❤️', label: 'Couples' },
  { id: 6, emoji: '🏢', label: 'Corporate' },
];

function PriceCard({ variant = 'default', label, title, price, description }) {
  return (
    <div className={`${styles.priceCard} ${styles[variant]}`}>
      {variant === 'popular' && <div className={styles.ribbon}>POPULAR</div>}
      
      <div className={styles.cardLabel}>{label}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      
      <div className={styles.priceSection}>
        <span className={styles.pricePrefix}>from</span>
        <span className={styles.priceAmount}>{price}</span>
      </div>
      
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

function OccasionCard({ emoji, label }) {
  return (
    <div className={styles.occasionCard}>
      <div 
        className={styles.occasionEmoji}
        style={{
          fontFamily: "'Liberation Sans'",
          fontSize: '30px',
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22.5px',
          height: '36px',
        }}
      >
        {emoji}
      </div>
      <p className={styles.occasionLabel}>{label}</p>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className={styles.container}>
      {/* Left Column - Pricing */}
      <div className={styles.pricingColumn}>
        <header className={styles.columnHeader}>
          <h2 className={styles.columnTitle}>Simple, honest pricing.</h2>
          <p className={styles.columnSubtext}>
            No hidden costs. Cash on delivery available across the island.
          </p>
        </header>

        <div className={styles.priceCardsGrid}>
          <PriceCard
            variant="default"
            label="MAGNETS ONLY"
            title="Photo Magnets"
            price="Rs. 1,500"
            description="Minimum 4 pieces • square magnetic tiles"
          />
          <PriceCard
            variant="popular"
            label="MAGNETS + FRAME"
            title="Magnet Frame Set"
            price="Rs. 2,500"
            description="Black or white frame • holds 4 tiles"
          />
        </div>
      </div>

      {/* Right Column - Occasions */}
      <div className={styles.occasionsColumn}>
        <header className={styles.columnHeader}>
          <h2 className={styles.columnTitle}>Perfect for every occasion.</h2>
          <p className={styles.columnSubtext}>
            Turn life's best moments into a daily reminder.
          </p>
        </header>

        <div className={styles.occasionsGrid}>
          {occasionItems.map((item) => (
            <OccasionCard key={item.id} emoji={item.emoji} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
