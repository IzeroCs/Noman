import { Module } from "@nestjs/common"
import { FilesService } from "./files.service"
import { FilesController } from "./files.controller"
import { ConfigService } from "@nestjs/config"

@Module({
  providers: [ConfigService, FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
