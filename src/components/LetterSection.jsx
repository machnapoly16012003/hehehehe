import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, BookOpen, Play, Pause, Film } from 'lucide-react';
import { resolveAsset } from '../utils/assetHelper';
import '../styles/letter.css';

function formatDuration(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function LetterSection({
  sections = [],
  narration = {},
  onCompleted,
  autoPlayNarration = false
}) {
  // Mảng chứa các câu đã gõ
  const [typedTexts, setTypedTexts] = useState(() => sections.map(() => ''));
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isInstant, setIsInstant] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Trạng thái Lời kể / Video voice
  const [isNarrating, setIsNarrating] = useState(false);
  const [narrationTime, setNarrationTime] = useState(0);
  const [narrationDuration, setNarrationDuration] = useState(0);
  const [showVideoFrame, setShowVideoFrame] = useState(false);

  const timerRef = useRef(null);
  const mediaRef = useRef(null);

  const rawSrc = narration?.src || '';
  const mediaSrc = resolveAsset(rawSrc);

  // Kiểm tra xem nguồn là video hay audio
  const isVideo =
    narration?.sourceType === 'video' ||
    Boolean(mediaSrc && (mediaSrc.includes('.mp4') || mediaSrc.includes('.webm') || mediaSrc.includes('.mov')));

  // Reset khi đổi nguồn
  useEffect(() => {
    const el = mediaRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }, [mediaSrc]);

  // Tự động phát khi người dùng bấm Mở từ Intro
  useEffect(() => {
    if (!autoPlayNarration) return;

    let isSubscribed = true;

    const playVoice = () => {
      const el = mediaRef.current;
      if (!el || !isSubscribed) return;

      const promise = el.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            if (isSubscribed) {
              setIsNarrating(true);
            }
          })
          .catch((err) => {
            console.warn('[Narration] Autoplay need gesture fallback:', err);
            // Fallback: nếu browser chặn do timing, bắt chạm đầu tiên của user để phát ngay
            const triggerOnInteraction = () => {
              if (mediaRef.current) {
                mediaRef.current.play().then(() => setIsNarrating(true)).catch(() => {});
              }
              window.removeEventListener('click', triggerOnInteraction);
              window.removeEventListener('touchstart', triggerOnInteraction);
            };
            window.addEventListener('click', triggerOnInteraction, { once: true });
            window.addEventListener('touchstart', triggerOnInteraction, { once: true });
          });
      }
    };

    // Đợi DOM render ổn định
    const t = setTimeout(playVoice, 120);

    return () => {
      isSubscribed = false;
      clearTimeout(t);
    };
  }, [autoPlayNarration, mediaSrc]);

  // Khởi động lại toàn bộ
  const handleRestart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const el = mediaRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setIsNarrating(false);
    setNarrationTime(0);
    setTypedTexts(sections.map(() => ''));
    setCurrentSectionIndex(0);
    setCurrentCharIndex(0);
    setIsInstant(false);
    setIsFinished(false);
  };

  // Đọc ngay lập tức
  const handleReadInstantly = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedTexts(sections.map((s) => s.text));
    setIsInstant(true);
    setIsFinished(true);
    if (onCompleted) onCompleted();
  };

  // Bật / Tắt lời kể đồng bộ
  const toggleNarration = () => {
    const el = mediaRef.current;
    if (!el) return;

    if (isNarrating) {
      el.pause();
      setIsNarrating(false);
    } else {
      el.play()
        .then(() => {
          setIsNarrating(true);
          // Nếu bức thư đã kết thúc hoặc đang ở chế độ đọc tức thì, cho gõ lại từ đầu để đồng bộ với âm thanh
          if (isFinished || isInstant) {
            handleRestart();
            setTimeout(() => {
              if (mediaRef.current) {
                mediaRef.current.play();
                setIsNarrating(true);
              }
            }, 60);
          }
        })
        .catch((err) => {
          console.warn('[Narration] Playback error:', err);
        });
    }
  };

  // Đồng bộ sự kiện media
  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setNarrationTime(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setNarrationDuration(mediaRef.current.duration || 0);
    }
  };

  const handleCanPlay = () => {
    if (autoPlayNarration && !isNarrating && mediaRef.current) {
      mediaRef.current.play().then(() => setIsNarrating(true)).catch(() => {});
    }
  };

  const handleEnded = () => {
    setIsNarrating(false);
  };

  // Động cơ gõ chữ typewriter
  useEffect(() => {
    if (isInstant || isFinished || !sections || sections.length === 0) return;

    if (currentSectionIndex >= sections.length) {
      const endTimer = setTimeout(() => {
        setIsFinished(true);
        if (onCompleted) onCompleted();
      }, 0);
      return () => clearTimeout(endTimer);
    }

    const currentSection = sections[currentSectionIndex];
    const fullText = currentSection.text || '';
    const speed = currentSection.speed || 60;
    const pause = currentSection.pause || 1200;

    if (currentCharIndex < fullText.length) {
      // Gõ ký tự tiếp theo
      timerRef.current = setTimeout(() => {
        setTypedTexts((prev) => {
          const updated = [...prev];
          updated[currentSectionIndex] = fullText.slice(0, currentCharIndex + 1);
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);
    } else {
      // Hoàn tất câu hiện tại, chờ một nhịp rồi sang câu tiếp theo
      timerRef.current = setTimeout(() => {
        setCurrentSectionIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, pause);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSectionIndex, currentCharIndex, isInstant, isFinished, sections, onCompleted]);

  return (
    <section className="letter-section" id="letter-content">
      {/* Media element phát âm thanh (Hỗ trợ cả Video và Audio) */}
      {mediaSrc && (
        isVideo ? (
          <video
            ref={mediaRef}
            src={mediaSrc}
            playsInline
            preload="auto"
            className={showVideoFrame ? 'narration-video-player' : 'narration-video-media-hidden'}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            onEnded={handleEnded}
          />
        ) : (
          <audio
            ref={mediaRef}
            src={mediaSrc}
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            onEnded={handleEnded}
          />
        )
      )}

      <div className="letter-header">
        <span className="eyebrow">Một chút nhảm</span>
        <h2 className="chapter-title">BẮT BUỘC PHẢI COI</h2>
      </div>

      <div className="letter-controls">
        {!isFinished && (
          <button
            className="btn-cinema-subtle"
            onClick={handleReadInstantly}
            title="Hiển thị ngay lập tức toàn bộ nội dung"
          >
            <BookOpen size={13} />
            <span>Đọc Ngay</span>
          </button>
        )}
        <button
          className="btn-cinema-subtle"
          onClick={handleRestart}
          title="Chạy lại câu chuyện từ đầu"
        >
          <RotateCcw size={13} />
          <span>Đọc Lại</span>
        </button>
      </div>

      {/* Khung giấy thư kiểu typewriter */}
      <div className="letter-paper">
        <div className="letter-lines-container">
          {sections.map((sec, idx) => {
            const hasStarted = idx <= currentSectionIndex || isInstant;
            if (!hasStarted) return null;

            const textToDisplay = isInstant
              ? sec.text
              : typedTexts[idx] || '';

            const isCurrentlyTyping = !isInstant && !isFinished && idx === currentSectionIndex;

            return (
              <div
                key={sec.id || idx}
                className={`letter-line style-${sec.style || 'normal'} align-${sec.align || 'left'}`}
              >
                <span>{textToDisplay}</span>
                {isCurrentlyTyping && <span className="typewriter-cursor" aria-hidden="true" />}
              </div>
            );
          })}
        </div>

        <div className="letter-status-bar">
          <span>{isFinished ? 'Loading' : '........'}</span>
          <span>{sections.length} dòng tâm sự</span>
        </div>
      </div>

      {/* THANH GHI ÂM LỜI KỂ ĐỒNG BỘ DƯỚI BỨC THƯ (Movie Title Voiceover) */}
      {narration?.enabled && (
        <div className="letter-narration-wrapper">
          <div className={`letter-narration-bar ${isNarrating ? 'is-narrating' : ''}`}>
            <div className="narration-left">
              <button
                className="narration-play-btn"
                onClick={toggleNarration}
                aria-label={isNarrating ? 'Tạm dừng giọng đọc' : 'Phát giọng đọc của anh'}
                title={isNarrating ? 'Tạm dừng' : 'Bật giọng đọc để nghe anh kể câu chuyện này'}
              >
                {isNarrating ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
              </button>

              <div className="narration-info">
                <span className="narration-title">
                  {narration.title || 'My voice'}
                  <span className="narration-badge">
                    {isVideo ? 'hehee' : 'Lời Kể Điện Ảnh'}
                  </span>
                </span>
                <span className="narration-subtitle">
                  {narration.subtitle || 'Nhấn phát để vừa nghe anh đọc, vừa xem từng dòng thư hiện ra như phim'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {isVideo && (
                <button
                  className="narration-video-toggle-btn"
                  onClick={() => setShowVideoFrame(!showVideoFrame)}
                  title={showVideoFrame ? 'Thu gọn khung video' : 'Xem khung hình video'}
                >
                  <Film size={13} />
                  <span>{showVideoFrame ? 'Ẩn video' : 'Xem video'}</span>
                </button>
              )}

              <div className="narration-waveform" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="mini-bar"
                    style={{
                      animationDelay: `${(i % 4) * 0.2}s`,
                      height: isNarrating ? `${8 + (i % 5) * 3}px` : '4px'
                    }}
                  />
                ))}
              </div>

              <span className="narration-time">
                {formatDuration(narrationTime)} / {narrationDuration > 0 ? formatDuration(narrationDuration) : '--:--'}
              </span>
            </div>
          </div>

          {/* Khung video xem trước (nếu người dùng bấm Xem video) */}
          {isVideo && showVideoFrame && (
            <div className="narration-video-preview">
              {/* Thẻ video được hiển thị trực tiếp */}
              <video
                src={mediaSrc}
                controls
                playsInline
                className="narration-video-player"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
