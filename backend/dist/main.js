"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ["http://localhost:8080", "http://192.168.31.200:8080"],
        credentials: true
    });
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map