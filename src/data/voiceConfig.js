import voice2Video from "../assets/voice2.mp4";

/**
 * Cấu hình Voice Letter (Bản ghi âm giọng nói chính)
 * Sử dụng video voice2.mp4 từ thư mục src/assets/
 */
export const defaultVoiceConfig = {
  title: "Cái voice khác nữa",
  description: "Khúc này là sến vl ròi",
  caption: "from dat with love",
  trackName: "voice2.mp4",
  sourceType: "video", // "video" | "audio"
  src: voice2Video,
  showWaveform: true,
  enableAnimation: true
};

export const defaultVoiceHeader = {
  eyebrow: "Còn nữa nè cốt",
  sectionTitle: "Này là bonus thêm",
  sectionSubtitle: "mình iu b"
};
