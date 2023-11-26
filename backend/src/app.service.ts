import { Injectable, Global } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import MongoStore = require("connect-mongo")

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getMongoUrl(): string {
    const dbHost = this.configService.get("MONGODB_HOST") || "localhost"
    const dbPort = this.configService.get("MONGODB_PORT") || 27017
    const dbName = this.configService.get("MONGODB_NAME") || "noman"

    return `mongodb://${dbHost}:${dbPort}/${dbName}`
  }

  getMongoStore(): MongoStore {
    return MongoStore.create({
      mongoUrl: this.getMongoUrl(),
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "native"
    })
  }
}
