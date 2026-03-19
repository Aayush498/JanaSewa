import { useState, useMemo } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { getGrievances, CATEGORIES } from '../data/store';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { STATUS_COLORS } from '../components/StatusBadge';
import CategoryIcon from '../components/CategoryIcon';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createColoredIcon(color) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
      background: ${color}; transform: rotate(-45deg);
      border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    "><div style="
      width: 10px; height: 10px; border-radius: 50%;
      background: white; position: absolute;
      top: 50%; left: 50%; transform: translate(-50%, -50%);
    "></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
}

export default function MapPage({ onViewDetail }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const grievances = getGrievances();

  const filtered = useMemo(() => {
    if (filter === 'all') return grievances;
    return grievances.filter(g => g.status === filter);
  }, [grievances, filter]);

  return (
    <div className="map-page">
      {/* Filter chips */}
      <div className="map-filters">
        {['all', 'pending', 'in_progress', 'resolved'].map(status => (
          <button
            key={status}
            className={`map-filter-chip ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
            style={filter === status && status !== 'all' ? { backgroundColor: STATUS_COLORS[status], borderColor: STATUS_COLORS[status] } : {}}
          >
            {status === 'all' ? t('dashboard_all') : t(`status_${status}`)}
          </button>
        ))}
      </div>

      <div className="map-container-full">
        <MapContainer
          center={[27.7000, 85.3240]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map(g => (
            <Marker
              key={g.id}
              position={[g.lat, g.lng]}
              icon={createColoredIcon(STATUS_COLORS[g.status] || '#6b7280')}
            >
              <Popup>
                <div className="map-popup">
                  <h4>{g.title}</h4>
                  <p className="popup-ward">{g.ward}</p>
                  <p className="popup-desc">{g.description.slice(0, 80)}...</p>
                  <button
                    className="popup-btn"
                    onClick={() => onViewDetail(g.id)}
                  >
                    View Details →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: STATUS_COLORS.pending }}></span>
          {t('status_pending')}
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: STATUS_COLORS.in_progress }}></span>
          {t('status_in_progress')}
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: STATUS_COLORS.resolved }}></span>
          {t('status_resolved')}
        </div>
      </div>
    </div>
  );
}
