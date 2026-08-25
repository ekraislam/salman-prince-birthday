import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Gavel } from 'lucide-react';
import styles from './Courtroom.module.css';

export default function Courtroom({ onVerdictAccepted, playGavelStrike, playTripleGavel }) {
  const [objectionShown, setObjectionShown] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleNotGuilty = () => {
    if (playGavelStrike) playGavelStrike(0, false);
    setObjectionShown(true);
    setTimeout(() => setObjectionShown(false), 3500);
  };

  const handleAccept = () => {
    if (playTripleGavel) playTripleGavel();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1200);
    onVerdictAccepted();
  };

  return (
    <section className={`section ${styles.courtroomSection} ${isShaking ? styles.screenShake : ''}`} id="court">
      <div className="container">
        {/* Atmospheric top line */}
        <motion.div
          className={styles.sessionBanner}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className={styles.sessionLine} />
          <motion.p
            className={styles.sessionText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            আদালতের কার্যক্রম শুরু হলো ⚖️
          </motion.p>
          <div className={styles.sessionLine} />
        </motion.div>

        {/* VS block */}
        <motion.div
          className={styles.vsBlock}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className={styles.thePeople}>গণপ্রজাতন্ত্রী আদালত বনাম</p>
          <p className={styles.defendant}>সালমান প্রিন্স</p>
        </motion.div>

        {/* Scale of Justice */}
        <motion.div
          className={styles.scaleWrapper}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 }}
        >
          <div className={styles.scaleIcon}>
            <Scale size={64} strokeWidth={1} />
          </div>
          <div className={styles.scaleGlow} aria-hidden="true" />
        </motion.div>

        {/* Charge */}
        <motion.div
          className={`glass-card ${styles.chargeCard}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className={styles.chargeLabel}>আনুষ্ঠানিক অভিযোগনামা</p>
          <p className={styles.chargeText}>অতিরিক্ত অসাধারণ ও প্রিয় ছোট ভাই হওয়া</p>
          <p className={styles.chargeNote}>
            সকল সাধারণ নিয়ম ও সীমাবদ্ধতা উপেক্ষা করে আসামী আগস্ট ২০০৫ থেকে দীর্ঘ ২১ বছর ধরে পৃথিবীতে অফুরন্ত হাসি, সততা ও অসাধারণত্ব ছড়িয়ে যাচ্ছেন।
          </p>
        </motion.div>

        {/* Verdict buttons */}
        <motion.div
          className={styles.buttonsWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <p className={styles.buttonsLabel}>আদালতের কাছে আসামীর কী রায় দেবেন?</p>

          <div className={styles.buttons}>
            <button
              className="btn-ghost"
              onClick={handleNotGuilty}
              aria-label="নির্দোষ আবেদন"
            >
              [ নির্দোষ / NOT GUILTY ]
            </button>
            <button
              className={`btn-gold ${styles.verdictActionBtn}`}
              onClick={handleAccept}
              aria-label="আদালতের রায় গ্রহণ করুন"
            >
              <Gavel size={18} />
              <span>[ আদালতের রায় গ্রহণ করুন ⚖️ ]</span>
            </button>
          </div>
        </motion.div>

        {/* Objection overruled */}
        <AnimatePresence>
          {objectionShown && (
            <motion.div
              className={styles.objection}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              role="alert"
              aria-live="assertive"
            >
              <p className={styles.objectionTitle}>আপত্তি খারিজ! 😌</p>
              <p className={styles.objectionText}>সাক্ষ্যপ্রমাণ এতটাই অপ্রতিরোধ্য যে আসামীকে নির্দোষ ভাবার কোনো সুযোগ নেই।</p>
              <p className={styles.objectionSub}>অনুগ্রহ করে চূড়ান্ত রায় উন্মোচন করুন।</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
