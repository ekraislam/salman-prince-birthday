import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import styles from './Timeline.module.css';

const VERSIONS = [
  {
    version: 'FILING NO. 001',
    year: 'Year One',
    title: 'Case Initiated',
    desc: 'Defendant Salman Prince enters the world. Initial registration complete. All vital statistics filed with the appropriate authorities.',
    tag: 'FILED',
  },
  {
    version: 'FILING NO. 002',
    year: 'Early Years',
    title: 'Character Development',
    desc: 'Counsel notes significant growth in defendant\'s personality. Evidence of curiosity, charm, and stubbornness — all filed as character exhibits.',
    tag: 'IN PROGRESS',
  },
  {
    version: 'FILING NO. 003',
    year: 'Formative Period',
    title: 'Experiences Logged',
    desc: 'Defendant accumulates significant life experience. The court records note an expanding social circle and increasingly refined judgment.',
    tag: 'ON RECORD',
  },
  {
    version: 'FILING NO. 004',
    year: 'Law School',
    title: 'Pursuing Justice',
    desc: 'Defendant enrolls in Law. The court predicts this individual will one day stand on the other side of the bench — as Counsel.',
    tag: 'ACTIVE',
  },
  {
    version: 'FILING NO. 005',
    year: '2026',
    title: 'Another Year Stronger',
    desc: 'Current filing. The defendant has grown wiser, stronger, and significantly more awesome than all previous filings combined. Status: LEGENDARY.',
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
          CASE DOCKET HISTORY
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Salman Prince
          <br />
          <span className={styles.headingSub}>Court Filings & Record</span>
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
