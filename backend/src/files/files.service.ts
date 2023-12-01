import * as fs from "fs"
import * as path from "path"
import { Injectable, NotFoundException } from "@nestjs/common"
import { FilesMime } from "src/core/files/mime"

@Injectable()
export class FilesService {
  async scanDirectory(pathScan: string) {
    const resolvePath = path.resolve(path.join("E:", pathScan))

    if (!fs.existsSync(resolvePath))
      throw new NotFoundException("Directory does not exists")

    const list = fs.readdirSync(resolvePath)
    const resolveItemPath = (item: string) => {
      return path.resolve(path.join(resolvePath, item))
    }

    return {
      message: "Scan directory successfully",
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
