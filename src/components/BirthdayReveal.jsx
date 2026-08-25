import { motion } from 'framer-motion';
import styles from './BirthdayReveal.module.css';

export default function BirthdayReveal() {
  return (
    <section className={`section ${styles.birthdaySection}`} id="birthday">
      <div className="container">

        {/* Case Closed transition */}
        <motion.div
          className={styles.caseClosed}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="divider-full" />
          <p className={styles.caseClosedText}>CASE CLOSED.</p>
          <p className={styles.caseClosedSub}>তবে একটা গুরুত্বপূর্ণ বিষয় এখনো বাকি রয়ে গেছে...</p>
          <div className="divider-full" />
        </motion.div>

        {/* Birthday Title */}
        <motion.div
          className={styles.birthdayTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className={styles.cakeEmoji} role="img" aria-label="Birthday cake">🎂</span>
          <p className={styles.happyBirthday}>শুভ জন্মদিন</p>
          <p className={styles.name}>সালমান প্রিন্স</p>
        </motion.div>

        {/* Main message in beautiful Bengali */}
        <motion.div
          className={`glass-card ${styles.messageCard}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className={styles.messageLine}>
            তোমার জীবন সবসময় ভরে থাকুক
          </p>
          <p className={`${styles.messageLine} ${styles.highlight}`}>
            সাফল্য, সুখ, ভালো মানুষ
          </p>
          <p className={styles.messageLine}>
            আর অসংখ্য অবিস্মরণীয় মুহূর্তে।
          </p>

          <div className={styles.divider} />

          <p className={styles.messageLine}>এগিয়ে যেতে থাকো।</p>
          <p className={styles.messageLine}>হাসতে থাকো।</p>
          <p className={styles.messageLine}>
            নিজের সেরা সংস্করণ হতে থাকো প্রতিটা দিন।
          </p>

          <div className={styles.divider} />

          <p className={styles.signOff}>
            শুভ জন্মদিন, ছোট ভাই।{' '}
            <span role="img" aria-label="heart">❤️</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
