import logo from "../../assets/icon/logo.svg"
import Icon from "../../icon"
import { useAppSelector } from "../../store/Hooks"
import { HeaderSelector } from "../../store/reducers/Header"

type HeaderProps = {}

const Header: React.FC<HeaderProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const title = useAppSelector(HeaderSelector.title)

  return <header className="header">
    <img src={logo} alt={title} className="header-logo" />
    <p className="header-title">{title}</p>
    <div className="header-action">
      <button type="button" className="header-button" title="Person">
        <Icon icon="user" className="header-icon" />
      </button>
    </div>
  </header>
}

export default Header
