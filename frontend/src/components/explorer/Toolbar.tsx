import Icon from "../../icon"

type ExplorerToolbarProps = {}

const ExplorerToolbar: React.FC<ExplorerToolbarProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className="explorer-toolbar">
    <div className="explorer-toolbar-view">
      <button type="button" className="explorer-toolbar-view-button" data-type="list">
        <Icon icon="toolbar-view-list" />
      </button>
      <button type="button" className="explorer-toolbar-view-button active" data-type="grid">
        <Icon icon="toolbar-view-grid" />
      </button>
    </div>
    <div className="explorer-toolbar-search">
      <input type="input" placeholder="Search..." className="explorer-toolbar-search-input" />
    </div>
  </div>
}

export default ExplorerToolbar
