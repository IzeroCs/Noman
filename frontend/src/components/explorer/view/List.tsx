import classNames from "classnames"
import React, { useState, useEffect } from "react"
import FileModel, { FileAdapter } from "../model/File"
import { OnDirectoryClickCallback, OnFileClickCallback } from "../"
import { ContextMenu } from "../../../core/view/ContextMenu"
import { ContextMenuItem } from "../../view/ContextMenu"
import i18next from "i18next"
import { useAppDispatch, useAppSelector } from "../../../store/Hooks"
import { ContextMenuSelector } from "../../../store/reducers/ContextMenu"

export type FilterColumn = {
  key: string
  label: string
  show?: boolean
  size?: "small" | "medium" | "large" | "stretch" | undefined
  isName?: boolean
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
  const appDispatch = useAppDispatch()
  const isContextMenuShow = useAppSelector(ContextMenuSelector.isMenuShow)
  const [rowActived, setRowActived] = useState(-1)
  const [cellActived, setCellActived] = useState(-1)
  const [rowActivedTime, setRowActivedTime] = useState(0)

  const onRowClick = (event: any, fileModel: FileModel, index: number): any => {
    const targetElement = event.target
    const dateNow = Date.now()
    let parentElement = targetElement.parentElement

    console.log(dateNow - rowActivedTime)
    if (
      targetElement &&
      rowActived === index &&
      dateNow - rowActivedTime >= 800 &&
      targetElement.getAttribute("data-cell-input") !== null
    ) {
      const input: any = Object.values(targetElement.children).find(
        (child: any) => child.getAttribute("data-cell-input")
      )

      setCellActived(parseInt(targetElement.getAttribute("data-cell-input")))

      if (input && input.tagName === "INPUT") {
        input.setSelectionRange(input.value.length, input.value.length)
        input.focus()
      }
    } else {
      setCellActived(-1)
    }

    if (
      parentElement &&
      parentElement.getAttribute("data-row-index") === null
    ) {
      parentElement = parentElement.parentElement
    }

    if (rowActived !== index) {
      setRowActivedTime(dateNow)
    }

    setRowActived(index)

    if (!isContextMenuShow) {
      event.preventDefault()
      event.stopPropagation()

      return false
    }
  }

  const onRowDoubleClick = (
    event: any,
    fileModel: FileModel,
    index: number
  ): any => {
    event.preventDefault()

    if (props.onDirectoryClick && fileModel.is_directory) {
      setRowActived(-1)
      setCellActived(-1)
      setRowActivedTime(0)
      event.stopPropagation()
      props.onDirectoryClick(fileModel)
    } else if (props.onFileClick) {
      setRowActived(-1)
      setCellActived(-1)
      setRowActivedTime(0)
      event.stopPropagation()
      props.onFileClick(fileModel)
    }

    return false
  }

  const onRowContextMenu = (
    event: React.MouseEvent,
    fileModel: FileModel,
    index: number
  ): any => {
    setRowActived(index)
    setRowActivedTime(Date.now())
    event.preventDefault()
    event.stopPropagation()
    ContextMenu.displayMenuList(event, ExplorerBodyRowContextMenu)

    return false
  }

  const onWindowOutside = (event: any) => {
    setRowActived(-1)
    setCellActived(-1)
    setRowActivedTime(0)
  }

  const fileModels = props.fileModels || []
  const filterColumns = props.filterColumns.filter(
    (col) => typeof col.show === "undefined" || col.show === true
  )
  const hasColumnName =
    filterColumns.find((col) => col.isName === true) || filterColumns[0]
  const hasColumnStretch = filterColumns.find((col) => col.size === "stretch")

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

  useEffect(() => {
    window.addEventListener("click", onWindowOutside)
    window.addEventListener("contextmenu", onWindowOutside)

    return () => {
      window.removeEventListener("click", onWindowOutside)
      window.removeEventListener("contextmenu", onWindowOutside)
    }
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
                  <span className="label">{col.label}</span>
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
                className={classNames("explorer-view-list-body-row", {
                  actived: index === rowActived
                })}
                onClick={(event) => onRowClick(event, item, index)}
                onDoubleClick={(event) => onRowDoubleClick(event, item, index)}
                onContextMenu={(event) => onRowContextMenu(event, item, index)}
                data-row-index={index}
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
                      {...(col == hasColumnName && {
                        "data-cell-input": filterIndex
                      })}
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
                      {(hasColumnName === col && (
                        <input
                          className={classNames("input-label", {
                            "input-actived":
                              index === rowActived &&
                              filterIndex === cellActived
                          })}
                          value={value}
                          title={value}
                          spellCheck="false"
                          data-cell-input={filterIndex}
                          onChange={(event) => false}
                        />
                      )) || <span className="label">{value}</span>}
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
