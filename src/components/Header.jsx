import { useTranslation } from '../i18n/LanguageContext';
import { Languages } from 'lucide-react';

export default function Header({ onBack, showBack }) {
  const { lang, toggleLanguage, t } = useTranslation();

  return (
    <header className="header">
      <div className="header-left">
        {showBack && (
          <button className="header-back-btn" onClick={onBack} aria-label="Back">
            ←
          </button>
        )}
        <div className="header-brand">
          <div className="header-logo">🏛️</div>
          <div>
            <h1 className="header-title">{t('app_name')}</h1>
            <p className="header-tagline">{t('app_tagline')}</p>
          </div>
        </div>
      </div>
      <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle language">
        <Languages size={18} />
        <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
      </button>
    </header>
  );
}
