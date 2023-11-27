import * as path from "path"
import { DBIcon, DBMimeType } from "./mime.db"

export namespace FilesMime {
  export const types: { [k: string]: string } = {}
  export const icons: { [k: string]: string } = {}

  export type MimeResult = {
    extension: string
    type: string
    icon: string
  }

  export function lookup(filename: string): MimeResult | null {
    const extension = path
      .extname("x." + filename)
      .toLowerCase()
      .slice(1)

    if (!extension) return null
    const type = types[extension] || "unknown"
    if (!type) return null
    const icon = icons[extension] || "unknown"
    return { extension, type, icon }
  }

  function populateMaps() {
    Object.keys(DBMimeType).forEach((type) => {
      const exts = DBMimeType[type]

      if (!exts || !exts.length) {
        return
      }

      for (let i = 0; i < exts.length; ++i) {
        types[exts[i]] = type
      }
    })

    Object.keys(DBIcon).forEach((icon) => {
      const exts = DBIcon[icon]

      if (!exts || !exts.length) {
        return
      }

      for (let i = 0; i < exts.length; ++i) {
        icons[exts[i]] = icon
      }
    })
  }

  populateMaps()
}
