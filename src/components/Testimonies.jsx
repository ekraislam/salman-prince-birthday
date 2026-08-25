import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import styles from './Testimonies.module.css';

const TESTIMONIES = [
  {
    id: 'W-001',
    witness: 'The People',
    title: 'Prosecution Witness',
    statement:
      'আসামী সালমান প্রিন্স বারবার এবং নিরন্তরভাবে অসাধারণ মাত্রার সহমর্মিতা, হাস্যরস ও ব্যক্তিগত সততার পরিচয় দিয়েছেন। আদালত তাঁর অসামান্য চরিত্রের এই প্রমাণ সাক্ষ্য হিসেবে গ্রহণ করছে।',
  },
  {
    id: 'W-002',
    witness: 'সাধারণ জনগণ',
    title: 'Community Witness',
    statement:
      'আসামী যেখানেই উপস্থিত হন, সেখানকার পরিবেশ সঙ্গে সঙ্গে উন্নত হয়ে যায়। প্রত্যক্ষদর্শীরা জানান — হঠাৎ করেই সবার মুখে হাসি ফোটে, মন ভালো হয়ে যায়, এবং একটা অদ্ভুত অনুভূতি জন্মায় যে সবকিছু ঠিকঠাক হয়ে যাবে।',
  },
  {
    id: 'W-003',
    witness: 'আদালতের নথি',
    title: 'Official Observation',
    statement:
      'গত এক বছর ধরে আসামীর আচরণ পুঙ্খানুপুঙ্খভাবে পর্যালোচনা করে আদালত কোনো সাধারণত্বের চিহ্ন খুঁজে পায়নি। "অত্যধিক অসাধারণ হওয়ার" অভিযোগটি অপ্রতিরোধ্য সাক্ষ্যপ্রমাণ দ্বারা সমর্থিত।',
  },
];

function AnimatedLine({ char, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return show ? char : null;
}

function TypedText({ text, startDelay = 0 }) {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) return;
    const t = setTimeout(() => setCount(c => c + 1), 22);
    return () => clearTimeout(t);
  }, [started, count, text]);

  return (
    <span>
      {text.slice(0, count)}
      {count < text.length && started && <span className={styles.cursor}>|</span>}
    </span>
  );
}

export default function Testimonies() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.section}`} id="evidence" ref={ref}>
      <div className="container">
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          SWORN AFFIDAVITS
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Witness Testimonies
        </motion.h2>

        {/* Docket reference */}
        <motion.div
          className={styles.docket}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className={styles.docketRef}>DOCKET REF: BDAY-2026-SP/WIT</span>
          <span className={styles.docketDate}>Date Filed: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </motion.div>

        <div className={styles.testimoniesGrid}>
          {TESTIMONIES.map((item, i) => (
            <motion.div
              key={item.id}
              className={`glass-card ${styles.affidavitCard}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              {/* Affidavit header */}
              <div className={styles.affidavitHeader}>
                <div>
                  <p className={styles.witnessId}>WITNESS {item.id}</p>
                  <p className={styles.witnessName}>{item.witness}</p>
                  <p className={styles.witnessTitle}>{item.title}</p>
                </div>
                <Quote className={styles.quoteIcon} size={28} strokeWidth={1} />
              </div>

              <div className={styles.ruleLine} />

              {/* Statement */}
              <p className={styles.statementLabel}>SWORN STATEMENT</p>
              <blockquote className={styles.statement}>
                {inView ? (
                  <TypedText text={item.statement} startDelay={i * 600 + 200} />
                ) : null}
              </blockquote>

              {/* Signature area */}
              <div className={styles.signature}>
                <div className={styles.sigLine} />
                <p className={styles.sigText}>Signed before the Court — {new Date().getFullYear()}</p>
              </div>

              {/* Official stamp */}
              <div className={styles.officialStamp}>SWORN</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
