import * as mongoose from "mongoose"

export const TokenSchema = new mongoose.Schema(
  {
    access: {
      type: String,
      required: true,
      unique: true
    },

    userid: {
      type: mongoose.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true }
)

export interface Token extends mongoose.Document {
  _id: string
  access: string
  userid: mongoose.Types.ObjectId
}
