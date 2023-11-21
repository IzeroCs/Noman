import classNames from "classnames"

export type FilterColumn = {
  label: string
  show?: boolean
  size?: "small" | "medium" | "large" | "stretch" | undefined
}

type ExplorerViewListProps = {
  filterColumns: Array<FilterColumn>
}

const ExplorerViewList: React.FC<ExplorerViewListProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const filterColumns = props.filterColumns
    .filter(col => typeof col.show === "undefined" || col.show === true)
  const hasColumnStretch = filterColumns
    .find(col => col.size === "stretch")

  return <div className="explorer-view-list">
    <div className="explorer-view-list-header-row">
      {filterColumns.map((col, index) => {
        let colSize = col.size || "small"

        if ((!hasColumnStretch && index === 0) || colSize === "stretch")
          colSize = "stretch"

        return <div key={index} className={classNames("explorer-view-list-header-cell",
          colSize)}>{col.label}</div>
      })}
    </div>

    <div className="explorer-view-list-body">
      {Array(20).fill(undefined).map((v, i) => {
        return <div className="explorer-view-list-body-row" key={i}>
          <div className="explorer-view-list-body-cell stretch">Downloads</div>
          <div className="explorer-view-list-body-cell small">6.2kb</div>
          <div className="explorer-view-list-body-cell medium">Directory</div>
          <div className="explorer-view-list-body-cell large">IzeroCs</div>
        </div>
      })}
    </div>
  </div>
}

export default ExplorerViewList
