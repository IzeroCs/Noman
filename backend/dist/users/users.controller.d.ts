import { AuthService } from "src/auth/auth.service";
export declare class UsersController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(username: string, password: string): Promise<{
        message: string;
        userid: any;
    }>;
    signin(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signout(req: any): any;
    refresh(req: any): any;
    profile(req: any): any;
}
