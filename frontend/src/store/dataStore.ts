import { create } from 'zustand';
import api from '../api/client';

type Profile = { id?: number | string; name?: string; email?: string; message?: string };
type DataState = { profile: Profile | null; isLoading: boolean; error: string; fetchProtectedData: () => Promise<void> };

export const useDataStore = create<DataState>((set) => ({
  profile: null,
  isLoading: false,
  error: '',
  fetchProtectedData: async () => {
    set({ isLoading: true, error: '' });
    try {
      // Учебный защищённый endpoint. При необходимости замените на endpoint преподавателя.
      const response = await api.get('/api/profile');
      set({ profile: response.data, isLoading: false, error: '' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Не удалось загрузить защищённые данные.';
      set({ isLoading: false, error: message });
    }
  },
}));
