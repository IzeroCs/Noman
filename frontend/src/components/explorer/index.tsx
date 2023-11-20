import ExplorerBreadcrumb from "./Breadcrumb"
import ExplorerToolbar from "./Toolbar"
import ExplorerView from "./View"

type ExplorerProps = {}

const Explorer: React.FC<ExplorerProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className="explorer-wrapper">
    <ExplorerToolbar />
    <ExplorerBreadcrumb />
    <ExplorerView />
  </div>
}

export default Explorer
