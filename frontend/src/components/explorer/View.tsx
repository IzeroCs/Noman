import Icon from "../../icon"
import ExplorerViewGrid from "./view/Grid"
import ExplorerViewList, { FilterColumn } from "./view/List"

type ExplorerViewProps = {
  type?: "grid" | "list"
}

const filterColumns: Array<FilterColumn> = [
  { label: "Name" }, { label: "Size" },
  { label: "FileType", size: "medium" },
  { label: "Owner", size: "large" }
]

const ExplorerView: React.FC<ExplorerViewProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const type = props.type || "list"

  return <div className="explorer-view-wrapper">
    {type === "list" ? <ExplorerViewList filterColumns={filterColumns} /> : <ExplorerViewGrid />}
  </div>
}

export default ExplorerView
