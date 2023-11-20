import Icon from "../../icon"
import ExplorerViewGrid from "./view/Grid"
import ExplorerViewList from "./view/List"

type ExplorerViewProps = {
  type?: "grid" | "list"
}

const ExplorerView: React.FC<ExplorerViewProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const type = props.type || "list"

  return <div className="explorer-view-wrapper">
    {type === "list" ? <ExplorerViewList /> : <ExplorerViewGrid />}
  </div>
}

export default ExplorerView
