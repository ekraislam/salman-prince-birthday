import { motion } from 'framer-motion';
import { Gavel } from 'lucide-react';
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
          মাননীয় আদালতের রায় ও ডিক্রি
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          রায়নামা ও আইনি আদেশ
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
              <p className={styles.courtTitle}>হাই কোর্ট অফ ব্রাদারহুড অ্যান্ড লাভ</p>
              <p className={styles.courtSub}>স্পেশাল বার্থডে জুরিসডিকশন • কেস নং: BDAY-2005-2026-SP</p>
            </div>
          </div>

          <div className={styles.docDivider} />

          <p className={styles.caseRef}>
            মামলার বিবরণ: <span className={styles.caseRefGold}>জনগণ বনাম সালমান প্রিন্স (আগস্ট ২০০৫ — ২০২৬)</span>
            <br />
            বিষয়: <span className={styles.caseRefGold}>২১তম বর্ষপূর্তি ও আজীবন লেজেন্ড ঘোষণা</span>
          </p>

          <div className={styles.docDivider} />

          {/* Judgment body */}
          <div className={styles.judgmentBody}>
            <p className={styles.judgmentPara}>
              এই আদালত উপস্থাপিত যাবতীয় সাক্ষ্যপ্রমাণ, প্রত্যক্ষদর্শীদের এজাহার এবং আসামীর বিগত ২১ বছরের চরিত্র পর্যালোচনা করে সন্তুষ্টি প্রকাশপূর্বক
            </p>

            <p className={`${styles.judgmentPara} ${styles.judgmentCenter}`}>
              <strong>নিম্নবর্ণিত আদেশ ও ডিক্রি জারি করছে:</strong>
            </p>

            {/* Clauses */}
            {[
              {
                num: '১.',
                text: 'আসামী সালমান প্রিন্স আগস্ট ২০০৫-এ জন্মগ্রহণের পর থেকে অদ্যবধি একজন অতুলনীয় ব্যক্তিত্ব, অমায়িক বন্ধু ও স্নেহভাজন ছোট ভাই হিসেবে ঐতিহাসিকভাবে প্রমাণিত।',
              },
              {
                num: '২.',
                text: 'আসামীর ভেতর বিরাজমান অপরিসীম বুদ্ধিমত্তা, সহমর্মিতা ও হাস্যরস আদালতের রেকর্ডে সরকারিভাবে নথিভুক্ত করা হলো।',
              },
              {
                num: '৩.',
                text: 'আইনের ছাত্র হিসেবে আসামীর ভবিষ্যৎ অত্যন্ত উজ্জ্বল ও গৌরবময় হবে — এই আদালত পূর্ণ আস্থা ও বিশ্বাসের সাথে তা প্রত্যয়ন করছে।',
              },
              {
                num: '৪.',
                text: 'সালমান প্রিন্সকে আজকের এই ২১তম জন্মদিনে আনুষ্ঠানিকভাবে "সার্টিফাইড লেজেন্ড" খেতাবে ভূষিত করা হলো — যা চিরকাল বলবৎ থাকবে।',
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
              <p className={styles.stylishSig}>Ekra Islam Ohi</p>
              <div className={styles.signatureLine} />
              <p className={styles.judgeTitle}>EKRA ISLAM OHI • CHIEF JUSTICE</p>
              <p className={styles.judgeNote}>বড় ভাই ও প্রধান বিচারপতি • স্পেশাল বার্থডে বেঞ্চ</p>
            </div>
            <div className={styles.officialSeal}>
              <div className={styles.sealCircle}>
                <p className={styles.sealText}>COURT</p>
                <p className={styles.sealTextSub}>SEAL ⚖️</p>
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
            অনুমোদিত • APPROVED
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
