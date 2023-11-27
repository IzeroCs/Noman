import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { AppService } from "./app.service"
import * as session from "express-session"
import * as passport from "passport"
import { FilesMime } from "./core/files/mime"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const appService = app.get(AppService)

  app.use(
    session({
      store: appService.getMongoStore(),
      secret: configService.get("SESSION_SECRET") || "session-noman-secret",
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3030)
}
bootstrap()
