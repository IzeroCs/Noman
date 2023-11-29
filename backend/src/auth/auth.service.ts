import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"

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
      throw new NotAcceptableException("Cloud not find the user")
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      return {
        userid: user.id,
        username: user.username
      }
    }

    return null
  }

  async signin(user: any) {
    const payload = {
      username: user.username,
      userid: user.userid
    }
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET")
    })
    const saveToken = await this.usersService.saveToken(
      user.userid,
      accessToken
    )

    if (!saveToken) {
      throw new UnauthorizedException()
    }

    return { accessToken }
  }
}
