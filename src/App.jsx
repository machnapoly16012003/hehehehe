import React, { useState, useEffect, useMemo } from 'react';
import LetterPage from './pages/LetterPage';
import EditorPage from './pages/EditorPage';
import LoginPage from './pages/LoginPage';
import { LogOut } from 'lucide-react';
import './styles/global.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('love_letter_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash === '#/editor' || path === '/editor') {
      return 'editor';
    }
    return 'letter';
  });

  const handleLogout = () => {
    try {
      localStorage.removeItem('love_letter_auth');
    } catch (e) {
      console.warn(e);
    }
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#/editor' || path === '/editor') {
        setCurrentRoute('editor');
      } else {
        setCurrentRoute('letter');
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Tạo tập hợp 65 hạt bụi phát sáng phân bổ tự nhiên
  const particles = useMemo(() => {
    const sizeClasses = ['size-small', 'size-small', 'size-medium', 'size-small', 'size-large'];
    const animClasses = ['anim-sway-right', 'anim-sway-gentle', 'anim-sway-left', 'anim-sway-gentle'];

    return Array.from({ length: 65 }, (_, i) => {
      const sizeClass = sizeClasses[i % sizeClasses.length];
      const animClass = animClasses[i % animClasses.length];
      const leftPercent = ((i * 1.57 + 1.8) * 17) % 100;
      const duration = 12 + (i % 8) * 2; // 12s - 26s
      const delay = -((i * 0.48) % duration); // Negative delay để phủ kín màn hình ngay khi tải
      const opacity = 0.25 + (i % 6) * 0.1;

      return {
        id: i,
        sizeClass,
        animClass,
        style: {
          left: `${leftPercent.toFixed(1)}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay.toFixed(1)}s`,
          '--p-opacity': opacity.toFixed(2)
        }
      };
    });
  }, []);

  return (
    <div className="app-root">
      {/* 35mm Film Grain Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Cinematic Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Ambient Floating Dust Particles (Tăng mật độ hạt bay lên) */}
      <div className="ambient-dust" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`dust-particle ${p.sizeClass} ${p.animClass}`}
            style={p.style}
          />
        ))}
      </div>

      {/* Màn hình đăng nhập nếu chưa xác thực */}
      {!isAuthenticated ? (
        <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <>
          {/* Main Routed Page */}
          {currentRoute === 'editor' ? <EditorPage /> : <LetterPage />}

          {/* Nút Đăng xuất tiện lợi */}
          <button
            className="logout-btn-floating"
            onClick={handleLogout}
            title="Đăng xuất khỏi trang kỷ niệm"
          >
            <LogOut size={13} />
            <span>Khóa trang</span>
          </button>
        </>
      )}
    </div>
  );
}
