import { Body, Controller, Post, Get, Request, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service"
import * as bcrypt from "bcrypt"
import { LocalAuthGuard } from "src/auth/local.auth.guard"
import { AuthenticatedGuard } from "src/auth/authenticated.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signup")
  async signup(
    @Body("password") password: string,
    @Body("username") username: string,
  ) {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    const result = await this.usersService.inserUser(username, hashedPassword)

    return {
      msg: "User successfully registered",
      userid: result.id,
      username: result.username,
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  signin(@Request() req): any {
    return {
      User: req.user,
      msg: "You are successfully logged in",
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get("/protected")
  getHello(@Request() req): string {
    return req.user
  }

  @Get("/signout")
  signout(@Request() req): any {
    req.session.destroy()
    return { msg: "The user session has ended" }
  }
}
