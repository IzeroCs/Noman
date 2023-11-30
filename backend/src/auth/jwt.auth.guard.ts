import { Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { AccessTokenValidate, RefreshTokenValidate } from "./jwt.strategy"

export type AccessTokenPayloadHandle = {
  userid: string
  accessToken: string
}

export type RefreshTokenPayloadHandle = {
  userid: string
  refreshToken: string
}

@Injectable()
export class AccessTokenGuard extends AuthGuard("jwt") {
  handleRequest(
    err,
    data: AccessTokenValidate
  ): any | AccessTokenPayloadHandle {
    if (err || !data) {
      throw err || new UnauthorizedException()
    }

    return {
      userid: data.userid,
      accessToken: data.accessToken
    }
  }
}

@Injectable()
export class RefreshTokenGuard extends AuthGuard("jwt-refresh") {
  handleRequest(
    err,
    data: RefreshTokenValidate
  ): any | RefreshTokenPayloadHandle {
    if (err || !data) {
      throw err || new UnauthorizedException()
    }

    return { userid: data.userid, refreshToken: data.refreshToken }
  }
}
