import i18next from "i18next"

export type FilterColumn = {
  key: string
  label: string
  show?: boolean
  size?: "small" | "medium" | "large" | "stretch" | undefined
  isName?: boolean
}

export const FilterColumnList: Array<FilterColumn> = [
  { key: "name", label: i18next.t("explorer:header.name") },
  { key: "size", label: i18next.t("explorer:header.size") },
  {
    key: "extension",
    label: i18next.t("explorer:header.extension"),
    size: "small"
  },
  {
    key: "created_time",
    label: i18next.t("explorer:header.created_time"),
    size: "medium"
  }
]
