import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Heart, Sparkles, Calendar } from 'lucide-react';
import styles from './CaseFile.module.css';

const evidenceItems = [
  {
    id: '০১',
    title: 'প্রমাণপত্র ১ — ব্যক্তিত্বের মূল্যায়ন',
    text: 'যেখানেই উপস্থিত হয়, চারপাশের মানুষের মুখে হাসি ফোটে। কোনো পার্শ্বপ্রতিক্রিয়া জানা যায়নি।',
  },
  {
    id: '০২',
    title: 'প্রমাণপত্র ২ — ২১ বছরের গৌরবময় রেকর্ড',
    text: 'আগস্ট ২০০৫ থেকে আজ পর্যন্ত সফলভাবে ২১টি বছর পার করেছে। আদালতের নথিতে পারফরম্যান্স — অসাধারণ।',
  },
  {
    id: '০৩',
    title: 'প্রমাণপত্র ৩ — ভবিষ্যৎ আইনজ্ঞের চরিত্র',
    text: 'আইনের ছাত্র হিসেবে ন্যায়পরায়ণতা, মেধা ও নিজে নিজেই অসাধারণ হওয়ার অদ্ভুত গুণাবলির অধিকারী।',
  },
  {
    id: '০৪',
    title: 'প্রমাণপত্র ৪ — প্রত্যক্ষদর্শী সাক্ষীদের এজাহার',
    text: 'প্রত্যক্ষদর্শীদের দাবি: এই পৃথিবীর স্বাভাবিক নিয়মের চেয়েও সে বহুগুণ বেশি ভালো ও পরোপকারী।',
  },
];

const METRICS = [
  {
    icon: Calendar,
    value: 'আগস্ট ২০০৫',
    label: 'জন্মতারিখ (২১তম বর্ষপূর্তি)',
    tag: 'MILESTONE',
  },
  {
    icon: Clock,
    value: '৭,৬৭০+ দিন',
    label: 'পৃথিবীতে সফল বিচরণের মেয়াদ',
    tag: 'ACTIVE',
  },
  {
    icon: ShieldCheck,
    value: '১০০%',
    label: 'সততা ও নৈতিকতার স্কোর',
    tag: 'VERIFIED',
  },
  {
    icon: Sparkles,
    value: 'অসীম (∞)',
    label: 'Awesome ও রাজকীয় ভাইব',
    tag: 'MAXIMUM',
  },
];

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
          গোপনীয় আইনি নথি
        </motion.p>

        {/* Case File Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={styles.title}>অফিসিয়াল কেস ফাইল</h1>
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
            <span className={styles.detailLabel}>কেস নম্বর</span>
            <span
              className={`${styles.detailValue} ${styles.caseNum}`}
              ref={caseNumberRef}
              onClick={handleCaseNumberClick}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleCaseNumberClick()}
              aria-label="গোপন তথ্য দেখতে ক্লিক করো"
            >
              BDAY-2005-2026-SP
            </span>
          </div>

          <div className={styles.separator} />

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>আসামী / DEFENDANT</span>
            <span className={`${styles.detailValue} ${styles.defendant}`}>সালমান প্রিন্স</span>
          </div>

          <div className={styles.separator} />

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>জন্মতারিখ ও বয়স</span>
            <span className={styles.detailValue}>আগস্ট ২০০৫ • ২১ বছর পূর্ণ 🎂</span>
          </div>

          <div className={styles.separator} />

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>প্রধান অভিযোগ</span>
            <span className={styles.detailValue}>অতিরিক্ত অসাধারণ ও প্রিয় ছোট ভাই হওয়া</span>
          </div>

          <div className={styles.separator} />

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>আইনি অবস্থা</span>
            <span className={styles.status}>
              <span className={styles.statusDot} />
              তদন্ত সম্পন্ন • দোষী সাব্যস্ত
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
          <p className={styles.easterTitle}>ACCESS GRANTED 👑</p>
          <p className={styles.easterText}>সালমান প্রিন্স — ২১ বছরের অপ্রতিরোধ্য যাত্রা!</p>
        </motion.div>

        {/* Life Stats / Investigation Metrics Grid */}
        <div className={styles.metricsGrid}>
          {METRICS.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                className={`glass-card ${styles.metricCard}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{ y: -3 }}
              >
                <div className={styles.metricHeader}>
                  <Icon size={18} className={styles.metricIcon} />
                  <span className={styles.metricTag}>{m.tag}</span>
                </div>
                <p className={styles.metricValue}>{m.value}</p>
                <p className={styles.metricLabel}>{m.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Evidence heading */}
        <motion.div
          className={styles.evidenceHeading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="divider-full" />
          <p className={styles.evidenceTitle}>আদালতে দাখিলকৃত প্রমাণাদি</p>
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
                <span>প্রমাণ #{item.id}</span>
              </div>
              <h3 className={styles.evidenceCardTitle}>{item.title}</h3>
              <p className={styles.evidenceCardText}>{item.text}</p>
              <div className={styles.evidenceStamp}>দাখিলকৃত</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
