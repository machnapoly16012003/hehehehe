import { defaultVoiceConfig } from '../data/voiceConfig';
import { defaultLetterSections, defaultLetterNarration } from '../data/letterData';
import { defaultMemories } from '../data/memories';
import { defaultConfessionData, defaultEndingData } from '../data/confessionData';

const KEYS = {
  VOICE: 'love_letter_voice_config',
  LETTER: 'love_letter_sections',
  LETTER_NARRATION: 'love_letter_narration',
  MEMORIES: 'love_letter_memories',
  CONFESSION: 'love_letter_confession',
  ENDING: 'love_letter_ending'
};

// Safe localStorage parser
function loadKey(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`[Storage] Failed to read ${key}:`, e);
    return fallback;
  }
}

function saveKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`[Storage] Failed to write ${key}:`, e);
    return false;
  }
}

export function getVoiceConfig() {
  const loaded = loadKey(KEYS.VOICE, defaultVoiceConfig);
  // Nếu dữ liệu cũ trong localStorage đang trỏ về file mp3 ban đầu hoặc Giong_noi_gui_em.m4a, ưu tiên lấy video mới từ asset
  if (
    !loaded ||
    !loaded.src ||
    loaded.src === '/audio/voice-letter.mp3' ||
    loaded.trackName === 'Giong_noi_gui_em.m4a' ||
    loaded.trackName === 'voice1.mp4'
  ) {
    return defaultVoiceConfig;
  }
  return loaded;
}

export function saveVoiceConfig(config) {
  const safeConfig = { ...config };
  if (safeConfig.src && safeConfig.src.startsWith('blob:')) {
    safeConfig.src = defaultVoiceConfig.src;
  }
  return saveKey(KEYS.VOICE, safeConfig);
}

export function getLetterNarration() {
  const loaded = loadKey(KEYS.LETTER_NARRATION, defaultLetterNarration);
  // Nếu dữ liệu cũ trong localStorage đang trỏ về file mp3 ban đầu, ưu tiên lấy video mới từ asset
  if (loaded.src === '/audio/letter-narration.mp3') {
    return defaultLetterNarration;
  }
  return loaded;
}

export function saveLetterNarration(narration) {
  const safe = { ...narration };
  if (safe.src && safe.src.startsWith('blob:')) {
    safe.src = defaultLetterNarration.src;
  }
  return saveKey(KEYS.LETTER_NARRATION, safe);
}

export function getLetterSections() {
  return loadKey(KEYS.LETTER, defaultLetterSections);
}

export function saveLetterSections(sections) {
  return saveKey(KEYS.LETTER, sections);
}

export function getMemories() {
  return loadKey(KEYS.MEMORIES, defaultMemories);
}

export function saveMemories(memories) {
  return saveKey(KEYS.MEMORIES, memories);
}

export function getConfessionData() {
  return loadKey(KEYS.CONFESSION, defaultConfessionData);
}

export function saveConfessionData(data) {
  return saveKey(KEYS.CONFESSION, data);
}

export function getEndingData() {
  return loadKey(KEYS.ENDING, defaultEndingData);
}

export function saveEndingData(data) {
  return saveKey(KEYS.ENDING, data);
}

export function resetAllToDefaults() {
  try {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    return true;
  } catch (e) {
    console.error('[Storage] Error resetting data:', e);
    return false;
  }
}
