import { UserModel, User, DogModel, Dog } from "../models";
import { Types } from "mongoose";

export class DogService {
  async create(name: string, age: number, ownerId: string): Promise<Dog> {
    return DogModel.create({ name, age, owner: new Types.ObjectId(ownerId) });
  }
}

export const dogService = new DogService();
