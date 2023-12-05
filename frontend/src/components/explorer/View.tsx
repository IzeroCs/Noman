import { OnDirectoryClickCallback, OnFileClickCallback } from "."
import { ContextMenu } from "../../core/view/ContextMenu"
import i18next from "../../i18next"
import { ContextMenuItem } from "../view/ContextMenu"
import FileModel from "./model/File"
import ExplorerViewGrid from "./view/Grid"
import ExplorerViewList, { FilterColumn } from "./view/List"

export type OnContextMenuClickCallback = (
  event: any,
  fileModel: FileModel,
  index: number
) => any

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

const contextMenuLists: Array<ContextMenuItem> = [
  {
    title: i18next.t("explorer:view-list.context_menu_rename"),
    icon: "ic-action-rename"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_copy"),
    icon: "ic-action-copy"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_cut"),
    icon: "ic-action-cut"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_delete"),
    icon: "ic-action-delete"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_detail"),
    icon: "ic-action-detail",
    divider: true
  },
  {
    title: i18next.t("explorer:view-list.context_menu_favorites"),
    icon: "ic-action-favorites"
  },
  {
    title: i18next.t("explorer:view-list.context_menu_share"),
    icon: "ic-action-share"
  }
]

const ExplorerView: React.FC<
  ExplorerViewProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const type = props.type || "list"

  const onContextMenuClick: OnContextMenuClickCallback = (
    event: any,
    fileModel: FileModel,
    index: number
  ): any => {
    ContextMenu.displayMenuList(event, contextMenuLists)
  }

  return (
    <div className="explorer-view-wrapper">
      {type === "list" ? (
        <ExplorerViewList
          filterColumns={filterColumns}
          fileModels={props.files}
          onDirectoryClick={props.onDirectoryClick}
          onFileClick={props.onFileClick}
          onContextMenuClick={onContextMenuClick}
        />
      ) : (
        <ExplorerViewGrid />
      )}
    </div>
  )
}

export default ExplorerView
