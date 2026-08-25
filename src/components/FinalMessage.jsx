import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';
import styles from './FinalMessage.module.css';

export default function FinalMessage() {
  const [crownClicks, setCrownClicks] = useState(0);
  const [princeModeActive, setPrinceModeActive] = useState(false);

  const handleCrownClick = () => {
    const next = crownClicks + 1;
    setCrownClicks(next);
    if (next >= 3) {
      setPrinceModeActive(true);
      setTimeout(() => {
        setPrinceModeActive(false);
        setCrownClicks(0);
      }, 5000);
    }
  };

  return (
    <section className={`section ${styles.finalSection}`}>
      <div className="container">

        {/* Crown Easter egg */}
        <motion.div
          className={styles.crownWrapper}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
        >
          <button
            className={styles.crownBtn}
            onClick={handleCrownClick}
            aria-label="মুকুটে ক্লিক করো"
            title="ক্লিক করো..."
          >
            <Crown size={48} strokeWidth={1.2} className={styles.crownIcon} />
          </button>
          {crownClicks > 0 && crownClicks < 3 && (
            <p className={styles.crownHint}>
              আরও {3 - crownClicks} বার ক্লিক করো...
            </p>
          )}
        </motion.div>

        {/* Prince Mode Easter Egg — Bengali */}
        <AnimatePresence>
          {princeModeActive && (
            <motion.div
              className={styles.princeModeCard}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.4 }}
              role="alert"
              aria-live="assertive"
            >
              <p className={styles.pmTitle}>SECRET UNLOCKED</p>
              <p className={styles.pmText}>প্রিন্স মোড চালু হয়েছে 👑</p>
              <p className={styles.pmSub}>তুমি এটা আগে থেকেই জানতে।</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <motion.div
          className={styles.titleWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className={styles.sectionLabel}>শেষ কথা</p>
          <div className="divider-full" style={{ maxWidth: '320px', margin: '0 auto 0' }} />
        </motion.div>

        {/* Final glass card — Pure heartfelt Bengali */}
        <motion.div
          className={`glass-card ${styles.finalCard} ${princeModeActive ? styles.finalCardGold : ''}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className={styles.salutation}>সালমান,</p>
          <div className={styles.divider} />

          <p className={styles.para}>
            তুমি যতই বড় হও না কেন,<br />
            আমার কাছে তুমি সবসময় ছোট ভাইয়ই থাকবে।
          </p>

          <p className={styles.para}>
            স্বপ্নকে তাড়া করতে থাকো,<br />
            শিখতে থাকো,<br />
            হাসতে থাকো,<br />
            আর নিজের সেরা সংস্করণ হতে<br />
            কখনো থেমো না।
          </p>

          <p className={styles.para}>
            জীবনে অনেক চ্যালেঞ্জ আসবে —<br />
            কিন্তু আমি জানি তুমি পারবে।<br />
            কারণ তুমি <span className={styles.goldWord}>সালমান প্রিন্স</span>।
          </p>

          <div className={styles.divider} />

          <p className={styles.signatureLine}>
            শুভ জন্মদিন, প্রিন্স।{' '}
            <span role="img" aria-label="মুকুট">👑</span>
            <span role="img" aria-label="হৃদয়">❤️</span>
          </p>
        </motion.div>

        {/* Case closed footer */}
        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="divider-full" />
          <p className={styles.footerText}>CASE CLOSED.</p>
          <p className={styles.footerSub}>আগামী বছর পর্যন্ত।</p>
          <p className={styles.footerYear}>BDAY-{new Date().getFullYear()}-SP</p>
        </motion.div>
      </div>
    </section>
  );
}
