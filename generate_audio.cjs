// Generate a gentle ambient audio file for the voice note demo
const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const duration = 8; // 8 seconds
const numSamples = sampleRate * duration;
const buffer = Buffer.alloc(44 + numSamples * 2);

// WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
buffer.writeUInt16LE(1, 22); // NumChannels (1 = Mono)
buffer.writeUInt32LE(sampleRate, 24); // SampleRate
buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
buffer.writeUInt16LE(2, 32); // BlockAlign
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 2, 40);

// Generate gentle melody notes (C - E - G - B - C pentatonic chords like a music box / soft acoustic hum)
const notes = [
  { freq: 261.63, start: 0.2, dur: 2.2 }, // C4
  { freq: 329.63, start: 1.5, dur: 2.5 }, // E4
  { freq: 392.00, start: 3.0, dur: 2.5 }, // G4
  { freq: 493.88, start: 4.5, dur: 2.8 }, // B4
  { freq: 523.25, start: 5.5, dur: 2.5 }  // C5
];

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  let sample = 0;

  for (const n of notes) {
    if (t >= n.start && t < n.start + n.dur) {
      const elapsed = t - n.start;
      // Exponential decay envelope
      const env = Math.exp(-elapsed * 1.5) * Math.sin(Math.min(1, elapsed * 20) * Math.PI / 2);
      // Soft tone with harmonic
      const tone = Math.sin(2 * Math.PI * n.freq * elapsed) * 0.7 +
                   Math.sin(4 * Math.PI * n.freq * elapsed) * 0.2 +
                   Math.sin(6 * Math.PI * n.freq * elapsed) * 0.1;
      sample += tone * env * 0.35;
    }
  }

  // Soft vinyl crackle / tape warmth
  const noise = (Math.random() * 2 - 1) * 0.004;
  sample += noise;

  // Clamp
  sample = Math.max(-1, Math.min(1, sample));
  buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
}

const outDir = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'voice-letter.mp3'), buffer);
fs.writeFileSync(path.join(outDir, 'voice-letter.wav'), buffer);
console.log('Ambient audio files created successfully in public/audio/');
