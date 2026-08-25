import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './IntroScreen.module.css';

export default function IntroScreen({ onEnter }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(onEnter, 800);
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
              CONFIDENTIAL
            </motion.div>

            {/* Case number */}
            <motion.p
              className={styles.caseLabel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              CONFIDENTIAL CASE FILE
            </motion.p>

            <motion.p
              className={styles.caseNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              CASE NO. BDAY-2026-SP
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
              <p className={styles.thePeople}>THE PEOPLE</p>
              <p className={styles.vs}>VS.</p>
              <p className={styles.defendant}>SALMAN PRINCE</p>
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
              A Very Serious Investigation
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
              aria-label="Open the birthday case file"
            >
              <span style={{ position: 'relative', zIndex: 1 }}>[ OPEN CASE FILE ]</span>
            </motion.button>

            {/* Classification bar */}
            <motion.div
              className={styles.classification}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.5 }}
            >
              <span className={styles.classLine} />
              <span className={styles.classText}>TOP SECRET — BIRTHDAY DIVISION</span>
              <span className={styles.classLine} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
