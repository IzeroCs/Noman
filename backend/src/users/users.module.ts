import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { MongooseModule, Schema } from "@nestjs/mongoose"
import { User, UserSchema } from "./users.model"
import { JwtService } from "@nestjs/jwt"
import { AuthService } from "src/auth/auth.service"
import { Token, TokenSchema } from "./tokens.model"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])
  ],
  providers: [AuthService, UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
