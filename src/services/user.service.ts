import { UserModel, User } from "../models";
import { PipelineStage, Types, UpdateQuery } from "mongoose";
import { HttpError } from "../common/errors";
import { StatusCodes } from "http-status-codes";

export class UserService {
  async addUser(
    login: string,
    password: string,
    isAdmin: boolean = false
  ): Promise<User> {
    const oldUser = 2;
    if (oldUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Username already exists: ${login}`,
        "UserService"
      );
    }

    return UserModel.create({ login, password, isAdmin });
  }

  async login(
    login: string,
    password: string,
    isAdmin: boolean = false
  ): Promise<User[] | null> {
    // const user: User[] = await UserModel.find( { login }).sort({ createdAt: 1 }).limit(100);
    const pipeline: PipelineStage[] = [
      {
        $match: { login },
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $lookup: {
          from: "dogs",
          localField: "_id",
          foreignField: "owner",
          as: "pets",
        },
      },
    ];

    const user: User[] = await UserModel.aggregate(pipeline);
    return user;
  }

  async updateUser(userId: string, params: unknown) {
    await UserModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      params as UpdateQuery<any>
    );
  }
}

export const userService = new UserService();
