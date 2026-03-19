import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { getGrievanceById, upvoteGrievance, hasUpvoted, formatTimeAgo } from '../data/store';
import StatusBadge, { STATUS_COLORS } from '../components/StatusBadge';
import CategoryIcon from '../components/CategoryIcon';
import { ThumbsUp, MapPin, Clock, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const STATUS_ORDER = ['pending', 'in_progress', 'resolved'];

export default function DetailPage({ grievanceId, onBack }) {
  const { t } = useTranslation();
  const [grievance, setGrievance] = useState(null);
  const [voted, setVoted] = useState(false);
  const [justVoted, setJustVoted] = useState(false);

  useEffect(() => {
    const g = getGrievanceById(grievanceId);
    setGrievance(g);
    setVoted(hasUpvoted(grievanceId));
  }, [grievanceId]);

  if (!grievance) {
    return (
      <div className="detail-page">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} /> {t('detail_back')}
        </button>
        <p>Loading...</p>
      </div>
    );
  }

  const handleUpvote = () => {
    if (voted) return;
    const success = upvoteGrievance(grievanceId);
    if (success) {
      setVoted(true);
      setJustVoted(true);
      setGrievance(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
      setTimeout(() => setJustVoted(false), 600);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: grievance.title,
        text: `${grievance.title} - JanaSewa`,
        url: window.location.href
      }).catch(() => {});
    }
  };

  const timeAgo = formatTimeAgo(grievance.createdAt);
  const currentStatusIdx = STATUS_ORDER.indexOf(grievance.status);

  return (
    <div className="detail-page fade-in">
      <button className="back-btn" onClick={onBack} id="detail-back-btn">
        <ArrowLeft size={20} /> {t('detail_back')}
      </button>

      {/* Photo */}
      {grievance.photo && (
        <div className="detail-photo">
          <img src={grievance.photo} alt={grievance.title} />
        </div>
      )}

      {/* Header */}
      <div className="detail-header">
        <div className="detail-category-row">
          <CategoryIcon category={grievance.category} size={18} />
          <span className="detail-category-text">{t(`category_${grievance.category}`)}</span>
          <StatusBadge status={grievance.status} />
        </div>
        <h2 className="detail-title">{grievance.title}</h2>
        <div className="detail-meta">
          <span><Clock size={14} /> {timeAgo.value} {t(timeAgo.key)}</span>
          <span><MapPin size={14} /> {grievance.ward}</span>
        </div>
      </div>

      {/* Status Stepper */}
      <div className="status-stepper">
        <h3 className="section-title">{t('detail_status')}</h3>
        <div className="stepper">
          {STATUS_ORDER.map((status, idx) => {
            const isCompleted = idx <= currentStatusIdx;
            const historyEntry = grievance.statusHistory?.find(h => h.status === status);
            return (
              <div key={status} className={`step ${isCompleted ? 'completed' : ''}`}>
                <div className="step-indicator" style={{ borderColor: isCompleted ? STATUS_COLORS[status] : '#334155' }}>
                  {isCompleted ? (
                    <CheckCircle size={20} color={STATUS_COLORS[status]} />
                  ) : (
                    <div className="step-dot"></div>
                  )}
                </div>
                <div className="step-content">
                  <span className="step-label" style={{ color: isCompleted ? STATUS_COLORS[status] : '#64748b' }}>
                    {t(`status_${status}`)}
                  </span>
                  {historyEntry && (
                    <span className="step-date">
                      {new Date(historyEntry.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {idx < STATUS_ORDER.length - 1 && (
                  <div className="step-line" style={{ backgroundColor: isCompleted && idx < currentStatusIdx ? STATUS_COLORS[status] : '#334155' }}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="detail-section">
        <h3 className="section-title">{t('detail_description')}</h3>
        <p className="detail-description">{grievance.description}</p>
      </div>

      {/* Map */}
      <div className="detail-section">
        <h3 className="section-title">{t('detail_location')}</h3>
        <div className="detail-map">
          <MapContainer
            center={[grievance.lat, grievance.lng]}
            zoom={15}
            style={{ height: '180px', width: '100%', borderRadius: '12px' }}
            scrollWheelZoom={false}
            dragging={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[grievance.lat, grievance.lng]} />
          </MapContainer>
        </div>
      </div>

      {/* Actions */}
      <div className="detail-actions">
        <button
          className={`btn btn-upvote ${voted ? 'upvoted' : ''} ${justVoted ? 'pulse' : ''}`}
          onClick={handleUpvote}
          disabled={voted}
          id="upvote-btn"
        >
          <ThumbsUp size={20} />
          <span className="upvote-count">{grievance.upvotes}</span>
          <span>{voted ? t('detail_upvoted') : t('detail_upvote')}</span>
        </button>
        <button className="btn btn-share" onClick={handleShare}>
          <Share2 size={20} />
          {t('detail_share')}
        </button>
      </div>
    </div>
  );
}
