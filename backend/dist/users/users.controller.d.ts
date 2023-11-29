import { UsersService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
export declare class UsersController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signup(password: string, username: string): Promise<{
        message: string;
        userid: any;
        username: string;
    }>;
    signin(req: any): Promise<{
        accessToken: string;
    }>;
    getHello(req: any): any;
    signout(req: any): any;
}
