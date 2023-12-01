import i18next from "i18next"
import moment from "moment"
import { FileSystem } from "../../../core/file/FileSystem"

export default interface FileModel {
  name: string
  mode: number
  size: number
  extension: string
  is_directory: boolean
  created_time: number
  modified_time: number
  icon: string
}

export const FileAdapter = {
  size(bytes: string): string {
    return FileSystem.formatBytes(bytes)
  },

  created_time(timestamp: string): string {
    return moment((parseInt(timestamp) || 0) * 1000).format(
      "DD/MM/YYYY hh:mm:ss"
    )
  },

  extension(extension: string): string {
    // console.log(ext)
    // if (ext === "d") return i18next.t("explorer:file.ext_directory")
    // else if (ext.startsWith("f:"))
    //   return i18next.t("explorer:file.ext_" + ext.substring(2))

    return i18next.t("explorer:file.ext_unknown")
  }
}
