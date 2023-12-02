import { OnDirectoryClickCallback, OnFileClickCallback } from "."
import i18next from "../../i18next"
import FileModel from "./model/File"
import ExplorerViewGrid from "./view/Grid"
import ExplorerViewList, { FilterColumn } from "./view/List"

type ExplorerViewProps = {
  type?: "grid" | "list"
  files: Array<FileModel>
  onDirectoryClick?: OnDirectoryClickCallback
  onFileClick?: OnFileClickCallback
}

const filterColumns: Array<FilterColumn> = [
  { key: "name", label: i18next.t("explorer:header.name") },
  { key: "size", label: i18next.t("explorer:header.size") },
  {
    key: "extension",
    label: i18next.t("explorer:header.extension"),
    size: "small"
  },
  {
    key: "created_time",
    label: i18next.t("explorer:header.created_time"),
    size: "medium"
  }
]

const ExplorerView: React.FC<
  ExplorerViewProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const type = props.type || "list"

  return (
    <div className="explorer-view-wrapper">
      {type === "list" ? (
        <ExplorerViewList
          filterColumns={filterColumns}
          fileModels={props.files}
          onDirectoryClick={props.onDirectoryClick}
          onFileClick={props.onFileClick}
        />
      ) : (
        <ExplorerViewGrid />
      )}
    </div>
  )
}

export default ExplorerView
