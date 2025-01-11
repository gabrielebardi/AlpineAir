import type { Request, Response } from 'express';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type RouteHandler = (req: Request, res: Response) => Promise<void>;
export type AuthenticatedRouteHandler = (req: AuthenticatedRequest, res: Response) => Promise<void>; 