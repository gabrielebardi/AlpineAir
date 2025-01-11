import axios, { type AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export function handleApiError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; code?: string }>;
    const status = axiosError.response?.status;
    const message = axiosError.response?.data?.message || axiosError.message;
    const code = axiosError.response?.data?.code;

    switch (status) {
      case 400:
        return new AppError(message, ERROR_CODES.VALIDATION_ERROR, status);
      case 401:
        return new AppError('Please log in to continue', ERROR_CODES.UNAUTHORIZED, status);
      case 404:
        return new AppError('Resource not found', ERROR_CODES.NOT_FOUND, status);
      case 500:
        return new AppError('Internal server error', ERROR_CODES.SERVER_ERROR, status);
      default:
        if (axiosError.code === 'ERR_NETWORK') {
          return new AppError(
            'Network error. Please check your connection.',
            ERROR_CODES.NETWORK_ERROR
          );
        }
        return new AppError(message, code || ERROR_CODES.UNKNOWN_ERROR, status);
    }
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError('An unexpected error occurred');
}

export function showErrorNotification(error: unknown) {
  const appError = error instanceof AppError ? error : handleApiError(error);
  
  enqueueSnackbar(appError.message, {
    variant: 'error',
    autoHideDuration: 5000,
  });

  return appError;
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message;
  }
  return handleApiError(error).message;
} 