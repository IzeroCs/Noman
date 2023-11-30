import { AccessTokenValidate, RefreshTokenValidate } from "./jwt.strategy";
export type AccessTokenPayloadHandle = {
    userid: string;
    accessToken: string;
};
export type RefreshTokenPayloadHandle = {
    userid: string;
    refreshToken: string;
};
declare const AccessTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AccessTokenGuard extends AccessTokenGuard_base {
    handleRequest(err: any, data: AccessTokenValidate): any | AccessTokenPayloadHandle;
}
declare const RefreshTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RefreshTokenGuard extends RefreshTokenGuard_base {
    handleRequest(err: any, data: RefreshTokenValidate): any | RefreshTokenPayloadHandle;
}
export {};
