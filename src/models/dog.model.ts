import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({
  schemaOptions: { versionKey: false, timestamps: true },
})
export class Dog {
  @prop({ id: true })
  id!: Types.ObjectId;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  age!: number;

  @prop({ required: true })
  owner!: Types.ObjectId;
}

export const DogModel = getModelForClass(Dog);
