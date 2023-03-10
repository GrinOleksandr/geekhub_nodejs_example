import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: true },
})
export class User {
  @prop({ id: true })
  id!: Types.ObjectId;

  @prop({ required: true })
  login!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: false, default: false })
  isAdmin?: boolean;
}

export const UserModel = getModelForClass(User);
