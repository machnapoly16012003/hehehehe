import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/intro.css';

export default function Intro({ onOpenLetter, onStartOpen }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Hiện nút mở sau 1.8 giây để tạo khoảng lặng lắng đọng
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsFadingOut(true);
    if (onStartOpen) onStartOpen();
    setTimeout(() => {
      if (onOpenLetter) onOpenLetter();
    }, 600);
  };

  const handleSkip = () => {
    setIsFadingOut(true);
    if (onStartOpen) onStartOpen();
    setTimeout(() => {
      if (onOpenLetter) onOpenLetter();
    }, 200);
  };

  return (
    <div className={`intro-wrapper ${isFadingOut ? 'fading-out' : ''}`}>
      <div className="intro-content">
        <span className="intro-tagline">DEAR PHỐI NHI</span>
        
        <h1 className="intro-main-heading">
          LAN DAU<br />LAM CHUYEN DO CUA ĐẠT.
        </h1>

        <div className="intro-divider"></div>

        <p className="intro-subheading">
          from Dat with love !!!
        </p>

        <div className="intro-action-container">
          {showButton && (
            <button
              className="btn-cinema"
              onClick={handleOpen}
              aria-label="O BÈN"
            >
              <span>MỞ </span>
              <ArrowRight size={16} />
            </button>
          )}

          <button
            className="intro-skip-btn"
            onClick={handleSkip}
            title="Bỏ qua màn hình mở đầu"
          >
            Bỏ qua phần mở đầu
          </button>
        </div>
      </div>
    </div>
  );
}
