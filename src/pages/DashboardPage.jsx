import { useState, useMemo } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { getGrievances, getStats, CATEGORIES } from '../data/store';
import GrievanceCard from '../components/GrievanceCard';
import { List, MapIcon, SlidersHorizontal, TrendingUp, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';

export default function DashboardPage({ onViewDetail, onSwitchToMap }) {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [wardFilter, setWardFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const allGrievances = getGrievances();
  const stats = getStats();

  const filtered = useMemo(() => {
    let result = [...allGrievances];

    if (statusFilter !== 'all') {
      result = result.filter(g => g.status === statusFilter);
    }
    if (categoryFilter !== 'all') {
      result = result.filter(g => g.category === categoryFilter);
    }
    if (wardFilter !== 'all') {
      result = result.filter(g => g.ward === wardFilter);
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      result.sort((a, b) => b.upvotes - a.upvotes);
    }

    return result;
  }, [allGrievances, statusFilter, categoryFilter, wardFilter, sortBy]);

  const wards = [...new Set(allGrievances.map(g => g.ward))].sort((a, b) => {
    const numA = parseInt(a.replace('Ward ', ''));
    const numB = parseInt(b.replace('Ward ', ''));
    return numA - numB;
  });

  return (
    <div className="dashboard-page">
      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-icon stat-total">
            <AlertCircle size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">{t('dashboard_total_reports')}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-resolved">
            <CheckCircle2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.resolvedRate}%</span>
            <span className="stat-label">{t('dashboard_resolved_rate')}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-active">
            <TrendingUp size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">{t('dashboard_active')}</span>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="status-tabs">
        {['all', 'pending', 'in_progress', 'resolved'].map(status => (
          <button
            key={status}
            className={`status-tab ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status === 'all' ? t('dashboard_all') : t(`dashboard_${status}`)}
            <span className="tab-count">
              {status === 'all'
                ? allGrievances.length
                : allGrievances.filter(g => g.status === status).length}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="dashboard-toolbar">
        <button
          className={`toolbar-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={16} />
          Filters
          <ChevronDown size={14} className={showFilters ? 'rotate-180' : ''} />
        </button>

        <div className="toolbar-right">
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="newest">{t('dashboard_sort_newest')}</option>
            <option value="upvotes">{t('dashboard_sort_upvotes')}</option>
          </select>
          <button className="toolbar-btn map-btn" onClick={onSwitchToMap}>
            <MapIcon size={16} />
            {t('dashboard_map_view')}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel fade-in">
          <div className="filter-group">
            <label className="filter-label">{t('dashboard_filter_category')}</label>
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="all">{t('dashboard_filter_all')}</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{t(`category_${cat}`)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">{t('dashboard_filter_ward')}</label>
            <select
              className="filter-select"
              value={wardFilter}
              onChange={e => setWardFilter(e.target.value)}
            >
              <option value="all">{t('dashboard_filter_all')}</option>
              {wards.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Grievance List */}
      <div className="grievance-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <AlertCircle size={48} />
            <p>{t('dashboard_no_reports')}</p>
          </div>
        ) : (
          filtered.map(g => (
            <GrievanceCard
              key={g.id}
              grievance={g}
              onClick={() => onViewDetail(g.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
