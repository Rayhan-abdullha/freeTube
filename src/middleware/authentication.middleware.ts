import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import CustomError from '../lib/Error';
import lib from '../lib';

const prisma = new PrismaClient();

interface AuthenticateRequest extends Request {
  headers: {
    authorization?: string;
  };
  user?: User;
}

const authenticate = async (
  req: AuthenticateRequest,
  _res: Response,
  next: NextFunction
): Promise<void > => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    next(CustomError.unauthorized())
    return;
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key') as { userId: string };
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      next(lib.CustomError.unauthorized());
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(lib.CustomError.unauthorized());
    return;
  }
};

export default authenticate;