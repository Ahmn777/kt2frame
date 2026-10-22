import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useDataStore } from '../store/dataStore';

export default function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);
  const { profile, isLoading, error, fetchProtectedData } = useDataStore();
  useEffect(() => { void fetchProtectedData(); }, [fetchProtectedData]);
  return <main className="dashboard-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark small">K2</span><span>KT2 <small>INTEGRATION LAB</small></span></div><button className="logout-button" onClick={logout}>Выйти <span>↗</span></button></header>
    <section className="welcome"><div><p className="eyebrow">ЗАЩИЩЁННАЯ ЗОНА</p><h1>Вы успешно вошли.</h1><p className="muted">PrivateRoute пропустил вас, потому что в хранилище есть токен.</p></div><div className="status-badge"><span/> Авторизация активна</div></section>
    <section className="content-grid">
      <article className="panel profile-panel"><div className="panel-heading"><div><p className="eyebrow">ОТВЕТ BACKEND API</p><h2>Защищённые данные</h2></div><span className="live-dot"/></div>
        {isLoading && <p className="muted">Загружаем данные с сервера…</p>}
        {error && <div className="error-box">{error}<button className="text-button" onClick={() => void fetchProtectedData()}>Повторить запрос</button></div>}
        {profile && <div className="profile-data"><div className="avatar">{(profile.name || 'U').slice(0,1).toUpperCase()}</div><div><strong>{profile.name || 'Пользователь'}</strong><p className="muted">{profile.email || 'Данные получены с сервера'}</p></div></div>}
        <button className="secondary-button" onClick={() => void fetchProtectedData()}>↻ Обновить данные</button>
      </article>
      <article className="panel checklist-panel"><p className="eyebrow">ЧТО ПРОВЕРЯЕТСЯ</p><h2>Цикл авторизации</h2><ul className="check-list"><li><span>✓</span><div><strong>Axios interceptor</strong><small>Добавляет Bearer-токен</small></div></li><li><span>✓</span><div><strong>Zustand store</strong><small>Хранит состояние входа</small></div></li><li><span>✓</span><div><strong>PrivateRoute</strong><small>Закрывает страницу без входа</small></div></li><li><span>✓</span><div><strong>localStorage</strong><small>Сохраняет сессию после F5</small></div></li></ul>
      </article>
    </section>
    <p className="footnote">Учебный проект КТ2 · Для выхода нажмите «Выйти», затем попробуйте открыть /dashboard напрямую.</p>
  </main>;
}
