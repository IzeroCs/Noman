import { Injectable, Request, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { UsersService } from "src/users/users.service"

export namespace JwtConstraints {
  export const JWT_SECRET_DEFAULT = "noman-jwt-secret"
  export const JWT_ACCESS_TOKEN_EXPIRES = "15m"
  export const JWT_REFRESH_TOKEN_EXPIRES = "7d"
}

export type JwtPayload = {
  userid: string
}

export type AccessTokenValidate = {
  userid: string
  accessToken: string
}

export type RefreshTokenValidate = { userid: string; refreshToken: string }

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get("JWT_SECRET") || JwtConstraints.JWT_SECRET_DEFAULT,
      passReqToCallback: true
    })
  }

  async validate(@Request() req, payload: any): Promise<AccessTokenValidate> {
    const accessToken = req.get("Authorization").replace("Bearer", "").trim()

    if (!payload || !payload.userid || !accessToken) {
      throw new UnauthorizedException()
    }

    const token = await this.usersService.findAccessToken(
      payload.userid,
      accessToken
    )

    if (!token) {
      throw new UnauthorizedException()
    }

    return { userid: payload.userid, accessToken }
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get("JWT_SECRET") || JwtConstraints.JWT_SECRET_DEFAULT,
      passReqToCallback: true
    })
  }

  async validate(@Request() req, payload: any): Promise<RefreshTokenValidate> {
    const refreshToken = req.get("Authorization").replace("Bearer", "").trim()

    if (!payload || !payload.userid || !refreshToken) {
      throw new UnauthorizedException()
    }

    const token = await this.usersService.findRefreshToken(
      payload.userid,
      refreshToken
    )

    if (!token) {
      throw new UnauthorizedException()
    }

    return { userid: payload.userid, refreshToken }
  }
}
