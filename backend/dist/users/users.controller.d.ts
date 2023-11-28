import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(password: string, username: string): Promise<{
        message: string;
        userid: any;
        username: string;
    }>;
    signin(req: any): any;
    getHello(req: any): any;
    signout(req: any): any;
}
