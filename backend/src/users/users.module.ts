import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "./users.model"
import { JwtService } from "@nestjs/jwt"
import { AuthService } from "src/auth/auth.service"
import { TokenSchema } from "./tokens.model"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "token", schema: TokenSchema }])
  ],
  providers: [AuthService, UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
