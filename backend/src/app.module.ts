import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MongooseModule } from "@nestjs/mongoose"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { FilesModule } from "./files/files.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FilesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [AppModule],
      inject: [AppService],
      useFactory: async (appService: AppService) => ({
        uri: appService.getMongoUrl()
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
