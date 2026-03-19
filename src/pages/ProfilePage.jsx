import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { getUser, getMyReports, logoutUser, formatTimeAgo } from '../data/store';
import StatusBadge from '../components/StatusBadge';
import CategoryIcon from '../components/CategoryIcon';
import { Phone, LogOut, FileText, ChevronRight } from 'lucide-react';

export default function ProfilePage({ onLogout, onViewDetail }) {
  const { t } = useTranslation();
  const user = getUser();
  const myReports = getMyReports();

  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  return (
    <div className="profile-page fade-in">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          <span>👤</span>
        </div>
        <div className="profile-info">
          <span className="profile-phone-label">{t('profile_phone')}</span>
          <span className="profile-phone">{user?.phone || 'N/A'}</span>
        </div>
      </div>

      {/* My Reports */}
      <div className="profile-section">
        <h3 className="section-title">
          <FileText size={18} />
          {t('profile_my_reports')}
          <span className="report-count">{myReports.length}</span>
        </h3>

        {myReports.length === 0 ? (
          <div className="empty-reports">
            <p>No reports yet. Start reporting issues in your area!</p>
          </div>
        ) : (
          <div className="my-reports-list">
            {myReports.map(report => {
              const timeAgo = formatTimeAgo(report.createdAt);
              return (
                <div
                  key={report.id}
                  className="my-report-item"
                  onClick={() => onViewDetail(report.id)}
                >
                  <CategoryIcon category={report.category} size={16} />
                  <div className="my-report-info">
                    <span className="my-report-title">{report.title}</span>
                    <span className="my-report-time">
                      {timeAgo.value} {t(timeAgo.key)}
                    </span>
                  </div>
                  <StatusBadge status={report.status} />
                  <ChevronRight size={16} className="chevron" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Logout */}
      <button className="btn btn-logout" onClick={handleLogout} id="logout-btn">
        <LogOut size={18} />
        {t('profile_logout')}
      </button>
    </div>
  );
}
