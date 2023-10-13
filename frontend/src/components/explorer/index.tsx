import ExplorerToolbar from "./Toolbar"

type ExplorerProps = {}

const Explorer: React.FC<ExplorerProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className="explorer-wrapper">
    <ExplorerToolbar />
  </div>
}

export default Explorer
