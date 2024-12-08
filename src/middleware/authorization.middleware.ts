import { PrismaClient, User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import lib from '../lib';

const prisma = new PrismaClient();

interface AuthorizationRequest extends Request {
  user?: User;
}

const authorization = (permission: string) => {
  return async (req: AuthorizationRequest, _res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.id; 

    if (!userId) {
      next(lib.CustomError.unauthorized());
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: { include: { permissions: true } } }
    });

    if (!user) {
      next(lib.CustomError.notFound());
      return;
    }

    const hasPermission = user?.role.permissions.some((perm) => perm.name === permission);

    if (hasPermission) {
      next();
    } else {
      next(lib.CustomError.forbidden());
    }
  };
};

export default authorization;
