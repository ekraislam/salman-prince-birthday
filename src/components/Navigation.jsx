import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './Navigation.module.css';

const SECTIONS = [
  { id: 'case', label: 'CASE' },
  { id: 'evidence', label: 'EVIDENCE' },
  { id: 'court', label: 'COURT' },
  { id: 'verdict', label: 'VERDICT' },
  { id: 'birthday', label: 'MESSAGE' },
];

export default function Navigation({ soundEnabled, onToggleSound }) {
  const [active, setActive] = useState('case');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Show nav after scrolling a bit
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className={styles.nav}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          aria-label="Page sections"
        >
          <div className={styles.navInner}>
            {/* Section dots */}
            <div className={styles.sections}>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  className={`${styles.navItem} ${active === s.id ? styles.navItemActive : ''}`}
                  onClick={() => scrollTo(s.id)}
                  aria-label={`Scroll to ${s.label} section`}
                  aria-current={active === s.id ? 'true' : 'false'}
                >
                  <span className={styles.navDot} />
                  <span className={styles.navLabel}>{s.label}</span>
                </button>
              ))}
            </div>

            {/* Sound toggle */}
            <button
              className={styles.soundBtn}
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
              title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
            >
              {soundEnabled ? (
                <Volume2 size={14} strokeWidth={1.5} />
              ) : (
                <VolumeX size={14} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
