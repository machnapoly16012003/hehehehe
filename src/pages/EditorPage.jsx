import React, { useState, useEffect } from 'react';
import VoicePlayer from '../components/VoicePlayer';
import {
  getVoiceConfig,
  saveVoiceConfig,
  getLetterNarration,
  saveLetterNarration,
  getLetterSections,
  saveLetterSections,
  getMemories,
  saveMemories,
  getConfessionData,
  saveConfessionData,
  resetAllToDefaults
} from '../utils/storage';
import {
  Save,
  RotateCcw,
  Upload,
  Check,
  AlertTriangle,
  ArrowLeft,
  Copy,
  Headphones
} from 'lucide-react';
import '../styles/editor.css';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('voice'); // 'voice' | 'narration' | 'letter' | 'gallery' | 'confession' | 'export'
  const [statusMessage, setStatusMessage] = useState('');

  // Voice Config State (Bản thu chính)
  const [voiceConfig, setVoiceConfig] = useState(getVoiceConfig());
  const [selectedFileMeta, setSelectedFileMeta] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  // Narration Voiceover State (Lời kể đồng bộ dưới thư)
  const [narrationConfig, setNarrationConfig] = useState(getLetterNarration());
  const [narrationFileMeta, setNarrationFileMeta] = useState(null);
  const [narrationObjectUrl, setNarrationObjectUrl] = useState(null);

  // Other configs
  const [letterSections, setLetterSections] = useState(getLetterSections());
  const [memories, setMemories] = useState(getMemories());
  const [confessionData, setConfessionData] = useState(getConfessionData());

  // Copy notification state
  const [copiedCode, setCopiedCode] = useState(false);

  // Dọn dẹp object URL khi unmount
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (narrationObjectUrl) URL.revokeObjectURL(narrationObjectUrl);
    };
  }, [objectUrl, narrationObjectUrl]);

  const showToast = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  // Voice Form Handlers
  const handleVoiceChange = (field, value) => {
    setVoiceConfig((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const newUrl = URL.createObjectURL(file);
    setObjectUrl(newUrl);

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setSelectedFileMeta({
      name: file.name,
      size: `${sizeInMB} MB`,
      type: file.type
    });

    setVoiceConfig((prev) => ({
      ...prev,
      src: newUrl,
      sourceType: type,
      trackName: file.name
    }));

    showToast(`Đã tải lên "${file.name}" để nghe thử`);
  };

  const handleSaveVoiceConfig = () => {
    const success = saveVoiceConfig(voiceConfig);
    if (success) {
      showToast('Đã lưu cấu hình Bản Ghi Âm Giọng Nói!');
    }
  };

  // Narration Voiceover Upload
  const handleNarrationFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (narrationObjectUrl) URL.revokeObjectURL(narrationObjectUrl);
    const newUrl = URL.createObjectURL(file);
    setNarrationObjectUrl(newUrl);

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setNarrationFileMeta({
      name: file.name,
      size: `${sizeInMB} MB`
    });

    setNarrationConfig((prev) => ({
      ...prev,
      src: newUrl
    }));

    showToast(`Đã tải file giọng đọc bức thư: "${file.name}"`);
  };

  const handleSaveNarration = () => {
    saveLetterNarration(narrationConfig);
    showToast('Đã lưu cấu hình Giọng Đọc Đồng Bộ Bức Thư!');
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại tất cả về mặc định không?')) {
      resetAllToDefaults();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl(null);
      }
      if (narrationObjectUrl) {
        URL.revokeObjectURL(narrationObjectUrl);
        setNarrationObjectUrl(null);
      }
      setSelectedFileMeta(null);
      setNarrationFileMeta(null);
      setVoiceConfig(getVoiceConfig());
      setNarrationConfig(getLetterNarration());
      setLetterSections(getLetterSections());
      setMemories(getMemories());
      setConfessionData(getConfessionData());
      showToast('Đã khôi phục toàn bộ cấu hình ban đầu.');
    }
  };

  // Letter section edits
  const handleSectionTextChange = (index, newText) => {
    const updated = [...letterSections];
    updated[index].text = newText;
    setLetterSections(updated);
  };

  const handleSaveLetter = () => {
    saveLetterSections(letterSections);
    showToast('Đã lưu nội dung các dòng thư!');
  };

  // Memory edits
  const handleMemoryChange = (index, field, value) => {
    const updated = [...memories];
    updated[index][field] = value;
    setMemories(updated);
  };

  const handleSaveMemories = () => {
    saveMemories(memories);
    showToast('Đã lưu album ảnh kỷ niệm!');
  };

  // Confession edits
  const handleConfessionLineChange = (index, newText) => {
    const updatedLines = [...confessionData.lines];
    updatedLines[index] = newText;
    setConfessionData((prev) => ({ ...prev, lines: updatedLines }));
  };

  const handleSaveConfession = () => {
    saveConfessionData(confessionData);
    showToast('Đã lưu nội dung tỏ tình!');
  };

  // Code Export generator
  const generateExportCode = () => {
    return `// Dán đoạn này vào src/data/letterData.js:
export const defaultLetterNarration = ${JSON.stringify(narrationConfig, null, 2)};

// Dán đoạn này vào src/data/voiceConfig.js:
export const defaultVoiceConfig = ${JSON.stringify(
      {
        ...voiceConfig,
        src:
          voiceConfig.sourceType === 'video'
            ? '/videos/voice-letter.mp4'
            : '/audio/voice-letter.mp3'
      },
      null,
      2
    )};`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="editor-page">
      {/* Thanh đầu trang */}
      <header className="editor-header">
        <div className="editor-title-group">
          <h1>Studio Biên Tập Điện Ảnh</h1>
          <p>Tùy chỉnh từng câu chữ, hình ảnh và giọng nói trước khi gửi cho em ấy</p>
        </div>

        <div className="editor-top-actions">
          <a href="#/" className="btn-cinema-subtle">
            <ArrowLeft size={14} />
            <span>Xem Bức Thư (/)</span>
          </a>
        </div>
      </header>

      {/* Các tab điều hướng */}
      <div className="editor-nav-tabs">
        <button
          className={`editor-tab-btn ${activeTab === 'narration' ? 'active' : ''}`}
          onClick={() => setActiveTab('narration')}
        >
          Giọng Đọc Đồng Bộ Thư
        </button>
        <button
          className={`editor-tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
          onClick={() => setActiveTab('voice')}
        >
          Bản Thu Giọng Nói Chính
        </button>
        <button
          className={`editor-tab-btn ${activeTab === 'letter' ? 'active' : ''}`}
          onClick={() => setActiveTab('letter')}
        >
          Nội Dung Bức Thư
        </button>
        <button
          className={`editor-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          Album Kỷ Niệm
        </button>
        <button
          className={`editor-tab-btn ${activeTab === 'confession' ? 'active' : ''}`}
          onClick={() => setActiveTab('confession')}
        >
          Lời Tỏ Tình
        </button>
        <button
          className={`editor-tab-btn ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          Xuất Mã & Triển Khai
        </button>
      </div>

      {/* Thông báo trạng thái */}
      {statusMessage && (
        <div className="voice-status-notice" style={{ marginBottom: '1.5rem', background: '#1c1c1c' }}>
          <Check size={16} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* TAB 1: GIỌNG ĐỌC ĐỒNG BỘ DƯỚI BỨC THƯ (Movie Narration) */}
      {activeTab === 'narration' && (
        <div className="editor-form-panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 className="editor-panel-title">
            <span>Giọng Đọc Đồng Bộ Với Bức Thư (Voiceover Narration)</span>
            <Headphones size={20} />
          </h2>

          <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Đoạn ghi âm này nằm ngay bên dưới phần gõ chữ. Khi bạn gái nhấn Phát, giọng nói ấm áp của bạn sẽ cất lên đồng bộ với từng câu chữ xuất hiện như lời tựa đề của một bộ phim.
          </p>

          <div className="form-toggle-group">
            <span className="form-toggle-label">Bật thanh phát giọng đọc dưới bức thư</span>
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={narrationConfig.enabled}
              onChange={(e) => setNarrationConfig((prev) => ({ ...prev, enabled: e.target.checked }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tiêu đề thanh giọng đọc</label>
            <input
              type="text"
              className="form-input"
              value={narrationConfig.title}
              onChange={(e) => setNarrationConfig((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="My voice"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dòng mô tả phụ</label>
            <input
              type="text"
              className="form-input"
              value={narrationConfig.subtitle}
              onChange={(e) => setNarrationConfig((prev) => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Nhấn phát để vừa nghe anh đọc, vừa xem từng dòng chữ hiện ra như phim"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Chọn file ghi âm từ máy tính (Xem trước ngay)</label>
            <div className="file-upload-box">
              <input
                type="file"
                accept="audio/*"
                onChange={handleNarrationFileUpload}
              />
              <div className="file-upload-info">
                <Upload size={22} />
                <span>Nhấn hoặc kéo thả file âm thanh giọng đọc (MP3, WAV, M4A)</span>
              </div>
            </div>

            {narrationFileMeta && (
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="file-badge">{narrationFileMeta.name}</span>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>({narrationFileMeta.size})</span>
              </div>
            )}

            <div className="warning-box">
              <AlertTriangle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
              <span>
                <strong>Lưu ý:</strong> Khi đưa trang web lên mạng, hãy đặt file âm thanh của bạn vào thư mục <code>public/audio/letter-narration.mp3</code> để người ấy có thể nghe thấy trên điện thoại nhé.
              </span>
            </div>
          </div>

          <div className="form-action-bar">
            <button className="btn-cinema" onClick={handleSaveNarration}>
              <Save size={15} />
              <span>Lưu Cấu Hình Giọng Đọc</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: VOICE LETTER CHÍNH & LIVE PREVIEW */}
      {activeTab === 'voice' && (
        <div className="editor-workspace">
          {/* Cột trái: Form */}
          <div className="editor-form-panel">
            <h2 className="editor-panel-title">Cấu Hình Bản Ghi Âm Chính</h2>

            <div className="form-group">
              <label className="form-label">Tiêu Đề Bản Ghi Âm</label>
              <input
                type="text"
                className="form-input"
                value={voiceConfig.title}
                onChange={(e) => handleVoiceChange('title', e.target.value)}
                placeholder="Cái voice khác nữa"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dòng Mô Tả</label>
              <textarea
                className="form-textarea"
                value={voiceConfig.description}
                onChange={(e) => handleVoiceChange('description', e.target.value)}
                placeholder="Khúc này là sến vl ròi"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Chú Thích Dưới Player</label>
                <input
                  type="text"
                  className="form-input"
                  value={voiceConfig.caption}
                  onChange={(e) => handleVoiceChange('caption', e.target.value)}
                  placeholder="from dat with love"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tên File Hiển Thị</label>
                <input
                  type="text"
                  className="form-input"
                  value={voiceConfig.trackName}
                  onChange={(e) => handleVoiceChange('trackName', e.target.value)}
                  placeholder="voice2.mp4"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Loại Nguồn Media</label>
              <select
                className="form-select"
                value={voiceConfig.sourceType}
                onChange={(e) => handleVoiceChange('sourceType', e.target.value)}
              >
                <option value="audio">Audio (MP3, WAV, M4A) — Khuyên Dùng</option>
                <option value="video">Video (MP4) — Lấy phần âm thanh từ video</option>
              </select>
              <span className="form-hint">
                Audio nhẹ và tương thích tốt nhất trên điện thoại. Nếu chọn Video, trình phát sẽ trích xuất âm thanh mượt mà.
              </span>
            </div>

            {/* Chọn file từ máy */}
            <div className="form-group">
              <label className="form-label">
                {voiceConfig.sourceType === 'audio' ? 'Chọn File Âm Thanh' : 'Chọn File Video'} (Xem trước trên máy)
              </label>

              <div className="file-upload-box">
                <input
                  type="file"
                  accept={voiceConfig.sourceType === 'audio' ? 'audio/*' : 'video/*'}
                  onChange={(e) => handleFileUpload(e, voiceConfig.sourceType)}
                />
                <div className="file-upload-info">
                  <Upload size={22} />
                  <span>Bấm hoặc kéo thả file để nghe thử ngay trên trình phát bên phải</span>
                  <span style={{ fontSize: '0.7rem', color: '#666' }}>
                    {voiceConfig.sourceType === 'audio' ? 'MP3, WAV, M4A, AAC' : 'MP4, WebM'}
                  </span>
                </div>
              </div>

              {selectedFileMeta && (
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="file-badge">{selectedFileMeta.name}</span>
                  <span style={{ fontSize: '0.72rem', color: '#888' }}>({selectedFileMeta.size})</span>
                </div>
              )}

              <div className="warning-box">
                <AlertTriangle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
                <span>
                  <strong>Ghi nhớ:</strong> File chọn từ máy chỉ để nghe thử tại máy này. Để gửi link cho bạn gái nghe được, hãy copy file vào <code>public/audio/voice-letter.mp3</code> nhé.
                </span>
              </div>
            </div>

            {/* Waveform & Animation */}
            <div className="form-toggle-group">
              <span className="form-toggle-label">Bật hiển thị sóng âm monochrome</span>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={voiceConfig.showWaveform}
                onChange={(e) => handleVoiceChange('showWaveform', e.target.checked)}
              />
            </div>

            <div className="form-toggle-group">
              <span className="form-toggle-label">Bật hiệu ứng chuyển động sóng âm khi phát</span>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={voiceConfig.enableAnimation}
                onChange={(e) => handleVoiceChange('enableAnimation', e.target.checked)}
              />
            </div>

            {/* Nút hành động */}
            <div className="form-action-bar">
              <button className="btn-cinema" onClick={handleSaveVoiceConfig}>
                <Save size={15} />
                <span>Lưu Cấu Hình</span>
              </button>

              <button className="btn-cinema-subtle" onClick={handleReset}>
                <RotateCcw size={14} />
                <span>Khôi Phục Mặc Định</span>
              </button>
            </div>
          </div>

          {/* Cột phải: Live Preview */}
          <div className="editor-preview-panel">
            <div className="editor-preview-header">
              <span className="preview-badge">Xem Trước Trực Tiếp</span>
              <span style={{ fontSize: '0.72rem', color: '#666' }}>Cập nhật theo thời gian thực</span>
            </div>

            <div className="live-preview-box">
              <VoicePlayer config={voiceConfig} />
            </div>

            <p style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: '#777', textAlign: 'center', fontStyle: 'italic' }}>
              Bấm nút tròn để nghe thử âm lượng, thời lượng và chuyển động sóng âm.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: NỘI DUNG BỨC THƯ */}
      {activeTab === 'letter' && (
        <div className="editor-form-panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="editor-panel-title" style={{ margin: 0 }}>Nội Dung & Nhịp Độ Bức Thư</h2>
            <button className="btn-cinema" onClick={handleSaveLetter}>
              <Save size={14} />
              <span>Lưu Bức Thư</span>
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem' }}>
            Mỗi dòng sẽ được gõ ra từng chữ một. Bạn có thể sửa nội dung lời nói, tốc độ gõ (ms mỗi ký tự) và thời gian dừng trước khi qua câu tiếp theo.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {letterSections.map((sec, idx) => (
              <div
                key={sec.id || idx}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid #222',
                  padding: '1.25rem',
                  borderRadius: '2px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase' }}>
                    Câu #{idx + 1} ({sec.style})
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#666' }}>
                    Tốc độ: {sec.speed}ms | Dừng: {sec.pause}ms
                  </span>
                </div>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '60px' }}
                  value={sec.text}
                  onChange={(e) => handleSectionTextChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ALBUM KỶ NIỆM */}
      {activeTab === 'gallery' && (
        <div className="editor-form-panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="editor-panel-title" style={{ margin: 0 }}>Hình Ảnh & Chú Thích Kỷ Niệm</h2>
            <button className="btn-cinema" onClick={handleSaveMemories}>
              <Save size={14} />
              <span>Lưu Album</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {memories.map((mem, idx) => (
              <div
                key={mem.id || idx}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid #222',
                  padding: '1.25rem',
                  borderRadius: '2px',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '1.25rem'
                }}
              >
                <div>
                  <img
                    src={mem.image}
                    alt={mem.title}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      objectFit: 'cover',
                      border: '1px solid #333'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#666', display: 'block', marginTop: '4px', textAlign: 'center' }}>
                    {mem.role === 'hero' ? 'Ảnh Lớn Chủ Đạo' : 'Ảnh Kỷ Niệm'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label className="form-label">Tên Kỷ Niệm</label>
                    <input
                      type="text"
                      className="form-input"
                      value={mem.title}
                      onChange={(e) => handleMemoryChange(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Dòng Chú Thích (Caption)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={mem.caption}
                      onChange={(e) => handleMemoryChange(idx, 'caption', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Đường Dẫn Ảnh (ví dụ: /images/memory-01.jpg)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={mem.image}
                      onChange={(e) => handleMemoryChange(idx, 'image', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CAO TRÀO TỎ TÌNH */}
      {activeTab === 'confession' && (
        <div className="editor-form-panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="editor-panel-title" style={{ margin: 0 }}>Lời Tỏ Tình Cao Trào</h2>
            <button className="btn-cinema" onClick={handleSaveConfession}>
              <Save size={14} />
              <span>Lưu Lời Tỏ Tình</span>
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem' }}>
            Những dòng này sẽ xuất hiện chậm rãi và trang trọng nhất ở cao trào của website.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {confessionData.lines.map((line, idx) => (
              <div
                key={idx}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid #222',
                  padding: '1.25rem',
                  borderRadius: '2px'
                }}
              >
                <label className="form-label">Dòng #{idx + 1}</label>
                <input
                  type="text"
                  className="form-input"
                  value={line}
                  onChange={(e) => handleConfessionLineChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: XUẤT MÃ & TRIỂN KHAI */}
      {activeTab === 'export' && (
        <div className="editor-form-panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 className="editor-panel-title">Trợ Lý Triển Khai Production</h2>
          <p style={{ fontSize: '0.85rem', color: '#999', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Khi đưa trang web lên Vercel, Netlify hoặc GitHub Pages, bạn có thể sao chép đoạn mã bên dưới và dán vào các file dữ liệu trong thư mục <code>src/data/</code> để nội dung được lưu vĩnh viễn cho tất cả thiết bị xem.
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
            <button className="btn-cinema-subtle" onClick={handleCopyCode}>
              {copiedCode ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedCode ? 'Đã Sao Chép Vào Bộ Nhớ Tạm!' : 'Sao Chép Mã Cấu Hình'}</span>
            </button>
          </div>

          <pre className="code-export-box">{generateExportCode()}</pre>

          <div className="warning-box" style={{ marginTop: '1.5rem' }}>
            <p><strong>Các bước hoàn thiện trước khi gửi:</strong></p>
            <ol style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
              <li>Đặt ảnh thật của hai bạn vào thư mục <code>public/images/</code> (memory-01.jpg, memory-02.jpg...).</li>
              <li>Đặt file giọng đọc thư vào <code>public/audio/letter-narration.mp3</code>.</li>
              <li>Đặt file ghi âm chính vào <code>public/audio/voice-letter.mp3</code>.</li>
              <li>Chạy lệnh <code>npm run build</code> để kiểm tra.</li>
              <li>Đẩy lên Vercel hoặc Netlify và gửi link cho cô ấy mở trên điện thoại!</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
