"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const appService = app.get(app_service_1.AppService);
    app.use(session({
        store: appService.getMongoStore(),
        secret: configService.get("SESSION_SECRET") || "session-noman-secret",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map