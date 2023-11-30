"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenStrategy = exports.AccessTokenStrategy = exports.JwtConstraints = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
var JwtConstraints;
(function (JwtConstraints) {
    JwtConstraints.JWT_SECRET_DEFAULT = "noman-jwt-secret";
    JwtConstraints.JWT_ACCESS_TOKEN_EXPIRES = "15m";
    JwtConstraints.JWT_REFRESH_TOKEN_EXPIRES = "7d";
})(JwtConstraints || (exports.JwtConstraints = JwtConstraints = {}));
let AccessTokenStrategy = class AccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt") {
    constructor(configService, usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_SECRET") || JwtConstraints.JWT_SECRET_DEFAULT,
            passReqToCallback: true
        });
        this.configService = configService;
        this.usersService = usersService;
    }
    async validate(req, payload) {
        const accessToken = req.get("Authorization").replace("Bearer", "").trim();
        if (!payload || !payload.userid || !accessToken) {
            throw new common_1.UnauthorizedException();
        }
        const token = await this.usersService.findAccessToken(payload.userid, accessToken);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        return { userid: payload.userid, accessToken };
    }
};
exports.AccessTokenStrategy = AccessTokenStrategy;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccessTokenStrategy.prototype, "validate", null);
exports.AccessTokenStrategy = AccessTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], AccessTokenStrategy);
let RefreshTokenStrategy = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt-refresh") {
    constructor(configService, usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_SECRET") || JwtConstraints.JWT_SECRET_DEFAULT,
            passReqToCallback: true
        });
        this.configService = configService;
        this.usersService = usersService;
    }
    async validate(req, payload) {
        const refreshToken = req.get("Authorization").replace("Bearer", "").trim();
        if (!payload || !payload.userid || !refreshToken) {
            throw new common_1.UnauthorizedException();
        }
        const token = await this.usersService.findRefreshToken(payload.userid, refreshToken);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        return { userid: payload.userid, refreshToken };
    }
};
exports.RefreshTokenStrategy = RefreshTokenStrategy;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RefreshTokenStrategy.prototype, "validate", null);
exports.RefreshTokenStrategy = RefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], RefreshTokenStrategy);
//# sourceMappingURL=jwt.strategy.js.map