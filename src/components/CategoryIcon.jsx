import {
  Construction, Droplets, Zap, Trash2, Waves, HelpCircle
} from 'lucide-react';

const CATEGORY_CONFIG = {
  road: { icon: Construction, color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
  water: { icon: Droplets, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  electricity: { icon: Zap, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  garbage: { icon: Trash2, color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  drainage: { icon: Waves, color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  other: { icon: HelpCircle, color: '#6b7280', bg: 'rgba(107,114,128,0.15)' }
};

export default function CategoryIcon({ category, size = 20, showBg = true }) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other;
  const Icon = config.icon;

  if (!showBg) {
    return <Icon size={size} color={config.color} />;
  }

  return (
    <div
      className="category-icon"
      style={{
        backgroundColor: config.bg,
        color: config.color
      }}
    >
      <Icon size={size} />
    </div>
  );
}

export { CATEGORY_CONFIG };
