import { ForbiddenException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User, UserDocument } from "./users.model"
import { Token, TokenDocument } from "./tokens.model"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>
  ) {}

  async inserUser(username: string, password: string) {
    const user = new this.userModel({ username, password })
    return await user.save()
  }

  async findUserById(id: string) {
    return await this.userModel.findById(id)
  }

  async getUser(username: string) {
    return await this.userModel.findOne({
      username: { $regex: `^${username}$`, $options: "i" }
    })
  }

  async putToken(userid: string, accessToken: string, refreshToken: string) {
    const token = new this.tokenModel({
      userid,
      access: accessToken,
      refresh: refreshToken
    })
    return await token.save()
  }

  async removeToken(userid: string, accessToken: string) {
    return await this.tokenModel.findOneAndDelete(
      {
        userid,
        access: accessToken
      },
      { limit: 1 }
    )
  }

  async updateToken(
    userid: string,
    accessToken: string,
    refreshTokenOld: string,
    refreshTokenNew: string
  ) {
    return await this.tokenModel.findOneAndUpdate(
      { userid, refresh: refreshTokenOld },
      {
        $set: {
          access: accessToken,
          refresh: refreshTokenNew
        }
      }
    )
  }

  async findAccessToken(userid: string, accessToken: string) {
    return await this.tokenModel.findOne({
      userid: userid,
      access: accessToken
    })
  }

  async findRefreshToken(userid: string, refreshToken: string) {
    return await this.tokenModel.findOne({
      userid: userid,
      refresh: refreshToken
    })
  }
}
