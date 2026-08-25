import { motion } from 'framer-motion';
import { Gavel, Stamp } from 'lucide-react';
import styles from './CourtJudgment.module.css';

export default function CourtJudgment() {
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
          OFFICIAL COURT DOCUMENT
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Judgment
        </motion.h2>

        <motion.div
          className={styles.documentCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Document header */}
          <div className={styles.docHeader}>
            <div className={styles.courtSeal}>
              <Gavel size={28} strokeWidth={1.2} />
            </div>
            <div className={styles.courtInfo}>
              <p className={styles.courtTitle}>HIGH COURT OF AWESOME</p>
              <p className={styles.courtSub}>Birthday Division — Special Session 2026</p>
            </div>
          </div>

          <div className={styles.docDivider} />

          <p className={styles.caseRef}>
            IN THE MATTER OF: <span className={styles.caseRefGold}>THE PEOPLE VS. SALMAN PRINCE</span>
            <br />
            CASE NO: <span className={styles.caseRefGold}>BDAY-2026-SP</span>
          </p>

          <div className={styles.docDivider} />

          {/* Judgment body */}
          <div className={styles.judgmentBody}>
            <p className={styles.judgmentPara}>
              This Court, having duly considered all evidence, testimonies, and
              relevant case materials, and having deliberated at length on the
              exceptional conduct of the defendant,
            </p>

            <p className={`${styles.judgmentPara} ${styles.judgmentCenter}`}>
              <strong>HEREBY ORDERS AND ADJUDGES:</strong>
            </p>

            {/* Clauses */}
            {[
              {
                num: 'I.',
                text: 'That SALMAN PRINCE is a person of exceptional character, whose kindness, humor, and integrity are hereby recognized by this Court as matters of public record.',
              },
              {
                num: 'II.',
                text: 'That the defendant\'s Awesomeness, having been measured and found to exceed all known legal limits, shall be formally acknowledged and celebrated on this occasion.',
              },
              {
                num: 'III.',
                text: 'That this Court declares, with full legal authority, that another year of life for the defendant is cause for the highest possible celebration.',
              },
              {
                num: 'IV.',
                text: 'That SALMAN PRINCE shall, from this day forward, be officially recognized as a LEGEND — a title bestowed by unanimous verdict of this Court.',
              },
            ].map((clause, i) => (
              <motion.div
                key={clause.num}
                className={styles.clause}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              >
                <span className={styles.clauseNum}>{clause.num}</span>
                <p className={styles.clauseText}>{clause.text}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.docDivider} />

          {/* Judgment footer */}
          <div className={styles.judgmentFooter}>
            <div className={styles.judgeSignature}>
              <div className={styles.signatureLine} />
              <p className={styles.judgeTitle}>THE HONOURABLE JUDGE</p>
              <p className={styles.judgeNote}>Birthday Division — 2026</p>
            </div>
            <div className={styles.officialSeal}>
              <div className={styles.sealCircle}>
                <p className={styles.sealText}>COURT</p>
                <p className={styles.sealTextSub}>SEAL</p>
              </div>
            </div>
          </div>

          {/* Official stamp overlay */}
          <motion.div
            className={styles.approvedStamp}
            initial={{ opacity: 0, scale: 1.4, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
          >
            APPROVED
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
