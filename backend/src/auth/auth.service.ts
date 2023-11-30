import {
  Injectable,
  NotAcceptableException,
  Request,
  UnauthorizedException
} from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import {
  AccessTokenPayloadHandle,
  RefreshTokenPayloadHandle
} from "./jwt.auth.guard"
import { JwtConstraints, JwtPayload } from "./jwt.strategy"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username)

    if (!user) {
      throw new NotAcceptableException("User does not exist")
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      throw new NotAcceptableException("Password is incorrect")
    }

    return {
      userid: user.id
    }
  }

  async createAccessToken(userid: string) {
    const payload: JwtPayload = { userid }
    const options = {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn:
        this.configService.get("JWT_ACCESS_TOKEN_EXPIRES") ||
        JwtConstraints.JWT_ACCESS_TOKEN_EXPIRES
    }

    return await this.jwtService.signAsync(payload, options)
  }

  async createRefreshToken(userid: string) {
    const payload: JwtPayload = { userid }
    const options = {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn:
        this.configService.get("JWT_REFERSH_TOKEN_EXPIRES") ||
        JwtConstraints.JWT_REFRESH_TOKEN_EXPIRES
    }

    return await this.jwtService.signAsync(payload, options)
  }

  async signup(username: string, password: string) {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    const result = await this.usersService.inserUser(username, hashedPassword)

    return {
      message: "User successfully registered",
      userid: result.id
    }
  }

  async signin(payload: any) {
    const userid = payload.userid
    const accessToken = await this.createAccessToken(userid)
    const refreshToken = await this.createRefreshToken(userid)
    const putToken = await this.usersService.putToken(
      userid,
      accessToken,
      refreshToken
    )

    if (!putToken) {
      throw new UnauthorizedException()
    }

    return { accessToken, refreshToken }
  }

  async signout(@Request() req, payload: AccessTokenPayloadHandle) {
    const remove = await this.usersService.removeToken(
      payload.userid,
      payload.accessToken
    )

    if (!remove) {
      throw new UnauthorizedException()
    }

    return { message: "The user session has ended" }
  }

  async refresh(@Request() req, payload: RefreshTokenPayloadHandle) {
    const accessToken = await this.createAccessToken(payload.userid)
    const refreshToken = await this.createRefreshToken(payload.userid)
    const update = await this.usersService.updateToken(
      payload.userid,
      accessToken,
      payload.refreshToken,
      refreshToken
    )

    if (!update) {
      throw new UnauthorizedException()
    }

    return { accessToken, refreshToken }
  }

  async profile(payload: AccessTokenPayloadHandle) {
    const user = await this.usersService.findUserById(payload.userid)

    if (!user) {
      throw new UnauthorizedException()
    }

    return { userid: user._id, username: user.username }
  }
}
