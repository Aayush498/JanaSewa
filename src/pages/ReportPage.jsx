import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { addGrievance, CATEGORIES, KATHMANDU_WARDS, getUser } from '../data/store';
import CategoryIcon from '../components/CategoryIcon';
import { Camera, MapPin, Navigation, Upload, CheckCircle, ChevronDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function LocationPicker({ position, onPositionChange }) {
  useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    }
  });
  return position ? <Marker position={position} /> : null;
}

export default function ReportPage({ onSuccess }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [position, setPosition] = useState(null);
  const [ward, setWard] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          // Default to Kathmandu center if GPS fails
          setPosition([27.7172, 85.3240]);
        }
      );
    } else {
      setPosition([27.7172, 85.3240]);
    }
  };

  const validate = () => {
    const errs = {};
    if (!category) errs.category = true;
    if (!title.trim()) errs.title = true;
    if (!description.trim()) errs.description = true;
    if (!ward) errs.ward = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const user = getUser();

    setTimeout(() => {
      addGrievance({
        title: title.trim(),
        description: description.trim(),
        category,
        ward,
        lat: position ? position[0] : 27.7172,
        lng: position ? position[1] : 85.3240,
        photo: photoPreview,
        reportedBy: user?.phone || 'anonymous'
      });

      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="report-success fade-in">
        <div className="success-animation">
          <CheckCircle size={80} />
        </div>
        <h2>{t('report_success')}</h2>
        <p>{t('report_success_msg')}</p>
        <button className="btn btn-primary btn-full" onClick={onSuccess}>
          {t('report_back_home')}
        </button>
      </div>
    );
  }

  return (
    <div className="report-page">
      <h2 className="page-title">{t('report_title')}</h2>

      <form onSubmit={handleSubmit} className="report-form">
        {/* Category Selection */}
        <div className="form-group">
          <label className="form-label">{t('report_category')}</label>
          <div className="category-grid">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                className={`category-btn ${category === cat ? 'selected' : ''} ${errors.category && !category ? 'error' : ''}`}
                onClick={() => { setCategory(cat); setErrors(prev => ({...prev, category: false})); }}
              >
                <CategoryIcon category={cat} size={22} />
                <span>{t(`category_${cat}`)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="form-group">
          <label className="form-label">{t('report_issue_title')}</label>
          <input
            type="text"
            className={`form-input ${errors.title ? 'input-error' : ''}`}
            placeholder={t('report_issue_title_placeholder')}
            value={title}
            onChange={e => { setTitle(e.target.value); setErrors(prev => ({...prev, title: false})); }}
            id="report-title-input"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">{t('report_description')}</label>
          <textarea
            className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
            placeholder={t('report_description_placeholder')}
            value={description}
            onChange={e => { setDescription(e.target.value); setErrors(prev => ({...prev, description: false})); }}
            rows={4}
            id="report-desc-input"
          />
        </div>

        {/* Photo */}
        <div className="form-group">
          <label className="form-label">{t('report_photo')}</label>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            style={{ display: 'none' }}
            id="photo-file-input"
          />
          {photoPreview ? (
            <div className="photo-preview" onClick={() => fileRef.current?.click()}>
              <img src={photoPreview} alt="Preview" />
              <div className="photo-overlay">
                <Camera size={24} />
              </div>
            </div>
          ) : (
            <div className="photo-upload-area" onClick={() => fileRef.current?.click()}>
              <Upload size={32} />
              <span>{t('report_add_photo')}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="form-label">
            <MapPin size={16} />
            {t('report_location')}
          </label>
          <button type="button" className="btn btn-secondary btn-gps" onClick={handleGPS}>
            <Navigation size={16} />
            {t('report_use_gps')}
          </button>
          <div className="map-container-report">
            <MapContainer
              center={position || [27.7172, 85.3240]}
              zoom={13}
              style={{ height: '200px', width: '100%', borderRadius: '12px' }}
              key={position ? position.join(',') : 'default'}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker position={position} onPositionChange={setPosition} />
            </MapContainer>
            <p className="map-hint">{t('report_tap_map')}</p>
          </div>
        </div>

        {/* Ward */}
        <div className="form-group">
          <label className="form-label">{t('report_ward')}</label>
          <div className="select-wrapper">
            <select
              className={`form-input form-select ${errors.ward ? 'input-error' : ''}`}
              value={ward}
              onChange={e => { setWard(e.target.value); setErrors(prev => ({...prev, ward: false})); }}
              id="ward-select"
            >
              <option value="">{t('report_select_ward')}</option>
              {KATHMANDU_WARDS.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            <ChevronDown size={16} className="select-arrow" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-full btn-submit"
          disabled={submitting}
          id="submit-report-btn"
        >
          {submitting ? t('report_submitting') : t('report_submit')}
        </button>
      </form>
    </div>
  );
}
