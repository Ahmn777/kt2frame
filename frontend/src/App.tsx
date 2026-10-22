import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<PrivateRoute />}><Route path="/dashboard" element={<DashboardPage />} /></Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>;
}

export default function App() { return <BrowserRouter><AppRoutes /></BrowserRouter>; }
