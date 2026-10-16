# Dat
### Cinematic Black & White Confession Website

Một website tỏ tình điện ảnh trắng đen kết hợp bức thư viết tay kỹ thuật số được thiết kế tinh tế, sâu lắng và cá nhân hóa.

---

## 1. Công nghệ & Kiến trúc
- **React 19 + Vite 8**
- **Lucide React** (icon monochrome tối giản)
- **CSS3 Black & White Cinematic Design System** (#000000, #080808, #141414, #252525, #888888, #D8D8D8, #FFFFFF)
- **35mm Film Grain Overlay & Cinematic Vignette**
- **Typewriter Effect với Cursor nhấp nháy, kiểm soát tốc độ & khoảng dừng**
- **Custom Audio/Video Voice Letter Player** với Monochrome Waveform đồng bộ
- **Live Editorial Studio (/editor)**: Chỉnh sửa trực quan 2 cột trên Desktop, 1 cột trên Mobile, Live Preview và lưu LocalStorage

---

## 2. Các Route trải nghiệm
- **`/` (Trang chủ)**: Bức thư tỏ tình gửi cho bạn gái. Mở đầu bằng màn hình Intro điện ảnh, hiệu ứng gõ chữ, album ảnh kỷ niệm, bản ghi âm giọng nói, lời tỏ tình và phần kết.
- **`/editor` (hoặc `#/editor`)**: Trang Studio quản trị nội dung. Tùy chỉnh Voice Letter, xem trước file từ máy tính, chỉnh sửa từng câu trong bức thư, thay đổi ảnh kỷ niệm, và xuất mã cấu hình để deploy.

---

## 3. Cài đặt và Chạy thử nghiệm

### Cài đặt dependencies:
```bash
npm install
```

### Chạy môi trường phát triển (Local):
```bash
npm run dev
```
Mở trình duyệt tại: **`http://localhost:5173/`** hoặc **`http://localhost:5173/#/editor`**

### Kiểm tra linter:
```bash
npm run lint
```

### Build cho production:
```bash
npm run build
```

---

## 4. Hướng dẫn Tùy biến Nội dung cho Bạn Gái

### 4.1. Thay đổi nội dung bức thư (Typewriter Letter)
Mở file `src/data/letterData.js`. Bạn có thể thêm, bớt hoặc chỉnh sửa từng câu:
```javascript
export const defaultLetterSections = [
  {
    id: 1,
    text: "Hey, you.",
    speed: 75,       // Tốc độ gõ (ms mỗi ký tự)
    pause: 1200,     // Khoảng dừng trước câu tiếp theo (ms)
    style: "large",  // Kiểu chữ: 'normal', 'italic', 'serif', 'highlight', 'large', 'final'
    align: "left"    // Căn lề: 'left' hoặc 'center'
  },
  // ...
];
```

### 4.2. Thêm hình ảnh kỷ niệm của hai bạn
1. Sao chép ảnh của bạn vào thư mục `public/images/`:
   - `public/images/memory-01.jpg` (Ảnh lớn chủ đạo)
   - `public/images/memory-02.jpg`
   - `public/images/memory-03.jpg`
   - `public/images/memory-04.jpg`
2. Mở file `src/data/memories.js` để chỉnh sửa tiêu đề, caption và ngày tháng kỷ niệm.

### 4.3. Thêm file ghi âm giọng nói (Voice Letter)
1. Đặt file ghi âm (MP3, WAV, M4A) vào thư mục:
   `public/audio/voice-letter.mp3`
2. (Tùy chọn) Nếu dùng video, đặt vào:
   `public/videos/voice-letter.mp4`
3. Cập nhật thông tin trong `src/data/voiceConfig.js`:
```javascript
export const defaultVoiceConfig = {
  title: "A voice note, just for you",
  description: "There are things I can say better with my voice",
  caption: "Recorded with all my heart",
  trackName: "Voice_Letter_For_You.m4a",
  sourceType: "audio", // hoặc "video"
  src: "/audio/voice-letter.mp3",
  showWaveform: true,
  enableAnimation: true
};
```

### 4.4. Sử dụng Live Editorial Studio (`/editor`)
1. Truy cập `http://localhost:5173/#/editor`
2. Bạn có thể chọn file ghi âm hoặc video trực tiếp từ máy để nghe thử ngay trên player.
3. Chỉnh sửa tiêu đề, bật tắt waveform, chỉnh sửa câu tỏ tình.
4. Nhấn **Save Configuration** để lưu tạm vào trình duyệt hoặc chuyển sang tab **Export & Deploy Code** để copy đoạn code cấu hình và dán vào file source.

---

## 5. Hướng dẫn Deploy lên Vercel / Netlify / GitHub Pages

1. Build dự án:
```bash
npm run build
```
2. Thư mục `dist/` chứa toàn bộ trang web tĩnh đã được tối ưu hóa.
3. Khi deploy lên **Vercel** hoặc **Netlify**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Gửi đường link cho bạn gái để cô ấy mở trên điện thoại!
