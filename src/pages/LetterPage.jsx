import React, { useState } from 'react';
import Intro from '../components/Intro';
import LetterSection from '../components/LetterSection';
import MemoryGallery from '../components/MemoryGallery';
import VoicePlayer from '../components/VoicePlayer';
import ConfessionSection from '../components/ConfessionSection';
import EndingSection from '../components/EndingSection';

import {
  getLetterSections,
  getLetterNarration,
  getMemories,
  getVoiceConfig,
  getConfessionData,
  getEndingData
} from '../utils/storage';
import { defaultGalleryHeader } from '../data/memories';
import { defaultVoiceHeader } from '../data/voiceConfig';

export default function LetterPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [autoPlayVoice, setAutoPlayVoice] = useState(false);
  const [sections] = useState(() => getLetterSections());
  const [narration] = useState(() => getLetterNarration());
  const [memories] = useState(() => getMemories());
  const [voiceConfig] = useState(() => getVoiceConfig());
  const [confessionData] = useState(() => getConfessionData());
  const [endingData] = useState(() => getEndingData());

  const handleStartOpen = () => {
    setAutoPlayVoice(true);
  };

  const handleOpenLetter = () => {
    setHasEntered(true);
    setAutoPlayVoice(true);
    // Cuộn mượt mà xuống phần bức thư
    setTimeout(() => {
      const el = document.getElementById('letter-content');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRestart = () => {
    setHasEntered(false);
    setAutoPlayVoice(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="letter-page-main">
      {/* Màn hình mở đầu Intro điện ảnh */}
      {!hasEntered && (
        <Intro
          onOpenLetter={handleOpenLetter}
          onStartOpen={handleStartOpen}
        />
      )}

      {/* Dòng chảy câu chuyện chính */}
      <div className={`story-container ${!hasEntered ? 'initially-hidden' : ''}`}>
        {/* Phần 5: Bức thư gõ chữ & Lời kể đồng bộ */}
        <LetterSection
          sections={sections}
          narration={narration}
          autoPlayNarration={autoPlayVoice}
        />

        <div className="thin-line" />

        {/* Phần 6: Album kỷ niệm */}
        <MemoryGallery memories={memories} header={defaultGalleryHeader} />

        <div className="thin-line" />

        {/* Phần 7: Bản thu giọng nói chính */}
        <section className="voice-section" id="voice-letter-section">
          <div className="voice-header">
            <span className="eyebrow">{defaultVoiceHeader.eyebrow}</span>
            <h2 className="voice-title">{defaultVoiceHeader.sectionTitle}</h2>
            <p className="voice-subtitle">{defaultVoiceHeader.sectionSubtitle}</p>
          </div>
          <VoicePlayer config={voiceConfig} />
        </section>

        <div className="thin-line" />

        {/* Phần 8: Cao trào tỏ tình */}
        <ConfessionSection data={confessionData} />

        <div className="thin-line" />

        {/* Phần 9: Phần kết & Credit */}
        <EndingSection data={endingData} onRestart={handleRestart} />
      </div>
    </main>
  );
}
