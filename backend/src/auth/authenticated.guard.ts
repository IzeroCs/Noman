import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!request.isAuthenticated()) {
          reject(new UnauthorizedException())
        } else {
          resolve(true)
        }
      }, 500)
    })
  }
}
