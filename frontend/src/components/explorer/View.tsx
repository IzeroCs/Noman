import i18next from "../../i18next"
import FileModel from "./model/File"
import ExplorerViewGrid from "./view/Grid"
import ExplorerViewList, { FilterColumn } from "./view/List"

type ExplorerViewProps = {
  type?: "grid" | "list"
}

const filterColumns: Array<FilterColumn> = [
  { key: "name", label: i18next.t("explorer:header.name") },
  { key: "size", label: i18next.t("explorer:header.size") },
  { key: "ext", label: i18next.t("explorer:header.ext"), size: "small" },
  { key: "created_date", label: i18next.t("explorer:header.created_date"), size: "medium" },
  { key: "owner", label: i18next.t("explorer:header.owner"), size: "small" }
]

const arrayModel: Array<FileModel> = [
  { name: "Downloads", size: 0, ext: "d", owner: "IzeroCs", created_date: 1720841388 },
  { name: "Documents", size: 0, ext: "d", owner: "IzeroCs", created_date: 1710841388 },
  { name: "Pictures", size: 0, ext: "d", owner: "IzeroCs", created_date: 1709841388 },
  { name: "Videos", size: 0, ext: "d", owner: "IzeroCs", created_date: 1780841388 },
  { name: "usbdriveinfo.zip", size: 4254450, ext: "f:archive", owner: "IzeroCs", created_date: 1770841388 },
  { name: "didennoicogio.png", size: 325450, ext: "f:picture", owner: "IzeroCs", created_date: 1500841388 },
  { name: "tailieu.txt", size: 12254450, ext: "f:text", owner: "IzeroCs", created_date: 1750841388 },
  { name: "phimtailieu.mp4", size: 14502489, ext: "f:video", owner: "IzeroCs", created_date: 1703841388 },
  { name: "WhatMakeYouBeautiful.mp4", size: 45502489, ext: "f:music", owner: "IzeroCs", created_date: 1702841388 },
  { name: "NoMan.iso", size: 14502489, ext: "f:unknown", owner: "IzeroCs", created_date: 1760841388 }
]

const ExplorerView: React.FC<ExplorerViewProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const type = props.type || "list"

  return <div className="explorer-view-wrapper">
    {type === "list" ? <ExplorerViewList
      filterColumns={filterColumns}
      fileModels={arrayModel} /> : <ExplorerViewGrid />}
  </div>
}

export default ExplorerView
