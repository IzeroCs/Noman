import { useContext } from "react"
import { OnDirectoryClickCallback, OnFileClickCallback } from "."
import { FilterColumnList } from "./FilterColumn"
import FileModel from "./model/File"
import ExplorerViewGrid from "./view/Grid"
import ExplorerViewList from "./view/List"
import { MainContext } from "../include/Main"

type ExplorerViewProps = {
  type?: "grid" | "list"
  files: Array<FileModel>
  onDirectoryClick?: OnDirectoryClickCallback
  onFileClick?: OnFileClickCallback
}

const ExplorerView: React.FC<ExplorerViewProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const type = props.type || "list"

  return (
    <div className="explorer-view-wrapper">
      {type === "list" ? (
        <ExplorerViewList
          filterColumns={FilterColumnList}
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
