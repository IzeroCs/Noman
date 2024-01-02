import classNames from "classnames"
import React, { useState, useEffect, useRef } from "react"
import FileModel, { FileAdapter } from "../model/File"
import { OnDirectoryClickCallback, OnFileClickCallback } from "../"
import { useAppSelector } from "../../../store/Hooks"
import { ContextMenuSelector } from "../../../store/reducers/ContextMenu"
import { ContextMenuDisplay } from "../ContextMenu"
import { FilterColumn } from "../FilterColumn"
import KeyEvent from "../../../core/event/KeyEvent"

type ExplorerViewListProps = {
  filterColumns: Array<FilterColumn>
  fileModels?: Array<FileModel>
  onDirectoryClick?: OnDirectoryClickCallback
  onFileClick?: OnFileClickCallback
}

const ExplorerViewList: React.FC<ExplorerViewListProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const isContextMenuShow = useAppSelector(ContextMenuSelector.isMenuShow)
  const [rowActived, setRowActived] = useState(-1)
  const [cellActived, setCellActived] = useState(-1)

  const cellNameElement = useRef<HTMLElement | any>()
  const cellNameInput = useRef<HTMLInputElement | any>()
  const [cellNameFocus, setCellNameFocus] = useState(false)
  const [cellNameTime, setCellNameTime] = useState(-1)

  const dispatchCellNameActived = (targetElement: any, focusNow?: boolean) => {
    const input: any = Object.values(targetElement.children).find((child: any) =>
      child.getAttribute("data-cell-input")
    )

    if (!input) {
      return
    }

    cellNameInput.current = input
    cellNameElement.current = targetElement
    setCellNameTime(focusNow ? 0 : Date.now())
    setCellNameFocus(false)
  }

  const dispatchCellNameFocusNow = () => {
    const input = cellNameInput.current

    if (cellNameElement.current && input && input.tagName === "INPUT") {
      input.setSelectionRange(input.value.length, input.value.length)
      input.focus()
      setCellNameFocus(true)
      setCellActived(parseInt(cellNameElement.current.getAttribute("data-cell-input") || ""))
    } else {
      setCellNameTime(-1)
      setCellNameFocus(false)
    }
  }

  const dispatchCellNameFocusInterval = () => {
    if (cellNameFocus === false && cellNameTime !== -1 && Date.now() - cellNameTime > 500) {
      dispatchCellNameFocusNow()
    }
  }

  const dispatchCellNameUnfocus = () => {
    cellNameElement.current = null
    cellNameInput.current = null
    setCellNameTime(-1)
    setCellNameFocus(false)
  }

  const onRowKeyDown = (event: any) => {
    const rowElement = document.querySelector(`[data-row-index="${rowActived}"]`)
    let pass = true

    switch (event.keyCode) {
      case KeyEvent.KEY_ESCAPE:
        dispatchCellNameUnfocus()
        break

      case KeyEvent.KEY_F2:
        const cellInput = rowElement?.querySelector(`[data-cell-input]`)

        if (cellInput) {
          dispatchCellNameActived(cellInput, true)
        } else {
          pass = false
        }
        break

      default:
        pass = false
    }

    if (pass) {
      event.preventDefault()
      event.stopPropagation()

      return false
    }

    return true
  }

  const onWindowKeyDown = (event: any) => {
    if (rowActived !== -1) {
      return onRowKeyDown(event)
    }

    return true
  }

  const onRowClick = (event: any, fileModel: FileModel, index: number): any => {
    const targetElement = event.target

    if (
      targetElement &&
      rowActived === index &&
      targetElement.getAttribute("data-cell-input") !== null
    ) {
      dispatchCellNameActived(targetElement)
    } else {
      setCellActived(-1)
    }

    if (rowActived !== index) {
      dispatchCellNameUnfocus()
    }

    setRowActived(index)

    if (!isContextMenuShow) {
      event.preventDefault()
      event.stopPropagation()

      return false
    }
  }

  const onRowDoubleClick = (event: any, fileModel: FileModel, index: number): any => {
    let pass = true

    if (props.onDirectoryClick && fileModel.is_directory) {
      props.onDirectoryClick(fileModel)
    } else if (props.onFileClick) {
      props.onFileClick(fileModel)
    } else {
      pass = false
    }

    event.preventDefault()

    if (pass) {
      dispatchCellNameUnfocus()
      setRowActived(-1)
      setCellActived(-1)
      event.stopPropagation()
    }

    return false
  }

  const onRowContextMenuHandle = (event: any, fileModel: FileModel, fileIndex: number): any => {
    dispatchCellNameUnfocus()
    setRowActived(fileIndex)
    event.preventDefault()
    event.stopPropagation()
    ContextMenuDisplay(event)

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
    window.addEventListener("keydown", onWindowKeyDown)

    return () => {
      window.removeEventListener("click", onWindowOutside)
      window.removeEventListener("contextmenu", onWindowOutside)
      window.removeEventListener("keydown", onWindowKeyDown)
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
          {fileModels.map((item, fileIndex) => {
            return (
              <tr
                key={fileIndex}
                className={classNames("explorer-view-list-body-row", {
                  actived: fileIndex === rowActived
                })}
                onClick={(event) => onRowClick(event, item, fileIndex)}
                onDoubleClick={(event) => onRowDoubleClick(event, item, fileIndex)}
                onContextMenu={(event) => onRowContextMenuHandle(event, item, fileIndex)}
                data-row-index={fileIndex}
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
                              fileIndex === rowActived &&
                              filterIndex === cellActived &&
                              cellNameFocus === true
                          })}
                          defaultValue={value}
                          title={value}
                          key={`name:${value}`}
                          spellCheck="false"
                          data-cell-input={filterIndex}
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
