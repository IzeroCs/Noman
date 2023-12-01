import classNames from "classnames"
import FileModel, { FileAdapter } from "../model/File"

export type FilterColumn = {
  key: string
  label: string
  show?: boolean
  size?: "small" | "medium" | "large" | "stretch" | undefined
}

type ExplorerViewListProps = {
  filterColumns: Array<FilterColumn>
  fileModels?: Array<FileModel>
}

const ExplorerViewList: React.FC<
  ExplorerViewListProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
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
              <tr key={index} className="explorer-view-list-body-row">
                {filterColumns.map((col, filterIndex) => {
                  const operation =
                    FileAdapter[col.key as keyof typeof FileAdapter]
                  let value = item[col.key as keyof FileModel] as string

                  if (typeof operation !== "undefined") value = operation(value)

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
