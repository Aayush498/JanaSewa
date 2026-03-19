import { useTranslation } from '../i18n/LanguageContext';
import { ThumbsUp, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';
import CategoryIcon from './CategoryIcon';
import { formatTimeAgo } from '../data/store';

export default function GrievanceCard({ grievance, onClick }) {
  const { t } = useTranslation();
  const timeAgo = formatTimeAgo(grievance.createdAt);

  return (
    <article className="grievance-card" onClick={onClick} tabIndex={0} role="button">
      <div className="grievance-card-header">
        <CategoryIcon category={grievance.category} size={18} />
        <span className="grievance-category-label">{t(`category_${grievance.category}`)}</span>
        <StatusBadge status={grievance.status} />
      </div>

      <h3 className="grievance-card-title">{grievance.title}</h3>

      <p className="grievance-card-desc">
        {grievance.description.length > 100
          ? grievance.description.slice(0, 100) + '...'
          : grievance.description}
      </p>

      <div className="grievance-card-footer">
        <div className="grievance-card-meta">
          <span className="grievance-card-location">
            <MapPin size={14} />
            {grievance.ward}
          </span>
          <span className="grievance-card-time">
            {timeAgo.value} {t(timeAgo.key)}
          </span>
        </div>
        <div className="grievance-card-upvotes">
          <ThumbsUp size={14} />
          <span>{grievance.upvotes}</span>
        </div>
      </div>
    </article>
  );
}
