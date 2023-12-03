import * as fs from "fs"
import * as path from "path"
import { Injectable, NotFoundException } from "@nestjs/common"
import { FilesMime } from "src/core/files/mime"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class FilesService {
  private dataRootPath: string

  constructor(private readonly configService: ConfigService) {
    this.dataRootPath = path.resolve(configService.get("DATA_ROOT"))
  }

  isPathOuter(pathFile: string) {
    return !this.resolvePath(pathFile).startsWith(this.dataRootPath)
  }

  resolvePath(pathFile: string) {
    return path.resolve(path.join(this.dataRootPath, pathFile))
  }

  async scanDirectory(pathScan: string) {
    if (this.isPathOuter(pathScan))
      throw new NotFoundException("Directory does not exists")

    const resolvePath = this.resolvePath(pathScan)

    if (!fs.existsSync(resolvePath))
      throw new NotFoundException("Directory does not exists")

    const list = fs.readdirSync(resolvePath)
    const resolveItemPath = (item: string) => {
      return path.resolve(path.join(resolvePath, item))
    }

    return {
      message: "Scan directory successfully",
      path: pathScan,
      list: list
        .filter((item) => {
          return fs.existsSync(resolveItemPath(item))
        })
        .map((item) => {
          const stat = fs.lstatSync(resolveItemPath(item))
          const info: any = {
            name: item,
            size: stat.size,
            mode: stat.mode,
            is_directory: stat.isDirectory(),
            created_time: stat.ctimeMs,
            modified_time: stat.mtimeMs
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
