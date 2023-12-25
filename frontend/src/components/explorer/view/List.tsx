import classNames from "classnames"
import React, { useState, useEffect } from "react"
import FileModel, { FileAdapter } from "../model/File"
import { OnDirectoryClickCallback, OnFileClickCallback } from "../"
import { useAppSelector } from "../../../store/Hooks"
import { ContextMenuSelector } from "../../../store/reducers/ContextMenu"
import { OnContextMenuClickCallback } from "../View"

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
  onContextMenuClick: OnContextMenuClickCallback
}

const ExplorerViewList: React.FC<ExplorerViewListProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const isContextMenuShow = useAppSelector(ContextMenuSelector.isMenuShow)
  const [rowActived, setRowActived] = useState(-1)
  const [cellActived, setCellActived] = useState(-1)
  const [cellNameFocus, setCellNameFocus] = useState(false)

  let cellNameElement: any = null
  let cellNameInput: any = null
  let cellNameTime: number = -1

  const dispatchCellNameActived = (targetElement: any) => {
    cellNameInput = Object.values(targetElement.children).find((child: any) =>
      child.getAttribute("data-cell-input")
    )

    cellNameElement = targetElement
    cellNameTime = Date.now()
    setCellNameFocus(false)
  }

  const dispatchCellNameFocusNow = () => {
    if (cellNameInput && cellNameInput.tagName === "INPUT") {
      cellNameInput.setSelectionRange(cellNameInput.value.length, cellNameInput.value.length)
      cellNameInput.focus()
      setCellNameFocus(true)

      setCellActived(parseInt(cellNameElement.getAttribute("data-cell-input")))
    }
  }

  const dispatchCellNameFocusInterval = () => {
    if (cellNameFocus === false && cellNameTime !== -1 && Date.now() - cellNameTime > 1000) {
      dispatchCellNameFocusNow()
    }
  }

  const dispatchCellNameUnfocus = () => {
    cellNameInput = null
    cellNameElement = null
    cellNameTime = -1

    setCellNameFocus(false)
  }

  const onRowKeyDown = (event: any) => {
    const keycode = event.keyCode

    // console.log(keycode)
  }

  const onRowClick = (event: any, fileModel: FileModel, index: number): any => {
    const targetElement = event.target

    if (
      targetElement &&
      rowActived === index &&
      targetElement.getAttribute("data-cell-input") !== null
    ) {
      console.log("Cell Row actived")
      dispatchCellNameActived(targetElement)
    } else {
      setCellActived(-1)
    }

    if (rowActived !== index) {
      dispatchCellNameUnfocus()
    }

    setRowActived(index)
    window.addEventListener("keydown", onRowKeyDown)

    if (!isContextMenuShow) {
      event.preventDefault()
      event.stopPropagation()

      return false
    }
  }

  const onRowDoubleClick = (event: any, fileModel: FileModel, index: number): any => {
    let pass = false

    if (props.onDirectoryClick && fileModel.is_directory) {
      props.onDirectoryClick(fileModel)
    } else if (props.onFileClick) {
      props.onFileClick(fileModel)
    }

    event.preventDefault()

    if (pass) {
      dispatchCellNameUnfocus()
      setRowActived(-1)
      setCellActived(-1)
      event.stopPropagation()
      window.removeEventListener("keydown", onRowKeyDown)
    }

    return false
  }

  const onRowContextMenu = (event: any, fileModel: FileModel, index: number): any => {
    dispatchCellNameUnfocus()
    setRowActived(index)
    event.preventDefault()
    event.stopPropagation()
    props.onContextMenuClick(event, fileModel, index)

    return false
  }

  const onWindowOutside = (event: any) => {
    let pass = false

    if (event.target) {
      let element = event.target
      let rowIndex = element.getAttribute("data-row-index")
      let cellInput = element.getAttribute("data-cell-input")

      if (cellInput !== null) {
        rowIndex = null
        pass = true
      } else if (rowIndex === null) {
        element = event.target.parentElement
        rowIndex = element.getAttribute("data-row-index")
      }

      if (rowIndex !== null && parseInt(rowIndex) === rowActived) {
        pass = true
      }
    }

    if (!pass) {
      setRowActived(-1)
      setCellActived(-1)
    }
  }

  const fileModels = props.fileModels || []
  const filterColumns = props.filterColumns.filter(
    (col) => typeof col.show === "undefined" || col.show === true
  )
  const hasColumnName = filterColumns.find((col) => col.isName === true) || filterColumns[0]
  const hasColumnStretch = filterColumns.find((col) => col.size === "stretch")

  const colSize = (col: FilterColumn, index: number): string => {
    if ((!hasColumnStretch && index === 0) || "stretch" === col.size) return "stretch"
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
    const cellNameInterval = setInterval(dispatchCellNameFocusInterval, 50)

    window.addEventListener("click", onWindowOutside)
    window.addEventListener("contextmenu", onWindowOutside)

    return () => {
      window.removeEventListener("click", onWindowOutside)
      window.removeEventListener("contextmenu", onWindowOutside)
      clearInterval(cellNameInterval)
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
                  className={classNames("explorer-view-list-head-cell", colSize(col, index))}
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
                  const operation = FileAdapter[col.key as keyof typeof FileAdapter]
                  let value = item[col.key as keyof FileModel] as string

                  if (typeof operation !== "undefined") value = operation(value, item)

                  return (
                    <td
                      key={filterIndex}
                      className={classNames(
                        "explorer-view-list-body-cell",
                        colSize(col, filterIndex)
                      )}
                      {...(col === hasColumnName && {
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
                              filterIndex === cellActived &&
                              cellNameFocus === true
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
