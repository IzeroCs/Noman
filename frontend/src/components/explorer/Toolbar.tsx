import Icon from "../../icon"

type ExplorerToolbarProps = {}

const ExplorerToolbar: React.FC<ExplorerToolbarProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className="explorer-toolbar-wrapper">
    <div className="explorer-toolbar">
      <div className="explorer-toolbar-view">
        <button type="button" className="explorer-toolbar-view-button" data-type="list">
          <Icon icon="toolbar-view-list" />
        </button>
        <button type="button" className="explorer-toolbar-view-button active" data-type="grid">
          <Icon icon="toolbar-view-grid" />
        </button>
      </div>
      <button type="button" className="explorer-toolbar-button" data-type="sort">
        <Icon icon="toolbar-button-sort" />
      </button>
      <div className="explorer-toolbar-search">
        <input type="input" placeholder="Tìm kiếm..." className="explorer-toolbar-search-input" />
      </div>
      <div className="explorer-toolbar-action">
        <button type="button" className="explorer-toolbar-action-button" data-type="create">
          <Icon icon="toolbar-action-add" />
        </button>
        <button type="button" className="explorer-toolbar-action-button" data-type="upload">
          <Icon icon="toolbar-action-upload" />
        </button>
      </div>
    </div>
  </div>
}

export default ExplorerToolbar
