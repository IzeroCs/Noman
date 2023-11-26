import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./users.model"

@Injectable()
export class UsersService {
  constructor(@InjectModel("user") private readonly userModel: Model<User>) {}

  async inserUser(username: string, password: string) {
    const user = new this.userModel({ username, password })
    await user.save()
    return user
  }

  async getUser(username: string) {
    return await this.userModel.findOne({
      username: { $regex: `^${username}$`, $options: "i" },
    })
  }
}
