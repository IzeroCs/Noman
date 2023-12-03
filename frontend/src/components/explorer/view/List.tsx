import classNames from "classnames"
import React from "react"
import FileModel, { FileAdapter } from "../model/File"
import { OnDirectoryClickCallback, OnFileClickCallback } from "../"
import { ContextMenu } from "../../../core/view/ContextMenu"
import { ContextMenuItem } from "../../view/ContextMenu"
import i18next from "i18next"

export type FilterColumn = {
  key: string
  label: string
  show?: boolean
  size?: "small" | "medium" | "large" | "stretch" | undefined
}

type ExplorerViewListProps = {
  filterColumns: Array<FilterColumn>
  fileModels?: Array<FileModel>
  onDirectoryClick?: OnDirectoryClickCallback
  onFileClick?: OnFileClickCallback
}

const ExplorerBodyRowContextMenu: Array<ContextMenuItem> = [
  {
    title: i18next.t("explorer:view-list.context_menu_rename"),
    icon: "ic-action-rename"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_copy"),
    icon: "ic-action-copy"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_cut"),
    icon: "ic-action-cut"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_delete"),
    icon: "ic-action-delete"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_detail"),
    icon: "ic-action-detail",
    divider: true
  },
  {
    title: i18next.t("explorer:view-list.context_menu_favorites"),
    icon: "ic-action-favorites"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_share"),
    icon: "ic-action-share"
  }
]

const ExplorerViewList: React.FC<
  ExplorerViewListProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const onRowClick = (event: any, fileModel: FileModel, index: number): any => {
    event.preventDefault()

    if (props.onDirectoryClick && fileModel.is_directory) {
      props.onDirectoryClick(fileModel)
    } else if (props.onFileClick) {
      props.onFileClick(fileModel)
    }

    return false
  }

  const onRowContextMenu = (
    event: React.MouseEvent,
    fileModel: FileModel,
    index: number
  ): any => {
    ContextMenu.displayMenuList(event, ExplorerBodyRowContextMenu)
    return false
  }

  const filterColumns = props.filterColumns.filter(
    (col) => typeof col.show === "undefined" || col.show === true
  )
  const hasColumnStretch = filterColumns.find((col) => col.size === "stretch")
  const fileModels = props.fileModels || []

  const colSize = (col: FilterColumn, index: number): string => {
    if ((!hasColumnStretch && index === 0) || "stretch" === col.size)
      return "stretch"
    return col.size || "small"
  }

  props.fileModels?.sort((a, b) => {
    if (a.is_directory && b.is_directory && a.name > b.name) {
      return a.name.localeCompare(b.name)
    }

    if (a.is_directory && !b.is_directory) {
      return -1
    }

    if (!a.is_directory && !b.is_directory && a.name > b.name) {
      return a.name.localeCompare(b.name)
    }

    return 0
  })

  return (
    <div className="explorer-view-list">
      <table className="explorer-view-list-table">
        <thead className="explorer-view-list-head">
          <tr>
            {filterColumns.map((col, index) => {
              return (
                <td
                  key={index}
                  className={classNames(
                    "explorer-view-list-head-cell",
                    colSize(col, index)
                  )}
                >
                  {col.label}
                </td>
              )
            })}
          </tr>
        </thead>
        <tbody className="explorer-view-list-body">
          {fileModels.map((item, index) => {
            return (
              <tr
                key={index}
                className="explorer-view-list-body-row"
                onClick={(event) => onRowClick(event, item, index)}
                onContextMenu={(event) => onRowContextMenu(event, item, index)}
              >
                {filterColumns.map((col, filterIndex) => {
                  const operation =
                    FileAdapter[col.key as keyof typeof FileAdapter]
                  let value = item[col.key as keyof FileModel] as string

                  if (typeof operation !== "undefined")
                    value = operation(value, item)

                  return (
                    <td
                      key={filterIndex}
                      className={classNames(
                        "explorer-view-list-body-cell",
                        colSize(col, filterIndex)
                      )}
                    >
                      {col.key === "name" && item.is_directory && (
                        <span className="icomoon ic-explorer-directory icon-directory"></span>
                      )}
                      {col.key === "name" && !item.is_directory && (
                        <span
                          className={classNames(
                            "icomoon",
                            "ic-explorer-file-" + item.icon,
                            "icon-file"
                          )}
                        ></span>
                      )}
                      <span className="label">{value}</span>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ExplorerViewList
