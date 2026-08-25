import { useState, useRef, useEffect, useCallback } from 'react';

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainRef = useRef(null);

  // Initialize or get AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Wooden Courtroom Gavel Strike Synthesizer using Web Audio API
  const playGavelStrike = useCallback((timeOffset = 0, isHeavy = false) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime + timeOffset;

    // 1. Strike transient (woody click)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(isHeavy ? 180 : 220, t);
    clickOsc.frequency.exponentialRampToValueAtTime(40, t + 0.08);

    clickGain.gain.setValueAtTime(isHeavy ? 0.9 : 0.6, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(t);
    clickOsc.stop(t + 0.1);

    // 2. Heavy wood resonance thud
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(isHeavy ? 95 : 120, t);
    thudOsc.frequency.exponentialRampToValueAtTime(30, t + 0.25);

    thudGain.gain.setValueAtTime(isHeavy ? 0.8 : 0.5, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(t);
    thudOsc.stop(t + 0.35);

    // 3. Wood desk reverb body (Noise burst)
    const bufferSize = ctx.sampleRate * 0.12;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isHeavy ? 450 : 600, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(isHeavy ? 0.4 : 0.25, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(t);
    whiteNoise.stop(t + 0.15);
  }, [getAudioContext]);

  // Triple Courtroom Gavel Strike ("Order in the Court!")
  const playTripleGavel = useCallback(() => {
    playGavelStrike(0.0, false);
    playGavelStrike(0.28, false);
    playGavelStrike(0.58, true);
  }, [playGavelStrike]);

  // Ambient celebration background music/tones
  const createCelebrationSound = useCallback((ctx) => {
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
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!enabled) {
      createCelebrationSound(ctx);
      setEnabled(true);
    } else {
      if (gainRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      }
      setEnabled(false);
    }
  }, [enabled, createCelebrationSound, getAudioContext]);

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch {}
      });
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch {}
      }
    };
  }, []);

  return { enabled, toggleSound, playGavelStrike, playTripleGavel };
}
