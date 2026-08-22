// Subtle Web Audio Micro-interactions
let audioCtx: AudioContext | null = null;
let isSoundEnabled = false;

export function toggleSound(): boolean {
  isSoundEnabled = !isSoundEnabled;
  if (isSoundEnabled && !audioCtx && typeof window !== "undefined") {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (isSoundEnabled) {
    playPopSound(600, 0.05);
  }
  return isSoundEnabled;
}

export function getSoundStatus(): boolean {
  return isSoundEnabled;
}

export function playPopSound(freq = 440, duration = 0.04) {
  if (!isSoundEnabled || typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Graceful fallback
  }
}

export function playClickSound() {
  playPopSound(520, 0.03);
}

export function playSuccessSound() {
  if (!isSoundEnabled) return;
  playPopSound(587.33, 0.06);
  setTimeout(() => playPopSound(880, 0.08), 80);
}
