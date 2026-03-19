import { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { loginUser } from '../data/store';
import { Phone, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const { t } = useTranslation();
  const [step, setStep] = useState('phone'); // phone | otp | success
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    setError('');
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setStep('otp');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    if (otp.length !== 4) {
      setError('Please enter a 4-digit OTP code');
      return;
    }
    const fullPhone = `+977-${phone}`;
    loginUser(fullPhone);
    setStep('success');
    setTimeout(() => onLogin(), 1200);
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-logo-container">
          <div className="login-logo">🏛️</div>
          <div className="login-logo-ring"></div>
        </div>
        <h1 className="login-title">{t('login_title')}</h1>
        <p className="login-subtitle">{t('login_subtitle')}</p>
      </div>

      <div className="login-card">
        {step === 'phone' && (
          <form onSubmit={handleSendOTP} className="login-form fade-in">
            <label className="form-label">
              <Phone size={16} />
              {t('login_phone_label')}
            </label>
            <div className="phone-input-group">
              <span className="phone-prefix">+977</span>
              <input
                type="tel"
                className="form-input"
                placeholder={t('login_phone_placeholder')}
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
                autoFocus
                id="phone-input"
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary btn-full" id="send-otp-btn">
              {t('login_send_otp')}
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerify} className="login-form fade-in">
            <p className="otp-sent-msg">
              {t('login_otp_sent')} <strong>+977-{phone}</strong>
            </p>
            <button type="button" className="link-btn" onClick={() => setStep('phone')}>
              {t('login_change_number')}
            </button>
            <label className="form-label">
              <Shield size={16} />
              {t('login_otp_label')}
            </label>
            <input
              type="tel"
              className="form-input otp-input"
              placeholder={t('login_otp_placeholder')}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              autoFocus
              id="otp-input"
            />
            <p className="otp-hint">{t('login_any_otp')}</p>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary btn-full" id="verify-btn">
              {t('login_verify')}
              <CheckCircle size={18} />
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="login-success fade-in">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>✓</h2>
          </div>
        )}
      </div>

      <div className="login-footer">
        <p>Kathmandu Metropolitan City</p>
      </div>
    </div>
  );
}
