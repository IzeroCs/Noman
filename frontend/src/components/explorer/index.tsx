import ExplorerBreadcrumb, {
  OnLoadingTransitionEndCallback
} from "./Breadcrumb"
import ExplorerToolbar from "./Toolbar"
import ExplorerView from "./View"
import useAxios from "axios-hooks"
import { useEffect, useState } from "react"
import FileModel from "./model/File"
import { FileSystem } from "../../core/file/FileSystem"

export interface OnDirectoryClickCallback {
  onDirectoryClick(fileModel: FileModel): any
}

export interface OnFileClickCallback {
  onFileClick(fileModel: FileModel): any
}

export interface OnBreadcrumbClickCallback {
  onBreadcrumbClick(pathFetch: string): any
}

type ExplorerProps = {}
type ExplorerScanModel = {
  message: string
  path: string
  list: Array<FileModel>
}

const Explorer: React.FC<
  ExplorerProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const url = "/files/scan"
  const [files, setFiles] = useState(Array<FileModel>)
  const [pathCurrent, setPathCurrent] = useState("")
  const [loadingWidth, setLoadingWidth] = useState(0)
  const [loadingOpacity, setLoadingOpacity] = useState(0)
  const [{}, axiosExecute, axiosCancel] = useAxios(url, {
    manual: true,
    autoCancel: false
  })

  const axiosFetch = (pathScan?: string) => {
    let axiosUrl = url
    let pathFetch = FileSystem.formatSeperator(pathScan || "")

    setLoadingOpacity(0.7)
    setLoadingWidth(30)

    if (pathFetch && pathFetch.length > 0)
      axiosUrl = `${axiosUrl}?path=${pathFetch}`

    setLoadingOpacity(0.4)
    setLoadingWidth(60)

    axiosExecute(axiosUrl)
      .then((res) => {
        const data: ExplorerScanModel = res.data

        setFiles(data.list)
        setPathCurrent(data.path)
        setLoadingOpacity(0)
        setLoadingWidth(100)
      })
      .catch((err) => {
        setLoadingOpacity(0)
        setLoadingWidth(100)
      })
  }

  const onDirectoryClick: OnDirectoryClickCallback = {
    onDirectoryClick(fileModel: FileModel) {
      axiosFetch(pathCurrent + FileSystem.SEPERATOR + fileModel.name)
    }
  }

  const onFileClick: OnFileClickCallback = {
    onFileClick(fileModel: FileModel) {
      console.log("File click", fileModel.name)
    }
  }

  const onBreadcrumbClick: OnBreadcrumbClickCallback = {
    onBreadcrumbClick(pathFetch: string) {
      axiosFetch(pathFetch)
    }
  }

  const onLoadingTransitionEnd: OnLoadingTransitionEndCallback = {
    onLoadingTransitionEnd(event: any) {
      if (loadingWidth >= 100) {
        setLoadingWidth(0)
      } else if (loadingWidth <= 0) {
        setLoadingOpacity(1)
      }
    }
  }

  useEffect(() => {
    axiosFetch()
  }, [axiosExecute])

  return (
    <div className="explorer-wrapper">
      <ExplorerToolbar />
      <ExplorerBreadcrumb
        pathCurrent={pathCurrent}
        loadingWidth={loadingWidth}
        loadingOpacity={loadingOpacity}
        onBreadcrumbClick={onBreadcrumbClick}
        onLoadingTransitionEnd={onLoadingTransitionEnd}
      />
      <ExplorerView
        files={files}
        onDirectoryClick={onDirectoryClick}
        onFileClick={onFileClick}
      />
    </div>
  )
}

export default Explorer
