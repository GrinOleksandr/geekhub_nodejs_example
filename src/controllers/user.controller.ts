import express, { Request, Response, NextFunction } from "express";
import { dogService, userService } from "../services";
import { HttpError } from "../common/errors";
import { BaseController } from "../common/abstract/base.controller";
import Joi from "joi";
import bcrypt from "bcrypt";

const registerBodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.number().required(),
  text1: Joi.number().required(),
});

export class UserController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        handler: this.register,
        validators: {
          body: registerBodySchema,
        },
      },
      {
        path: "/login",
        method: "post",
        handler: this.login,
      },
      {
        path: "/:userId/dogs",
        method: "post",
        handler: this.createDog,
      },
    ]);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    res.send("ok");
    // res.send(await userService.updateUser(userId, req.body));
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    const response = await userService.login(login, password);
    res.send(response);
  };

  createDog = async (req: Request, res: Response, next: NextFunction) => {
    const { name, age } = req.body;
    const { userId } = req.params;

    const user = await dogService.create(name, age, userId);

    res.send(user);
  };
}

export const userController = new UserController();
