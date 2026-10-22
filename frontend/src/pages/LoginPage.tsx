import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const { isAuthenticated, isLoading, error, login, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || '/dashboard';

  useEffect(() => { clearError(); }, [clearError]);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { await login(email, password); navigate(from, { replace: true }); }
    catch { /* Ошибка уже показана из Zustand */ }
  }

  return <main className="auth-layout">
    <section className="auth-card">
      <div className="brand-mark">K2</div>
      <p className="eyebrow">ПРАКТИКУМ · FRONTEND</p>
      <h1>С возвращением</h1>
      <p className="muted">Войдите, чтобы открыть защищённую страницу.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
        <label>Пароль<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
        {error && <div className="error-box" role="alert">{error}</div>}
        <button className="primary-button" disabled={isLoading}>{isLoading ? 'Входим…' : 'Войти в аккаунт'} <span>→</span></button>
      </form>
      <div className="demo-hint"><strong>Данные для локального теста</strong><br/>demo@example.com<br/>password123</div>
    </section>
    <aside className="auth-aside"><div className="orb orb-one"/><div className="orb orb-two"/><div className="aside-content"><span className="pill">КТ2 · 20 БАЛЛОВ</span><h2>От формы входа — к защищённым данным.</h2><p>Axios · Zustand · JWT · PrivateRoute</p><div className="mini-flow"><span>01&nbsp; Вход</span><i>→</i><span>02&nbsp; Токен</span><i>→</i><span>03&nbsp; Доступ</span></div></div></aside>
  </main>;
}
