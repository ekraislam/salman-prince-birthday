import { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Shield, Award } from 'lucide-react';
import styles from './DefendantProfile.module.css';

const PHOTOS = [
  {
    src: '/salman1.jpg',
    caption: 'আলোকচিত্র ক — প্রাথমিক সাক্ষ্য',
    badge: 'PRIMARY',
  },
  {
    src: '/salman2.jpg',
    caption: 'আলোকচিত্র খ — সম্পূরক সাক্ষ্য',
    badge: 'EXHIBIT',
  },
  {
    src: '/salman3.jpg',
    caption: 'আলোকচিত্র গ — সম্পূরক সাক্ষ্য',
    badge: 'EXHIBIT',
  },
];

const PROFILE_FIELDS = [
  { label: 'পুরো নাম / FULL NAME', value: 'সালমান প্রিন্স (Salman Prince)' },
  { label: 'কেস নম্বর / CASE NO.', value: 'BDAY-2005-2026-SP' },
  { label: 'জন্মতারিখ ও বয়স', value: 'আগস্ট ২০০৫ (বয়স: ২১ বছর)' },
  { label: 'বর্তমান পদবী / STATUS', value: 'ভবিষ্যতের আইনজ্ঞ (আইনের ছাত্র)' },
  { label: 'প্রধান অপরাধ / CHARGE', value: 'অতিরিক্ত অসাধারণ হওয়া' },
  { label: 'আসামীর আবেদন / PLEA', value: 'দোষী (গর্ব ও হাসিমুখে)' },
  { label: 'আদালতের স্বীকৃতি', value: 'LEGENDARY PRINCE 👑', highlight: true },
];

export default function DefendantProfile() {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          আদালতি পরিচয়পত্র
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          আসামীর প্রোফাইল বিবরণী
        </motion.h2>

        <div className={styles.profileLayout}>
          {/* Left — Photo card */}
          <motion.div
            className={styles.photoSection}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main photo */}
            <div className={styles.photoFrame}>
              <div className={styles.photoCornerTL} />
              <div className={styles.photoCornerTR} />
              <div className={styles.photoCornerBL} />
              <div className={styles.photoCornerBR} />
              <div className={styles.photoGlow} aria-hidden="true" />

              <div className={styles.headerBar}>
                <Shield size={12} strokeWidth={1.5} />
                <span>আসামী — BDAY-2005-2026-SP</span>
              </div>

              <motion.img
                key={activePhoto}
                src={PHOTOS[activePhoto].src}
                alt={`সালমান প্রিন্স — ${PHOTOS[activePhoto].caption}`}
                className={styles.photo}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />

              <div className={styles.photoFooter}>
                <Fingerprint size={14} strokeWidth={1.5} className={styles.fingerprintIcon} />
                <span>{PHOTOS[activePhoto].caption}</span>
                <span className={styles.photoBadge}>{PHOTOS[activePhoto].badge}</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className={styles.thumbnails}>
              {PHOTOS.map((p, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${activePhoto === i ? styles.thumbActive : ''}`}
                  onClick={() => setActivePhoto(i)}
                  aria-label={`ছবি ${i + 1} দেখুন`}
                >
                  <img src={p.src} alt={p.caption} className={styles.thumbImg} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Profile details */}
          <motion.div
            className={styles.detailsSection}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={`glass-card ${styles.profileCard}`}>
              <div className={styles.profileCardHeader}>
                <p className={styles.profileCardTitle}>অফিসিয়াল কোর্ট রেকর্ড</p>
                <p className={styles.profileCardSub}>রেজিস্ট্রার কর্তৃক সত্যায়িত ও পরীক্ষিত</p>
              </div>
              <div className={styles.profileDivider} />

              {PROFILE_FIELDS.map((f, i) => (
                <motion.div
                  key={f.label}
                  className={styles.profileField}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  <span className={styles.fieldLabel}>{f.label}</span>
                  <span className={`${styles.fieldValue} ${f.highlight ? styles.fieldHighlight : ''}`}>
                    {f.value}
                  </span>
                </motion.div>
              ))}

              <div className={styles.profileDivider} />

              {/* Lawyer badge */}
              <div className={styles.lawyerBadge}>
                <div className={styles.badgeGold}>
                  <p className={styles.badgeTitle}>আইনের ছাত্র — ভবিষ্যতের ব্যারিস্টার/আইনজীবী</p>
                  <p className={styles.badgeText}>ন্যায়বিচারের পথে — ২১ বছরের গৌরবময় পদার্পণ</p>
                </div>
              </div>
            </div>

            {/* Barcode-like element */}
            <div className={styles.barcode}>
              <div className={styles.barcodeInner}>
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.barcodeBar}
                    style={{ height: `${(i % 5) * 6 + 14}px` }}
                  />
                ))}
              </div>
              <p className={styles.barcodeText}>SP-2005-2026-BDAY-AWESOME</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
