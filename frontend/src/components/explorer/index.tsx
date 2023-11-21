import ExplorerBreadcrumb from "./Breadcrumb"
import ExplorerToolbar from "./Toolbar"
import ExplorerView from "./View"

type ExplorerProps = {}

const breadcrumb = ["Home", "IzeroCs", "Downloads"]

const Explorer: React.FC<ExplorerProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className="explorer-wrapper">
    <ExplorerToolbar />
    <ExplorerBreadcrumb list={breadcrumb} />
    <ExplorerView />
  </div>
}

export default Explorer
