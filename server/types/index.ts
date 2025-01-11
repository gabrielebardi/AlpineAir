import { Request, Response, RequestHandler } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
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
  { user: { id: string } }
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