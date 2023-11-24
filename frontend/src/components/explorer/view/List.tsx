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

const ExplorerViewList: React.FC<ExplorerViewListProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const filterColumns = props.filterColumns
    .filter(col => typeof col.show === "undefined" || col.show === true)
  const hasColumnStretch = filterColumns
    .find(col => col.size === "stretch")
  const fileModels = props.fileModels || []

  const colSize = (col: FilterColumn, index: number): string => {
    if ((!hasColumnStretch && index === 0) || "stretch" === col.size)
      return "stretch"
    return col.size || "small"
  }

  return <div className="explorer-view-list">
    <div className="explorer-view-list-header-row">
      {filterColumns.map((col, index) => {
        return <div key={index} className={classNames("explorer-view-list-header-cell",
          colSize(col, index))}>{col.label}</div>
      })}
    </div>

    <div className="explorer-view-list-body">
      {fileModels.map((item, index) => {
        return <div className="explorer-view-list-body-row" key={index}>
          {filterColumns.map((col, filterIndex) => {
            const operation = FileAdapter[col.key as keyof typeof FileAdapter]
            const isDirectory = item.ext === "d"
            let value = item[col.key as keyof FileModel] as string

            if (typeof operation !== "undefined")
              value = operation(value)


            return <div key={filterIndex} className={classNames("explorer-view-list-body-cell",
              colSize(col, filterIndex))}>
              {col.key === "name" && isDirectory &&
                <span className="icomoon ic-explorer-directory icon-directory"></span>}
              {col.key === "name" && !isDirectory &&
                <span className={classNames("icomoon", "ic-explorer-file-" + item.ext.substring(2), "icon-file")}></span>}
              <span className="label">{value}</span>
            </div>
          })}
        </div>
      })}
    </div>
  </div>
}

export default ExplorerViewList
