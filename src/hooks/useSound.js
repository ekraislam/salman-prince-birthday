import { useState, useRef, useEffect, useCallback } from 'react';

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainRef = useRef(null);

  const createCelebrationSound = useCallback((ctx) => {
    // Create a subtle, looping ambient celebration sound using Web Audio API
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // Bass drone
    const bass = ctx.createOscillator();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(65, ctx.currentTime);
    const bassGain = ctx.createGain();
    bassGain.gain.value = 0.4;
    bass.connect(bassGain);
    bassGain.connect(masterGain);
    bass.start();
    oscillatorsRef.current.push(bass);

    // Mid harmony
    const mid = ctx.createOscillator();
    mid.type = 'sine';
    mid.frequency.setValueAtTime(195, ctx.currentTime);
    const midGain = ctx.createGain();
    midGain.gain.value = 0.2;
    mid.connect(midGain);
    midGain.connect(masterGain);
    mid.start();
    oscillatorsRef.current.push(mid);

    // High shimmer
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(520, ctx.currentTime);
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.08;
    shimmer.connect(shimmerGain);
    shimmerGain.connect(masterGain);

    // LFO for shimmer tremolo
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.4;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(shimmerGain.gain);
    lfo.start();
    shimmer.start();
    oscillatorsRef.current.push(shimmer, lfo);
  }, []);

  const toggleSound = useCallback(() => {
    if (!enabled) {
      // Enable sound
      if (!audioContextRef.current) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = ctx;
        createCelebrationSound(ctx);
      } else {
        audioContextRef.current.resume();
        if (gainRef.current) {
          gainRef.current.gain.linearRampToValueAtTime(0.08, audioContextRef.current.currentTime + 0.5);
        }
      }
      setEnabled(true);
    } else {
      // Disable sound
      if (gainRef.current && audioContextRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
      }
      setEnabled(false);
    }
  }, [enabled, createCelebrationSound]);

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch {}
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return { enabled, toggleSound };
}
