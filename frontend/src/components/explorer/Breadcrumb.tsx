import classNames from "classnames"

type ExplorerBreadcrumbProps = {
  list: Array<string>
}

const ExplorerBreadcrumb: React.FC<
  ExplorerBreadcrumbProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const endIndex = props.list.length - 1

  return (
    <div className="explorer-breadcrumb-wrapper">
      <ul className="explorer-breadcrumb-list">
        {props.list.map((item, index) => {
          return (
            <li className="explorer-breadcrumb-list-item" key={index}>
              <span
                className={classNames(
                  "explorer-breadcrumb-list-label",
                  index === endIndex ? "current" : ""
                )}
              >
                {item}
              </span>
            </li>
          )
        })}
      </ul>
      <div className="explorer-breadcrumb-loading"></div>
    </div>
  )
}

export default ExplorerBreadcrumb
