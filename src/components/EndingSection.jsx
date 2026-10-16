import React from 'react';
import { RotateCcw } from 'lucide-react';
import '../styles/ending.css';

export default function EndingSection({ data = {}, onRestart }) {
  const {
    credits = [
      "Giờ thì có danh phận",
      "Qúa là ngon, mình muốn đập bồ mình một cái.",
      "Má thề tự nhiên nghĩ ra cái này sến vcl mà chịu khó coi đi ha Nhi . Hết cách ròi bé"
    ],
    signOff = "iu em =)))",
    date = "Tháng 10, 2026",
    restartButtonText = "ĐỌC LẠI TỪ ĐẦU"
  } = data;

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="ending-section" id="coda-ending">
      <div className="ending-credits">
        {credits.map((line, idx) => (
          <p key={idx} className="ending-credit-line">
            "{line}"
          </p>
        ))}
      </div>

      <div className="ending-signoff-box">
        <h4 className="ending-signoff">{signOff}</h4>
        <p className="ending-date">{date}</p>
      </div>

      <div className="ending-actions">
        <button
          className="btn-cinema"
          onClick={handleRestart}
          aria-label="Đọc lại bức thư từ đầu"
        >
          <RotateCcw size={15} />
          <span>{restartButtonText}</span>
        </button>
      </div>

      <div className="ending-footer-meta">
        <span>Dat</span>
        <span>•</span>
        <a href="#/editor" className="ending-editor-link">
          ......
        </a>
      </div>
    </footer>
  );
}
