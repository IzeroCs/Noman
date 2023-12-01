import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { FilesService } from "./files.service"
import { AccessTokenGuard } from "src/auth/jwt.auth.guard"

@UseGuards(AccessTokenGuard)
@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get("/scan")
  async scan(@Query("path") pathScan) {
    return await this.filesService.scanDirectory(pathScan || "")
  }
}
