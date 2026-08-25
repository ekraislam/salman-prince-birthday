import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './IntroScreen.module.css';

export default function IntroScreen({ onEnter, playGavelStrike }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (playGavelStrike) playGavelStrike(0, true);
    setClicked(true);
    setTimeout(onEnter, 700);
  };

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          className={styles.intro}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ambient glow */}
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.content}>
            {/* Stamp */}
            <motion.div
              className={styles.stamp}
              initial={{ opacity: 0, scale: 1.3, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            >
              গোপনীয় নথি
            </motion.div>

            {/* Case number */}
            <motion.p
              className={styles.caseLabel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              স্পেশাল বার্থডে কেস ফাইল
            </motion.p>

            <motion.p
              className={styles.caseNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              CASE NO. BDAY-2005-2026-SP
            </motion.p>

            <motion.div
              className={styles.divider}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Main title */}
            <motion.div
              className={styles.titleBlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
            >
              <p className={styles.thePeople}>গণপ্রজাতন্ত্রী আদালত বনাম</p>
              <p className={styles.defendant}>সালমান প্রিন্স</p>
            </motion.div>

            <motion.div
              className={styles.divider}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 0.8, ease: 'easeInOut' }}
            />

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              একটি অত্যন্ত গম্ভীর ও গোপনীয় তদন্ত
            </motion.p>

            {/* CTA Button */}
            <motion.button
              className={`btn-gold ${styles.ctaBtn}`}
              onClick={handleClick}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="কেস ফাইল খুলুন"
            >
              <span style={{ position: 'relative', zIndex: 1 }}>[ কেস ফাইল খুলুন 📂 ]</span>
            </motion.button>

            {/* Classification bar */}
            <motion.div
              className={styles.classification}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.5 }}
            >
              <span className={styles.classLine} />
              <span className={styles.classText}>টপ সিক্রেট — স্পেশাল বার্থডে ডিভিশন</span>
              <span className={styles.classLine} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
