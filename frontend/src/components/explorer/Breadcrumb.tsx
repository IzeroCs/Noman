import i18next from "i18next"
import { useEffect } from "react"
import { FileSystem } from "../../core/file/FileSystem"
import { useState } from "react"
import { OnBreadcrumbClickCallback } from "./index"

export type OnLoadingTransitionEndCallback = (event: any) => any

type ExplorerBreadcrumbProps = {
  pathCurrent: string
  loadingPercent?: number
  loadingWidth?: number | 0
  loadingOpacity?: number | 1
  onBreadcrumbClick?: OnBreadcrumbClickCallback
  onLoadingTransitionEnd?: OnLoadingTransitionEndCallback
}

const ExplorerBreadcrumb: React.FC<
  ExplorerBreadcrumbProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [list, setList] = useState(Array<string>)

  const onBreadcrumbClick = (event: any, itemIndex: number) => {
    const pathFetch = FileSystem.formatSeperator(
      list
        .filter((value, index) => index > 0 && index <= itemIndex)
        .join(FileSystem.SEPERATOR)
    )

    event.preventDefault()

    if (props.onBreadcrumbClick) {
      props.onBreadcrumbClick(pathFetch)
    }
  }

  useEffect(() => {
    const pathCurrent = FileSystem.formatSeperator(props.pathCurrent)
    const pathSplit: Array<string> =
      pathCurrent.length <= 0 ? [] : pathCurrent.split(FileSystem.SEPERATOR)

    pathSplit.unshift(i18next.t("explorer:breadcrumb.home"))
    setList(pathSplit)
  }, [setList, props.pathCurrent])

  return (
    <div className="explorer-breadcrumb-wrapper">
      <ul className="explorer-breadcrumb-list">
        {list.map((item, index) => {
          return (
            <li className="explorer-breadcrumb-list-item" key={index}>
              <span
                className="explorer-breadcrumb-list-label"
                onClick={(event) => onBreadcrumbClick(event, index)}
              >
                {item}
              </span>
            </li>
          )
        })}
      </ul>
      <div
        className="explorer-breadcrumb-loading"
        style={{
          width: props.loadingWidth + "%",
          opacity: props.loadingOpacity
        }}
        onTransitionEnd={props.onLoadingTransitionEnd}
      ></div>
    </div>
  )
}

export default ExplorerBreadcrumb
