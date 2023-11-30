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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthService = class AuthService {
    constructor(usersService, configService, jwtService) {
        this.usersService = usersService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.usersService.getUser(username);
        if (!user) {
            throw new common_1.NotAcceptableException("User does not exist");
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new common_1.NotAcceptableException("Password is incorrect");
        }
        return {
            userid: user.id
        };
    }
    async createAccessToken(userid) {
        const payload = { userid };
        const options = {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: this.configService.get("JWT_ACCESS_TOKEN_EXPIRES") ||
                jwt_strategy_1.JwtConstraints.JWT_ACCESS_TOKEN_EXPIRES
        };
        return await this.jwtService.signAsync(payload, options);
    }
    async createRefreshToken(userid) {
        const payload = { userid };
        const options = {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: this.configService.get("JWT_REFERSH_TOKEN_EXPIRES") ||
                jwt_strategy_1.JwtConstraints.JWT_REFRESH_TOKEN_EXPIRES
        };
        return await this.jwtService.signAsync(payload, options);
    }
    async signup(username, password) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.inserUser(username, hashedPassword);
        return {
            message: "User successfully registered",
            userid: result.id
        };
    }
    async signin(payload) {
        const userid = payload.userid;
        const accessToken = await this.createAccessToken(userid);
        const refreshToken = await this.createRefreshToken(userid);
        const putToken = await this.usersService.putToken(userid, accessToken, refreshToken);
        if (!putToken) {
            throw new common_1.UnauthorizedException();
        }
        return { accessToken, refreshToken };
    }
    async signout(req, payload) {
        const remove = await this.usersService.removeToken(payload.userid, payload.accessToken);
        if (!remove) {
            throw new common_1.UnauthorizedException();
        }
        return { message: "The user session has ended" };
    }
    async refresh(req, payload) {
        const accessToken = await this.createAccessToken(payload.userid);
        const refreshToken = await this.createRefreshToken(payload.userid);
        const update = await this.usersService.updateToken(payload.userid, accessToken, payload.refreshToken, refreshToken);
        if (!update) {
            throw new common_1.UnauthorizedException();
        }
        return { accessToken, refreshToken };
    }
    async profile(payload) {
        const user = await this.usersService.findUserById(payload.userid);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return { userid: user._id, username: user.username };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signout", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "refresh", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map