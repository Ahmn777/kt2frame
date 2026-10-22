import { create } from 'zustand';
import axios from 'axios';
import api from '../api/client';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

const storedToken = localStorage.getItem('token');

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(storedToken),
  isLoading: false,
  error: '',
  login: async (email, password) => {
    set({ isLoading: true, error: '' });
    try {
      const response = await api.post('/auth/login', { email, password });
      const token: string | undefined = response.data.token ?? response.data.accessToken;
      if (!token) throw new Error('Сервер не вернул token или accessToken. Проверьте формат ответа API.');
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      set({ isAuthenticated: true, isLoading: false, error: '' });
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined) || 'Не удалось связаться с API. Проверьте, запущен ли сервер.'
        : error instanceof Error ? error.message : 'Не удалось войти. Проверьте API и данные.';
      set({ isLoading: false, error: message });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false, error: '', isLoading: false });
  },
  clearError: () => set({ error: '' }),
}));
