import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from '@firebase/auth';
import { auth, appleProvider } from '../lib/firebase';
import { api, handleApiError } from './api';
import type { User } from '../types/user';
import { showErrorNotification } from './error';

interface AuthResponse {
  user: User;
  token: string;
}

const mapFirebaseUser = async (_firebaseUser: FirebaseUser): Promise<User> => {
  try {
    const { data } = await api.get<AuthResponse>('/auth/me');
    return data.user;
  } catch (error) {
    throw handleApiError(error);
  }
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  _name: string;
}

export const authService = {
  async login({ email, password }: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      const appError = handleApiError(error);
      showErrorNotification(appError);
      throw appError;
    }
  },

  async register({ email, password, _name }: RegisterCredentials): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      const appError = handleApiError(error);
      showErrorNotification(appError);
      throw appError;
    }
  },

  async loginWithApple(): Promise<User> {
    try {
      const userCredential = await signInWithPopup(auth, appleProvider);
      return mapFirebaseUser(userCredential.user);
    } catch (error) {
      const appError = handleApiError(error);
      showErrorNotification(appError);
      throw appError;
    }
  },

  async logout(): Promise<void> {
    await signOut(auth);
  },

  async getCurrentUser(): Promise<User | null> {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return mapFirebaseUser(currentUser);
  },
}; 