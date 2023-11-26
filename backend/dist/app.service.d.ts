import { ConfigService } from "@nestjs/config";
import MongoStore = require("connect-mongo");
export declare class AppService {
    private readonly configService;
    constructor(configService: ConfigService);
    getMongoUrl(): string;
    getMongoStore(): MongoStore;
}
