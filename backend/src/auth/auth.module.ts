import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UsersModule } from "src/users/users.module"
import { PassportModule } from "@nestjs/passport"
import {
  AccessTokenStrategy,
  JwtConstraints,
  RefreshTokenStrategy
} from "./jwt.strategy"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { LocalStrategy } from "./local.strategy"

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret:
            configService.get("JWT_SECRET") || JwtConstraints.JWT_SECRET_DEFAULT
        }
      }
    })
  ],
  providers: [
    AuthService,
    ConfigService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class AuthModule {}
