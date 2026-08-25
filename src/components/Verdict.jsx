import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Share2 } from 'lucide-react';
import CertificateModal from './CertificateModal';
import styles from './Verdict.module.css';

function fireConfetti() {
  const colors = ['#c9a227', '#e8c84a', '#ffffff', '#f0e6c0', '#a07818'];

  // Main burst
  confetti({
    particleCount: 130,
    spread: 85,
    origin: { y: 0.5, x: 0.5 },
    colors,
    startVelocity: 42,
    scalar: 1.1,
    zIndex: 9999,
  });

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 70,
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
      particleCount: 60,
      spread: 100,
      origin: { y: 0.4 },
      colors,
      scalar: 0.85,
      zIndex: 9999,
    });
  }, 700);
}

export default function Verdict() {
  const firedRef = useRef(false);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    if (!firedRef.current) {
      firedRef.current = true;
      setTimeout(fireConfetti, 600);
    }
  }, []);

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      '⚖️ ব্রেকিং নিউজ: হাই কোর্টের চূড়ান্ত রায়ে সালমান প্রিন্স (Salman Prince) "অতিরিক্ত অসাধারণ হওয়ার" অপরাধে দোষী সাব্যস্ত হয়েছে! 👑🎂\n\nআদালতের সম্পূর্ণ কেস ফাইল ও রায় দেখতে ক্লিক করুন:'
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

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
    <>
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
              So ordered by the High Court — {new Date().getFullYear()}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className={styles.actionButtons}
              variants={itemVariants}
            >
              <button
                className={`btn-gold ${styles.certBtn}`}
                onClick={() => setShowCertificate(true)}
              >
                <Award size={18} />
                <span>[ কোর্ট সার্টিফিকেট ডাউনলোড করো 📜 ]</span>
              </button>

              <button
                className={`btn-ghost ${styles.shareBtn}`}
                onClick={handleWhatsAppShare}
              >
                <Share2 size={16} />
                <span>[ WhatsApp-এ রায় শেয়ার করো ]</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
    </>
  );
}
