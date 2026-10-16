import React, { useState, useEffect, useRef } from 'react';
import { Lock, User, KeyRound, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import '../styles/login.css';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const usernameInputRef = useRef(null);

  useEffect(() => {
    // Tự động focus vào ô tài khoản khi load trang
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');

    const trimmedUser = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!trimmedUser) {
      setError('Vui lòng nhập tài khoản.');
      return;
    }
    if (!cleanPassword) {
      setError('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);

    // Xử lý đăng nhập với tài khoản: dat, mật khẩu: huynhphoinhi
    setTimeout(() => {
      if (trimmedUser === 'dat' && cleanPassword === 'huynhphoinhi') {
        try {
          localStorage.setItem('love_letter_auth', 'true');
        } catch (err) {
          console.warn('[Login] localStorage write error:', err);
        }
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon-badge" aria-hidden="true">
            <Lock size={20} />
          </div>
          <span className="login-eyebrow">Private</span>
          <h1 className="login-title">for u</h1>
          <p className="login-subtitle">Login</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error-alert" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="login-field">
            <label className="login-label" htmlFor="login-username">
              <User size={13} />
              <span>Tài khoản</span>
            </label>
            <div className="login-input-wrapper">
              <input
                id="login-username"
                ref={usernameInputRef}
                type="text"
                autoComplete="username"
                className="login-input"
                placeholder="Nhập tài khoản (vd: dat)"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">
              <KeyRound size={13} />
              <span>Mật khẩu</span>
            </label>
            <div className="login-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="login-input"
                placeholder="Nhập mật khẩu "
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Đang mở khóa...' : 'Mở '}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="login-footer-note">
          "From Dat with love."
        </p>
      </div>
    </div>
  );
}
