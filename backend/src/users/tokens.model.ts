import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document, SchemaTypes } from "mongoose"
import { User } from "./users.model"

export type TokenDocument = Token & Document

@Schema()
export class Token {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  userid: mongoose.Types.ObjectId

  @Prop({ required: true, unique: true })
  access: string

  @Prop({ required: true, unique: true })
  refresh: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)
