import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, user, info): any {
    console.log("handle", user)
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    return { username: user.username, userid: user._id }
  }
}
