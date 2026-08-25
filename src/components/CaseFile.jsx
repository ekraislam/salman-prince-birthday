import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CaseFile.module.css';

const evidenceItems = [
  {
    id: '01',
    title: 'Exhibit A — ব্যক্তিত্ব মূল্যায়ন',
    text: 'যেখানেই যায়, মানুষের মুখে হাসি ফোটায়। কোনো পার্শ্বপ্রতিক্রিয়া জানা যায়নি।',
  },
  {
    id: '02',
    title: 'Exhibit B — বার্ষিক রেকর্ড',
    text: 'সফলভাবে আরও একটি বছর পার করেছে। কোর্টের রেকর্ড অনুযায়ী — অত্যন্ত চমৎকার পারফরম্যান্স।',
  },
  {
    id: '03',
    title: 'Exhibit C — স্ব-প্রতিবেদন',
    text: 'নিজে নিজেই অসাধারণ হওয়ার অদ্ভুত ক্ষমতা রাখে। কোনো পূর্ববর্তী অপরাধ নেই।',
  },
  {
    id: '04',
    title: 'Exhibit D — প্রত্যক্ষদর্শী বিবৃতি',
    text: 'সম্ভবত এই পৃথিবীর জন্য একটু বেশিই awesome। তদন্ত এখনও চলছে।',
  },
];

function TypedText({ text, delay = 0, speed = 40 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <span>{displayed}{started && displayed.length < text.length ? <span className={styles.cursor}>|</span> : null}</span>;
}

export default function CaseFile() {
  const caseNumberRef = useRef(null);
  const [caseClicked, setCaseClicked] = useState(false);

  const handleCaseNumberClick = () => {
    setCaseClicked(true);
    setTimeout(() => setCaseClicked(false), 4000);
  };

  return (
    <section className={`section ${styles.caseSection}`} id="case">
      <div className="container">
        {/* Section label */}
        <motion.p
          className="label"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          CLASSIFIED DOCUMENT
        </motion.p>

        {/* Case File Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={styles.title}>CASE FILE</h1>
          <div className="divider-full" />
        </motion.div>

        {/* Case Details */}
        <motion.div
          className={`glass-card ${styles.caseDetails}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>CASE NUMBER</span>
            <span
              className={`${styles.detailValue} ${styles.caseNum}`}
              ref={caseNumberRef}
              onClick={handleCaseNumberClick}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleCaseNumberClick()}
              aria-label="Click to find a secret"
            >
              BDAY-2026-SP
            </span>
          </div>
          <div className={styles.separator} />
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>DEFENDANT</span>
            <span className={`${styles.detailValue} ${styles.defendant}`}>SALMAN PRINCE</span>
          </div>
          <div className={styles.separator} />
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>CHARGE</span>
            <span className={styles.detailValue}>Being Extremely Awesome</span>
          </div>
          <div className={styles.separator} />
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>STATUS</span>
            <span className={styles.status}>
              <span className={styles.statusDot} />
              UNDER INVESTIGATION
            </span>
          </div>
        </motion.div>

        {/* Easter egg — case number */}
        <motion.div
          className={styles.easterEgg}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={caseClicked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
        >
          <p className={styles.easterTitle}>ACCESS GRANTED.</p>
          <p className={styles.easterText}>You found a secret.</p>
        </motion.div>

        {/* Evidence heading */}
        <motion.div
          className={styles.evidenceHeading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="divider-full" />
          <p className={styles.evidenceTitle}>EVIDENCE FOUND</p>
          <div className="divider-full" />
        </motion.div>

        {/* Evidence Cards */}
        <div className={styles.evidenceGrid}>
          {evidenceItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`glass-card ${styles.evidenceCard}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.evidenceNum}>
                <span>Evidence #{item.id}</span>
              </div>
              <h3 className={styles.evidenceCardTitle}>{item.title}</h3>
              <p className={styles.evidenceCardText}>{item.text}</p>
              <div className={styles.evidenceStamp}>FILED</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
