import { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import IntroScreen from './components/IntroScreen';
import CaseFile from './components/CaseFile';
import Testimonies from './components/Testimonies';
import DefendantProfile from './components/DefendantProfile';
import Courtroom from './components/Courtroom';
import Verdict from './components/Verdict';
import BirthdayReveal from './components/BirthdayReveal';
import CourtJudgment from './components/CourtJudgment';
import Timeline from './components/Timeline';
import FinalMessage from './components/FinalMessage';
import Navigation from './components/Navigation';
import ParticlesBackground from './components/ParticlesBackground';
import GoldCursorTrail from './components/GoldCursorTrail';
import { useSound } from './hooks/useSound';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [verdictRevealed, setVerdictRevealed] = useState(false);
  const { enabled: soundEnabled, toggleSound, playGavelStrike, playTripleGavel } = useSound();
  const verdictRef = useRef(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleVerdictAccepted = useCallback(() => {
    setVerdictRevealed(true);
    setTimeout(() => {
      const el = document.getElementById('verdict');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, []);

  return (
    <>
      {/* Ambient background particles */}
      <ParticlesBackground />

      {/* Feature 5: Interactive Gold Cursor & Touch Dust Trail */}
      <GoldCursorTrail />

      {/* Intro overlay */}
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen
            onEnter={handleIntroComplete}
            playGavelStrike={playGavelStrike}
          />
        )}
      </AnimatePresence>

      {/* Main experience */}
      <AnimatePresence>
        {introComplete && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Floating nav */}
            <Navigation soundEnabled={soundEnabled} onToggleSound={toggleSound} />

            {/* Case file + Stats metrics */}
            <CaseFile />

            {/* Sworn testimonies */}
            <Testimonies />

            {/* Defendant Photo Profile */}
            <DefendantProfile />

            {/* Feature 1: Courtroom with Gavel audio & Screen shake */}
            <Courtroom
              onVerdictAccepted={handleVerdictAccepted}
              playGavelStrike={playGavelStrike}
              playTripleGavel={playTripleGavel}
            />

            {/* Verdict with Certificate Download (Feature 2) */}
            <AnimatePresence>
              {verdictRevealed && (
                <motion.div
                  id="verdict"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  ref={verdictRef}
                >
                  <Verdict />
                  <BirthdayReveal />
                  <CourtJudgment />
                  <Timeline />
                  <FinalMessage />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
