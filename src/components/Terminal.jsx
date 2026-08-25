import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Terminal.module.css';

const LINES = [
  { text: 'Initializing personality audit...', delay: 300 },
  { text: '', delay: 600 },
  { text: 'Scanning personality...', delay: 900 },
  { text: 'PROGRESS', delay: 1300, progress: true },
  { text: '', delay: 2800 },
  { text: 'Confidence: 99.99%', delay: 3000, highlight: 'gold' },
  { text: '', delay: 3200 },
  { text: 'Running trait analysis...', delay: 3400 },
  { text: '', delay: 3700 },
  { text: 'Kindness ............ PASS', delay: 3900, result: 'pass' },
  { text: 'Humor ............... PASS', delay: 4500, result: 'pass' },
  { text: 'Confidence .......... PASS', delay: 5100, result: 'pass' },
  { text: 'Awesomeness ......... CRITICAL', delay: 5700, result: 'critical' },
  { text: '', delay: 6200 },
  { text: '──────────────────────────────', delay: 6400 },
  { text: 'WARNING:', delay: 6600, highlight: 'red' },
  { text: 'AWESOMENESS LEVEL EXCEEDS SAFE LIMITS.', delay: 7000, highlight: 'red' },
  { text: '──────────────────────────────', delay: 7300 },
];

function ProgressBar({ onComplete }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth(w => {
        if (w >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        return w + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  const blocks = Math.floor(width / 5);
  const bar = '█'.repeat(blocks) + '░'.repeat(20 - blocks);

  return (
    <span className={styles.progressLine}>
      {bar} <span className={styles.pct}>{width}%</span>
    </span>
  );
}

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);

    LINES.forEach((line, i) => {
      if (line.progress) {
        setTimeout(() => {
          setVisibleLines(prev => [...prev, { ...line, id: i }]);
        }, line.delay);
      } else {
        setTimeout(() => {
          setVisibleLines(prev => [...prev, { ...line, id: i }]);
        }, line.delay);
      }
    });
  }, [inView, started]);

  return (
    <section className={`section ${styles.terminalSection}`} id="evidence" ref={ref}>
      <div className="container">
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          DEVELOPER ANALYSIS
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Personality Check
        </motion.h2>

        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Terminal bar */}
          <div className="terminal-bar">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">salman_prince@birthday:~$</span>
          </div>

          {/* Terminal body */}
          <div className="terminal-body">
            <p className={styles.termCmd}>
              <span className={styles.prompt}>salman_prince@birthday:~$</span>{' '}
              <span className={styles.cmd}>run personality_check --subject="Salman Prince"</span>
            </p>
            <br />

            {visibleLines.map((line) => {
              if (!line.text) return <br key={line.id} />;

              if (line.progress) {
                return (
                  <p key={line.id} className={styles.lineBase}>
                    <ProgressBar />
                  </p>
                );
              }

              if (line.result === 'pass') {
                return (
                  <p key={line.id} className={styles.lineBase}>
                    <span className={styles.lineTextPass}>{line.text}</span>
                  </p>
                );
              }

              if (line.result === 'critical') {
                return (
                  <p key={line.id} className={styles.lineBase}>
                    <span className={styles.lineTextCritical}>{line.text}</span>
                  </p>
                );
              }

              if (line.highlight === 'red') {
                return (
                  <p key={line.id} className={styles.lineBase}>
                    <span className={styles.lineTextRed}>{line.text}</span>
                  </p>
                );
              }

              if (line.highlight === 'gold') {
                return (
                  <p key={line.id} className={styles.lineBase}>
                    <span className={styles.lineTextGold}>{line.text}</span>
                  </p>
                );
              }

              return (
                <p key={line.id} className={styles.lineBase}>
                  <span>{line.text}</span>
                </p>
              );
            })}

            {/* Blinking cursor */}
            {visibleLines.length > 0 && (
              <p className={styles.lineBase}>
                <span className={styles.cursor}>█</span>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
