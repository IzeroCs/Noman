import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private readonly usersService;
    private readonly configService;
    private readonly jwtService;
    constructor(usersService: UsersService, configService: ConfigService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    signin(user: any): Promise<{
        accessToken: string;
    }>;
}
