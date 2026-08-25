import { useRef, useCallback } from 'react';

export function useSound() {
  const audioContextRef = useRef(null);

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

  // Realistic Wooden Courtroom Gavel Strike Synthesizer
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

    // 3. Wood desk body acoustics
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
    noiseGain.gain.setValueAtTime(isHeavy ? 0.35 : 0.2, t);
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

  return { playGavelStrike, playTripleGavel };
}
