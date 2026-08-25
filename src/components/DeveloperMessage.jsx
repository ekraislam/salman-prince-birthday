import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import styles from './DeveloperMessage.module.css';

const CODE_LINES = [
  { text: 'const salmanPrince = {', delay: 0 },
  { text: '    status: "Legend",', delay: 180, gold: true },
  { text: '    happiness: Infinity,', delay: 360, gold: true },
  { text: '    success: "Unlimited",', delay: 540, gold: true },
  { text: '    bugs: 0,', delay: 720, green: true },
  { text: '    awesomeness: Infinity,', delay: 900, gold: true },
  { text: '    birthday: "Every day ✨",', delay: 1080, gold: true },
  { text: '};', delay: 1260 },
  { text: '', delay: 1440 },
  { text: 'deploy(salmanPrince);', delay: 1620, highlight: true },
];

const BUILD_RESULTS = [
  { text: '✓ Build Successful', delay: 2200, type: 'success' },
  { text: '✓ Tests Passed (100%)', delay: 2600, type: 'success' },
  { text: '✓ Zero Bugs Detected', delay: 3000, type: 'success' },
  { text: '✓ Deployment Complete', delay: 3400, type: 'success' },
  { text: '', delay: 3700 },
  { text: 'STATUS: LEGENDARY', delay: 3900, type: 'legendary' },
];

export default function DeveloperMessage() {
  const [codeLines, setCodeLines] = useState([]);
  const [buildLines, setBuildLines] = useState([]);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    CODE_LINES.forEach((line, i) => {
      setTimeout(() => {
        setCodeLines(prev => [...prev, { ...line, id: i }]);
      }, line.delay);
    });

    BUILD_RESULTS.forEach((line, i) => {
      setTimeout(() => {
        setBuildLines(prev => [...prev, { ...line, id: i }]);
      }, line.delay);
    });
  }, [started]);

  return (
    <section className={`section ${styles.devSection}`} ref={ref}>
      <div className="container">
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          DEVELOPER RECORD
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Deployment
        </motion.h2>

        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="terminal-bar">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">salman_prince.js — Code Editor</span>
          </div>

          <div className="terminal-body">
            {/* Line numbers + code */}
            {codeLines.map((line, i) => (
              <div key={line.id} className={styles.codeLine}>
                <span className={styles.lineNum}>{i + 1}</span>
                <span
                  className={`${styles.codeText} ${
                    line.gold ? styles.codeGold : ''
                  } ${line.green ? styles.codeGreen : ''} ${
                    line.highlight ? styles.codeHighlight : ''
                  }`}
                >
                  {line.text}
                </span>
              </div>
            ))}

            {codeLines.length === CODE_LINES.length && (
              <>
                <div className={styles.separator} />
                {buildLines.map((line) => (
                  <div key={line.id} className={styles.buildLine}>
                    {line.type === 'success' && (
                      <span className={styles.buildSuccess}>{line.text}</span>
                    )}
                    {line.type === 'legendary' && (
                      <span className={styles.buildLegendary}>{line.text}</span>
                    )}
                    {!line.type && <span>&nbsp;</span>}
                  </div>
                ))}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
