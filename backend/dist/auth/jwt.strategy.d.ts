import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
export declare namespace JwtConstraints {
    const JWT_SECRET_DEFAULT = "noman-jwt-secret";
    const JWT_ACCESS_TOKEN_EXPIRES = "15m";
    const JWT_REFRESH_TOKEN_EXPIRES = "7d";
}
export type JwtPayload = {
    userid: string;
};
export type AccessTokenValidate = {
    userid: string;
    accessToken: string;
};
export type RefreshTokenValidate = {
    userid: string;
    refreshToken: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(req: any, payload: any): Promise<AccessTokenValidate>;
}
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(req: any, payload: any): Promise<RefreshTokenValidate>;
}
export {};
