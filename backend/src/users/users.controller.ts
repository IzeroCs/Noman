import { Body, Controller, Post, Get, Request, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service"
import { LocalAuthGuard } from "src/auth/local.auth.guard"
import { AuthService } from "src/auth/auth.service"
import * as bcrypt from "bcrypt"
import { JwtAuthGuard } from "src/auth/jwt.auth.guard"

@Controller("users")
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("/signup")
  async signup(
    @Body("password") password: string,
    @Body("username") username: string
  ) {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    const result = await this.usersService.inserUser(username, hashedPassword)

    return {
      message: "User successfully registered",
      userid: result.id,
      username: result.username
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  async signin(@Request() req) {
    return this.authService.signin(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/protected")
  getHello(@Request() req): any {
    return req.user
  }

  @Get("/signout")
  signout(@Request() req): any {
    return { message: "The user session has ended" }
  }
}
