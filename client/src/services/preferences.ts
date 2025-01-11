import { api, handleApiError } from './api';

export interface UserPreferences {
  seatPreference?: 'WINDOW' | 'AISLE' | 'NO_PREFERENCE';
  mealPreference?: 'REGULAR' | 'VEGETARIAN' | 'VEGAN' | 'HALAL' | 'KOSHER';
  notificationPreference?: 'EMAIL' | 'SMS' | 'PUSH' | 'NONE';
}

export const preferencesService = {
  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const { data } = await api.get<{ preferences: UserPreferences }>('/preferences');
      return data.preferences;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const { data } = await api.put<{ preferences: UserPreferences }>('/preferences', preferences);
      return data.preferences;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async resetPreferences(): Promise<UserPreferences> {
    try {
      const { data } = await api.post<{ preferences: UserPreferences }>('/preferences/reset');
      return data.preferences;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
}; 