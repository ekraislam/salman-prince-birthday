import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

const VERSIONS = [
  {
    version: 'নথি নং ০১',
    year: 'আগস্ট ২০০৫',
    title: 'পৃথিবীতে শুভ আগমন',
    desc: 'সালমান প্রিন্সের শুভ জন্ম। পৃথিবীতে একজন অসাধারণ মানুষের পদার্পণ ও জীবনের প্রথম অধ্যায়ের সূচনা।',
    tag: 'FILED',
  },
  {
    version: 'নথি নং ০২',
    year: 'শৈশব ও প্রারম্ভ',
    title: 'মায়া ও ব্যক্তিত্বের বিকাশ',
    desc: 'শৈশব থেকেই অফুরন্ত কৌতূহল, হাসিখুশি স্বভাব ও সবাইকে আপন করে নেওয়ার অদ্ভুত ক্ষমতার প্রকাশ।',
    tag: 'IN PROGRESS',
  },
  {
    version: 'নথি নং ০৩',
    year: 'শিক্ষাজীবন',
    title: 'অভিজ্ঞতা ও মেধার বিস্তার',
    desc: 'ধীরে ধীরে মেধা ও প্রজ্ঞার বিকাশ। জীবনে নানা অভিজ্ঞতা সঞ্চয় এবং নিজের ব্যক্তিত্বকে প্রতিনিয়ত উন্নত করা।',
    tag: 'ON RECORD',
  },
  {
    version: 'নথি নং ০৪',
    year: 'আইন অনুষদ',
    title: 'ন্যায়বিচারের পথে পদযাত্রা',
    desc: 'আইনের ছাত্র হিসেবে পথচলা শুরু। সততা, যুক্তি ও ন্যায়পরায়ণতার মাধ্যমে ভবিষ্যতে আইন অঙ্গনে উজ্জ্বল স্বাক্ষরের প্রস্তুতি।',
    tag: 'ACTIVE',
  },
  {
    version: 'নথি নং ০৫',
    year: '২০২৬ (বর্তমান)',
    title: '২১তম বর্ষপূর্তি — অপ্রতিরোধ্য যাত্রা',
    desc: 'আজকের এই বিশেষ ক্ষণে আরও জ্ঞানী, শক্তিশালী, ধৈর্যশীল ও আপন মহিমায় ভাস্বর। শুভ জন্মদিন, সালমান প্রিন্স!',
    tag: 'CURRENT',
    current: true,
  },
];

export default function Timeline() {
  return (
    <section className={`section ${styles.timelineSection}`} id="message">
      <div className="container">
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          জীবন পরিক্রমা ও আইনি রেকর্ড
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          সালমান প্রিন্স
          <br />
          <span className={styles.headingSub}>২১ বছরের গৌরবময় স্মৃতিনথি</span>
        </motion.h2>

        <div className={styles.timeline}>
          {VERSIONS.map((v, i) => (
            <motion.div
              key={v.version}
              className={`${styles.item} ${v.current ? styles.itemCurrent : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Connector */}
              <div className={styles.connector}>
                <div className={`${styles.dot} ${v.current ? styles.dotCurrent : ''}`} />
                {i < VERSIONS.length - 1 && <div className={styles.line} />}
              </div>

              {/* Content */}
              <div className={`glass-card ${styles.card}`}>
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.version}>{v.version}</span>
                    {v.year && <span className={styles.year}> — {v.year}</span>}
                  </div>
                  <span className={`${styles.tag} ${v.current ? styles.tagCurrent : ''}`}>
                    {v.tag}
                  </span>
                </div>
                <h3 className={styles.itemTitle}>{v.title}</h3>
                <p className={styles.itemDesc}>{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
