import { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

export const makeUserMiddleware = (controller: UserController) => {
  const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    const result = await controller.saveUser(req.body);
    result.fold(
      (left) => next(left),
      (right) => res.status(201).json(right)
    );
  };
  return {
    saveUser,
  };
};
