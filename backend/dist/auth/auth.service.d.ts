import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AccessTokenPayloadHandle, RefreshTokenPayloadHandle } from "./jwt.auth.guard";
export declare class AuthService {
    private readonly usersService;
    private readonly configService;
    private readonly jwtService;
    constructor(usersService: UsersService, configService: ConfigService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    createAccessToken(userid: string): Promise<string>;
    createRefreshToken(userid: string): Promise<string>;
    signup(username: string, password: string): Promise<{
        message: string;
        userid: any;
    }>;
    signin(payload: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signout(req: any, payload: AccessTokenPayloadHandle): Promise<{
        message: string;
    }>;
    refresh(req: any, payload: RefreshTokenPayloadHandle): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    profile(payload: AccessTokenPayloadHandle): Promise<{
        userid: any;
        username: string;
    }>;
}
