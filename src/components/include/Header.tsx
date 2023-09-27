import className from "classnames"
import { useAppSelector } from "../../store/Hooks"
import { HeaderSelector } from "../../store/reducers/Header"

type HeaderProps = {}

const Header: React.FC<HeaderProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const title = useAppSelector(HeaderSelector.title)

  return <header className="header">
    <p className="header-title">{title}</p>
  </header>
}

export default Header
