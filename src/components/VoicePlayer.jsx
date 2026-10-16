import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, AlertCircle, Music, Film } from 'lucide-react';
import { resolveAsset } from '../utils/assetHelper';
import '../styles/voice.css';

// Định dạng giây thành mm:ss
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

const NUM_BARS = 36;

// Chiều cao sóng âm thanh hữu cơ
const STATIC_BAR_HEIGHTS = Array.from({ length: NUM_BARS }, (_, i) => {
  const pos = i / NUM_BARS;
  const val =
    Math.sin(pos * Math.PI) * 0.7 +
    Math.sin(pos * Math.PI * 3.5) * 0.2 +
    Math.sin(pos * Math.PI * 7) * 0.1;
  return Math.max(15, Math.min(95, Math.floor(Math.abs(val) * 85) + 15));
});

export default function VoicePlayer({ config = {} }) {
  const {
    title = 'Cái voice khác nữa',
    description = 'Khúc này là sến vl ròi',
    caption = 'Ghi âm ủa anh.',
    trackName = 'voice2.mp4',
    sourceType = 'video',
    src = 'voice2.mp4',
    showWaveform = true,
    enableAnimation = true
  } = config;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showVideoFrame, setShowVideoFrame] = useState(false);

  const resolvedSrc = resolveAsset(src);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // Tham chiếu media đang hoạt động
  const mediaRef = sourceType === 'video' ? videoRef : audioRef;

  // Reset khi đổi src hoặc sourceType
  useEffect(() => {
    const el = mediaRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
      el.load();
    }
  }, [resolvedSrc, sourceType, mediaRef]);

  // Đồng bộ sự kiện media
  const handleTimeUpdate = () => {
    const el = mediaRef.current;
    if (el) {
      setCurrentTime(el.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const el = mediaRef.current;
    if (el) {
      setDuration(el.duration || 0);
      setHasError(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleError = () => {
    setIsPlaying(false);
    setHasError(true);
    setErrorMessage('Không thể phát file âm thanh. Vui lòng kiểm tra file hoặc tương tác với trang.');
  };

  const handleCanPlay = () => {
    setHasError(false);
  };

  const togglePlay = () => {
    const el = mediaRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      setHasError(false);
      el.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('[Audio Player] Play error:', err);
          setIsPlaying(false);
          setHasError(true);
          setErrorMessage('Không thể tự động phát. Vui lòng chạm vào màn hình để bắt đầu.');
        });
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    const el = mediaRef.current;
    if (el && !isNaN(newTime)) {
      el.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const progressRatio = duration > 0 ? currentTime / duration : 0;
  const currentBarIndex = Math.floor(progressRatio * NUM_BARS);

  return (
    <div className={`voice-player-card ${isPlaying ? 'is-playing' : ''}`}>
      {/* Media elements ẩn */}
      {sourceType === 'audio' ? (
        <audio
          ref={audioRef}
          src={resolvedSrc}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onError={handleError}
          onCanPlay={handleCanPlay}
        />
      ) : (
        <video
          ref={videoRef}
          src={resolvedSrc}
          playsInline
          preload="metadata"
          className="voice-video-element"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onError={handleError}
          onCanPlay={handleCanPlay}
        />
      )}

      {/* Thông tin track */}
      <div className="voice-track-info">
        <div className="voice-track-meta">
          <h3 className="voice-note-title">{title}</h3>
          <p className="voice-note-desc">{description}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {sourceType === 'video' && (
            <button
              type="button"
              className="voice-video-toggle-btn"
              onClick={() => setShowVideoFrame(!showVideoFrame)}
              title={showVideoFrame ? 'Ẩn khung hình video' : 'Xem khung hình video'}
            >
              <Film size={12} />
              <span>{showVideoFrame ? 'Ẩn video' : 'Xem video'}</span>
            </button>
          )}
          <div className="voice-source-badge" title="Định dạng nguồn">
            {sourceType === 'video' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Film size={12} /> Âm thanh từ Video
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Music size={12} /> Bản Ghi Âm Giọng Nói
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Điều khiển chính & Waveform */}
      <div className="voice-controls-row">
        <button
          className="voice-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Tạm dừng bản ghi âm' : 'Phát bản ghi âm'}
          title={isPlaying ? 'Tạm dừng' : 'Lắng nghe giọng nói của anh'}
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '3px' }} />}
        </button>

        {showWaveform && (
          <div className="voice-waveform-container" aria-hidden="true">
            {STATIC_BAR_HEIGHTS.map((h, i) => {
              const isPassed = i < currentBarIndex;
              const isCurrent = i === currentBarIndex;
              return (
                <div
                  key={i}
                  className={`waveform-bar ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''} ${
                    enableAnimation && isPlaying ? 'active-anim' : ''
                  }`}
                  style={{
                    height: `${h}%`,
                    animationDelay: `${(i % 5) * 0.15}s`
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Thanh tua & Thời gian */}
      <div className="voice-progress-row">
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="voice-seek-slider"
          aria-label="Thanh tua âm thanh"
        />
        <div className="voice-time-display">
          <span>{formatTime(currentTime)}</span>
          <span style={{ fontStyle: 'italic', color: '#666' }}>{trackName}</span>
          <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
        </div>
      </div>

      {/* Thông báo lỗi nếu có */}
      {hasError && (
        <div className="voice-status-notice">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Khung video trực quan nếu người dùng bật xem video */}
      {sourceType === 'video' && showVideoFrame && (
        <div className="voice-video-preview-box">
          <video
            src={resolvedSrc}
            controls
            playsInline
            className="voice-video-frame"
          />
        </div>
      )}

      {/* Dòng chú thích bên dưới */}
      {caption && <p className="voice-caption">"{caption}"</p>}
    </div>
  );
}
