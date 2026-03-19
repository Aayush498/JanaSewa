import { useTranslation } from '../i18n/LanguageContext';

const STATUS_COLORS = {
  pending: '#f59e0b',
  in_progress: '#3b82f6',
  resolved: '#10b981'
};

export default function StatusBadge({ status }) {
  const { t } = useTranslation();

  const labels = {
    pending: t('status_pending'),
    in_progress: t('status_in_progress'),
    resolved: t('status_resolved')
  };

  return (
    <span
      className="status-badge"
      style={{
        '--badge-color': STATUS_COLORS[status] || '#6b7280'
      }}
    >
      <span className="status-dot"></span>
      {labels[status] || status}
    </span>
  );
}

export { STATUS_COLORS };
