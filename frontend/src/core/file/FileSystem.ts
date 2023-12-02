export namespace FileSystem {
  const units = [
    "bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB"
  ]

  export const SEPERATOR = "/"

  export function formatBytes(bytes: string | number) {
    let index = 0
    let num = parseInt(bytes.toString(), 10) || 0

    while (num >= 1024 && ++index) num = num / 1024

    return num.toFixed(num < 10 && index > 0 ? 1 : 0) + " " + units[index]
  }

  export function formatSeperator(pathname: string) {
    return pathname
      .replace(/(\\{1,}|\/{1,})/gi, SEPERATOR)
      .replace(/(^\/{1,}|\/{1,}$)/gi, "")
  }
}
