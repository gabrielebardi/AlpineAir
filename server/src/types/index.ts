import { Request, Response, RequestHandler } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export interface User {
  id: string;
  email: string;
  firebaseId: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type ApiResponse<T = any> = Response<T | ApiError>;

export type ApiError = {
  error: string;
};

export type ApiRequestHandler<T = any> = RequestHandler<
  any,
  T | ApiError,
  any,
  any
>;

export type AuthenticatedRequestHandler<T = any> = RequestHandler<
  any,
  T | ApiError,
  any,
  any,
  { user: { id: string; email: string; } }
>;

export type RouteHandler<T = any> = (
  req: Request,
  res: ApiResponse<T>,
  next?: () => void
) => Promise<void>;

export type AuthenticatedRouteHandler<T = any> = (
  req: AuthenticatedRequest,
  res: ApiResponse<T>,
  next?: () => void
) => Promise<void>;

// Vercel types
export interface VercelAuthenticatedRequest extends VercelRequest {
  user: {
    id: string;
    email: string;
  };
}

export type VercelApiHandler = (
  req: VercelAuthenticatedRequest,
  res: VercelResponse
) => Promise<void>; 