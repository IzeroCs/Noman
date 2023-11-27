import * as fs from "fs"
import * as path from "path"
import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  NotFoundException
} from "@nestjs/common"
import { FilesService } from "./files.service"
import { AuthenticatedGuard } from "src/auth/authenticated.guard"
import { FilesMime } from "src/core/files/mime"

@UseGuards(AuthenticatedGuard)
@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get("/scan")
  async scan(@Query("path") pathScan) {
    const resolvePath = path.resolve(path.join("E:", pathScan))

    if (!fs.existsSync(resolvePath))
      throw new NotFoundException("Directory does not exists")

    const list = fs.readdirSync(resolvePath)
    const resolveItemPath = (item: string) => {
      return path.resolve(path.join(resolvePath, item))
    }

    return {
      msg: "Scan directory successfully",
      list: list
        .filter((item) => {
          return fs.existsSync(resolveItemPath(item))
        })
        .map((item) => {
          const stat = fs.lstatSync(resolveItemPath(item))
          const info: any = {
            name: item,
            size: stat.size,
            isDirectory: stat.isDirectory(),
            created_date: stat.ctimeMs
          }

          if (stat.isFile()) {
            const mime = FilesMime.lookup(item)

            info.icon = mime.icon
            info.extension = mime.extension
          }

          return info
        })
    }
  }
}