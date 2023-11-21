import classNames from "classnames"
import Icon from "../../icon"

type ExplorerBreadcrumbProps = {
  list: Array<string>
}

const ExplorerBreadcrumb: React.FC<ExplorerBreadcrumbProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const endIndex = props.list.length - 1

  return <div className="explorer-breadcrumb-wrapper">
    <ul className="explorer-breadcrumb">
      {props.list.map((item, index) => {
        return <li className="explorer-breadcrumb-item" key={index}>
          <span className={classNames("explorer-breadcrumb-label",
            index === endIndex ? "current" : "")}>{item}</span>
        </li>
      })}
    </ul>
  </div>
}

export default ExplorerBreadcrumb
