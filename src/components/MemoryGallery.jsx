import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { resolveAsset } from '../utils/assetHelper';
import '../styles/gallery.css';

function PhotoCard({ memory }) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = resolveAsset(memory.image);

  return (
    <div className={`photo-frame ${memory.role === 'secondary' ? 'secondary' : 'hero'} ${memory.aspectRatio === 'vertical' ? 'vertical' : ''}`}>
      <div className="photo-image-wrapper">
        {!imgError && imageSrc ? (
          <img
            src={imageSrc}
            alt={memory.title || memory.caption || 'Kỷ niệm'}
            className="photo-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="photo-placeholder">
            <Camera size={32} />
            <span className="photo-placeholder-text">
              {memory.title || 'Khoảnh Khắc Đẹp'}
            </span>
          </div>
        )}
      </div>

      <div className="photo-meta">
        <p className="photo-caption">{memory.caption}</p>
        <span className="photo-date">{memory.date || memory.title}</span>
      </div>
    </div>
  );
}

export default function MemoryGallery({ memories = [], header }) {
  const heroItem = memories.find((m) => m.role === 'hero') || memories[0];
  const secondaryItems = memories.filter((m) => m !== heroItem);

  return (
    <section className="gallery-section" id="memory-gallery">
      <div className="gallery-header">
        <span className="eyebrow">{header?.eyebrow || 'NHỮNG KỶ NIỆM ĐẸP NHẤT'}</span>
        <h2 className="gallery-title">{header?.title || 'MÁCH NAPOLY'}</h2>
        <p className="gallery-subtitle">
          {header?.subtitle || '0786679190'}
        </p>
      </div>

      <div className="gallery-grid">
        {heroItem && (
          <div className="gallery-hero-item">
            <PhotoCard memory={heroItem} />
          </div>
        )}

        {secondaryItems.length > 0 && (
          <div className="gallery-staggered-row">
            {secondaryItems.map((item, index) => (
              <div key={item.id || index}>
                <PhotoCard memory={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
