export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  preferences?: {
    seatPreference?: string;
    mealPreference?: string;
    notificationPreference?: string;
  };
} 