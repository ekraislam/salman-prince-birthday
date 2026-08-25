import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale } from 'lucide-react';
import styles from './Courtroom.module.css';

export default function Courtroom({ onVerdictAccepted }) {
  const [objectionShown, setObjectionShown] = useState(false);

  const handleNotGuilty = () => {
    setObjectionShown(true);
    setTimeout(() => setObjectionShown(false), 3500);
  };

  return (
    <section className={`section ${styles.courtroomSection}`} id="court">
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
            THE COURT IS NOW IN SESSION
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
          <p className={styles.thePeople}>THE PEOPLE</p>
          <p className={styles.vs}>VS.</p>
          <p className={styles.defendant}>SALMAN PRINCE</p>
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
          <p className={styles.chargeLabel}>FORMAL CHARGE</p>
          <p className={styles.chargeText}>Being Too Awesome</p>
          <p className={styles.chargeNote}>
            Contrary to all reasonable expectations, the defendant has consistently exceeded the established limits of human awesomeness.
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
          <p className={styles.buttonsLabel}>HOW DO YOU FIND THE DEFENDANT?</p>

          <div className={styles.buttons}>
            <button
              className="btn-ghost"
              onClick={handleNotGuilty}
              aria-label="Plead not guilty"
            >
              [ NOT GUILTY ]
            </button>
            <button
              className="btn-gold"
              onClick={onVerdictAccepted}
              aria-label="Accept the verdict"
            >
              [ ACCEPT THE VERDICT ]
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
              <p className={styles.objectionTitle}>Objection Overruled. 😌</p>
              <p className={styles.objectionText}>The evidence is overwhelming.</p>
              <p className={styles.objectionSub}>Please proceed to the verdict.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
