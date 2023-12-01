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
  size(bytes: string, item: FileModel): string {
    if (item.is_directory) return ""
    return FileSystem.formatBytes(bytes)
  },

  created_time(timestamp: string, item: FileModel): string {
    return moment(parseFloat(timestamp) || 0.0).format("DD/MM/YYYY hh:mm:ss")
  },

  extension(extension: string, item: FileModel): string {
    if (item.is_directory) return i18next.t("explorer:file.ext_directory")
    if (item.icon !== "unknown")
      return i18next.t("explorer:file.ext_" + item.icon)
    return i18next.t("explorer:file.ext_unknown")
  }
}
