import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import '../styles/confession.css';

export default function ConfessionSection({ data = {} }) {
  const {
    subtitle = "Anh nghĩ là giờ anh phải nói",
    lines = [
      "Mình cũng là may vcl may mới qlai được",
      "Nên là kh muốn về nhì nữa ",
      "1 là em có 2 là em dạ có . DUNG DE THANG NAY NONG"
    ],
    responses = []
  } = data;

  const [visibleLines, setVisibleLines] = useState([false, false, false]);
  const [showResponses, setShowResponses] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [customNote, setCustomNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const sectionRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // Kích hoạt xuất hiện từng câu khi cuộn đến vùng nhìn thấy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;

          // Dòng 1
          setTimeout(() => setVisibleLines([true, false, false]), 400);
          // Dòng 2
          setTimeout(() => setVisibleLines([true, true, false]), 1800);
          // Dòng 3 (câu hỏi quan trọng nhất)
          setTimeout(() => setVisibleLines([true, true, true]), 3400);
          // Các nút phản hồi
          setTimeout(() => setShowResponses(true), 4600);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSelectResponse = (resp) => {
    setSelectedResponse(resp);
    try {
      localStorage.setItem('love_letter_response_choice', JSON.stringify(resp));
    } catch (e) {
      console.warn('Could not save choice', e);
    }
  };

  const handleSaveNote = () => {
    if (!customNote.trim()) return;
    try {
      localStorage.setItem('love_letter_user_note', customNote);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 3000);
    } catch (e) {
      console.warn('Could not save note', e);
    }
  };

  return (
    <section className="confession-section" ref={sectionRef} id="confession-climax">
      <p className="confession-eyebrow">{subtitle}</p>

      <div className="confession-lines">
        {lines[0] && (
          <p className={`confession-line core ${visibleLines[0] ? 'visible' : ''}`}>
            {lines[0]}
          </p>
        )}

        {lines[1] && (
          <p className={`confession-line affirmation ${visibleLines[1] ? 'visible' : ''}`}>
            {lines[1]}
          </p>
        )}

        {lines[2] && (
          <h2 className={`confession-line question ${visibleLines[2] ? 'visible' : ''}`}>
            {lines[2]}
          </h2>
        )}
      </div>

      <div className={`confession-responses-container ${showResponses ? 'visible' : ''}`}>
        <div className="confession-buttons">
          {responses.map((resp) => {
            const isChosen = selectedResponse?.id === resp.id;
            return (
              <button
                key={resp.id}
                className={`confession-btn ${isChosen ? 'selected' : ''}`}
                onClick={() => handleSelectResponse(resp)}
              >
                {resp.label}
              </button>
            );
          })}
        </div>

        {/* Khung phản hồi cảm xúc khi cô ấy chọn */}
        {selectedResponse && (
          <div className="confession-reply-card">
            <span className="reply-badge">{selectedResponse.badge || 'Một khoảnh khắc êm đềm'}</span>
            <p className="reply-title">{selectedResponse.responseTitle}</p>
            <p className="reply-body">"{selectedResponse.responseMessage}"</p>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Này làm cho dui, hong có data hong có lưu đc:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '420px', margin: '0 auto' }}>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Em muốn nói gì hăm, viết xong để im ii..."
                  style={{
                    flex: 1,
                    background: '#000',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.85rem',
                    borderRadius: '2px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSaveNote}
                  className="btn-cinema-subtle"
                  style={{ padding: '0.6rem 1rem' }}
                >
                  {noteSaved ? <Check size={14} /> : 'Lưu lại'}
                </button>
              </div>
              {noteSaved && (
                <p style={{ fontSize: '0.72rem', color: '#d8d8d8', marginTop: '0.5rem' }}>
                  Lời nhắn của em đã được lưu giữ rồi nhé.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
