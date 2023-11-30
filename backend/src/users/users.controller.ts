import { Body, Controller, Post, Get, Request, UseGuards } from "@nestjs/common"
import { LocalAuthGuard } from "src/auth/local.auth.guard"
import { AuthService } from "src/auth/auth.service"
import { AccessTokenGuard, RefreshTokenGuard } from "src/auth/jwt.auth.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signup(
    @Body("username") username: string,
    @Body("password") password: string
  ) {
    return this.authService.signup(username, password)
  }

  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  async signin(@Request() req) {
    return this.authService.signin(req.user)
  }

  @UseGuards(AccessTokenGuard)
  @Get("/signout")
  signout(@Request() req): any {
    return this.authService.signout(req, req.user)
  }

  @UseGuards(RefreshTokenGuard)
  @Get("/refresh")
  refresh(@Request() req): any {
    return this.authService.refresh(req, req.user)
  }

  @UseGuards(AccessTokenGuard)
  @Get("/profile")
  profile(@Request() req): any {
    return this.authService.profile(req.user)
  }
}
