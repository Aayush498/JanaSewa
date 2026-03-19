import { useState, useCallback } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { getUser } from './data/store';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';
import DetailPage from './pages/DetailPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getUser());
  const [activePage, setActivePage] = useState('home');
  const [detailId, setDetailId] = useState(null);
  const [pageKey, setPageKey] = useState(0);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setActivePage('home');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const handleViewDetail = useCallback((id) => {
    setDetailId(id);
    setActivePage('detail');
  }, []);

  const handleBack = useCallback(() => {
    setDetailId(null);
    setActivePage('home');
  }, []);

  const handleNavigate = useCallback((page) => {
    setDetailId(null);
    setActivePage(page);
    if (page === 'home') {
      setPageKey(k => k + 1);
    }
  }, []);

  const handleReportSuccess = useCallback(() => {
    setActivePage('home');
    setPageKey(k => k + 1);
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const showBack = activePage === 'detail';

  return (
    <div className="app-shell">
      <Header showBack={showBack} onBack={handleBack} />

      <main className="app-content">
        {activePage === 'home' && (
          <DashboardPage
            key={pageKey}
            onViewDetail={handleViewDetail}
            onSwitchToMap={() => setActivePage('map')}
          />
        )}
        {activePage === 'report' && (
          <ReportPage onSuccess={handleReportSuccess} />
        )}
        {activePage === 'map' && (
          <MapPage onViewDetail={handleViewDetail} />
        )}
        {activePage === 'profile' && (
          <ProfilePage onLogout={handleLogout} onViewDetail={handleViewDetail} />
        )}
        {activePage === 'detail' && detailId && (
          <DetailPage grievanceId={detailId} onBack={handleBack} />
        )}
      </main>

      {activePage !== 'detail' && (
        <BottomNav activePage={activePage} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
