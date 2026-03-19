import { useTranslation } from '../i18n/LanguageContext';
import { Home, PlusCircle, Map, User } from 'lucide-react';

export default function BottomNav({ activePage, onNavigate }) {
  const { t } = useTranslation();

  const items = [
    { id: 'home', icon: Home, label: t('nav_home') },
    { id: 'report', icon: PlusCircle, label: t('nav_report') },
    { id: 'map', icon: Map, label: t('nav_map') },
    { id: 'profile', icon: User, label: t('nav_profile') },
  ];

  return (
    <nav className="bottom-nav">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
