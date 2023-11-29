import {
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./users.model"
import { Token } from "./tokens.model"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("user") private readonly userModel: Model<User>,
    @InjectModel("token") private readonly tokenModel: Model<Token>
  ) {}

  async inserUser(username: string, password: string) {
    const user = new this.userModel({ username, password })
    return await user.save()
  }

  async findById(id: string) {
    return await this.userModel.findById(id).limit(1)
  }

  async getUser(username: string) {
    return await this.userModel.findOne({
      username: { $regex: `^${username}$`, $options: "i" }
    })
  }

  async saveToken(userid: string, accessToken: string) {
    const token = new this.tokenModel({ access: accessToken, userid: userid })
    return await token.save()
  }
}
