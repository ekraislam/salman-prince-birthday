import { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Shield } from 'lucide-react';
import styles from './DefendantProfile.module.css';

const PHOTOS = [
  {
    src: '/salman1.jpg',
    caption: 'Exhibit Photo A',
    badge: 'PRIMARY',
  },
  {
    src: '/salman2.jpg',
    caption: 'Exhibit Photo B',
    badge: 'SUPPLEMENTARY',
  },
  {
    src: '/salman3.jpg',
    caption: 'Exhibit Photo C',
    badge: 'SUPPLEMENTARY',
  },
];

const PROFILE_FIELDS = [
  { label: 'FULL NAME', value: 'সালমান প্রিন্স' },
  { label: 'CASE NO.', value: 'BDAY-2026-SP' },
  { label: 'DESIGNATION', value: 'ভবিষ্যতের আইনজীবী' },
  { label: 'CHARGE', value: 'অতিরিক্ত অসাধারণ হওয়া' },
  { label: 'PLEA', value: 'দোষী (গর্বের সাথে)' },
  { label: 'STATUS', value: 'LEGEND', highlight: true },
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
          COURT IDENTIFICATION
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Defendant Profile
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
                <span>DEFENDANT — BDAY-2026-SP</span>
              </div>

              <motion.img
                key={activePhoto}
                src={PHOTOS[activePhoto].src}
                alt={`Salman Prince — ${PHOTOS[activePhoto].caption}`}
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
                  aria-label={`View ${p.caption}`}
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
                <p className={styles.profileCardTitle}>OFFICIAL COURT RECORD</p>
                <p className={styles.profileCardSub}>Verified by the Registrar</p>
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
                  <p className={styles.badgeTitle}>আইনের ছাত্র — ভবিষ্যতের উকিল</p>
                  <p className={styles.badgeText}>ন্যায়বিচারের পথে — চলমান</p>
                </div>
              </div>
            </div>

            {/* Barcode-like element */}
            <div className={styles.barcode}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.barcodeBar}
                  style={{ height: `${Math.random() * 20 + 12}px` }}
                />
              ))}
              <p className={styles.barcodeText}>SP-2026-BDAY-AWESOME</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
