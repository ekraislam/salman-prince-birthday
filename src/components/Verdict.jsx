import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './Verdict.module.css';

function fireConfetti() {
  const colors = ['#c9a227', '#e8c84a', '#ffffff', '#f0e6c0', '#a07818'];

  // Main burst
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.5, x: 0.5 },
    colors,
    startVelocity: 40,
    scalar: 1.1,
    zIndex: 9999,
  });

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors,
      zIndex: 9999,
    });
  }, 300);

  // Final sprinkle
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.4 },
      colors,
      scalar: 0.8,
      zIndex: 9999,
    });
  }, 700);
}

export default function Verdict() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!firedRef.current) {
      firedRef.current = true;
      // Delay slightly to let the animation play first
      setTimeout(fireConfetti, 800);
    }
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const guiltyVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
    },
  };

  return (
    <section className={`section ${styles.verdictSection}`} id="verdict">
      <div className={styles.glowBg} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.verdictCard}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top rule */}
          <motion.div variants={itemVariants} className={styles.rule} />

          {/* Label */}
          <motion.p variants={itemVariants} className={styles.labelText}>
            FINAL VERDICT
          </motion.p>

          {/* Defendant */}
          <motion.p variants={itemVariants} className={styles.defendantName}>
            SALMAN PRINCE
          </motion.p>

          {/* Guilty */}
          <motion.div
            variants={guiltyVariants}
            className={styles.guiltyWrapper}
          >
            <div className={styles.guiltyGlow} aria-hidden="true" />
            <p className={styles.guilty}>GUILTY</p>
          </motion.div>

          {/* Of being awesome */}
          <motion.p variants={itemVariants} className={styles.ofText}>
            OF BEING
          </motion.p>
          <motion.p variants={itemVariants} className={styles.awesomeText}>
            AWESOME
          </motion.p>

          {/* Stamp */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 1.5, rotate: -15 }, visible: { opacity: 1, scale: 1, rotate: -12, transition: { delay: 1.2, duration: 0.5, ease: 'easeOut' } } }}
            className={styles.verdictStamp}
          >
            GUILTY
          </motion.div>

          {/* Bottom rule */}
          <motion.div variants={itemVariants} className={styles.rule} />

          {/* Signed */}
          <motion.p variants={itemVariants} className={styles.signed}>
            So ordered by the Court — {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
