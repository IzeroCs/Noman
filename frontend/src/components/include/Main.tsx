import { createContext, useState } from "react"
import { OnContextMenuItemClick } from "../view/ContextMenu"

type MainProps = {}

const onContextMenuClick = () => {}
const setOnContextMenuClick = (value?: OnContextMenuItemClick) => {}

export const MainContext = createContext({ onContextMenuClick, setOnContextMenuClick })

const Main: React.FC<MainProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [onContextMenuClick, setOnContextMenuClick] = useState<OnContextMenuItemClick | any>(null)
  const providers = {
    onContextMenuClick: (): any => onContextMenuClick,
    setOnContextMenuClick: (value?: OnContextMenuItemClick): any => {
      setOnContextMenuClick(value)
    }
  }

  return (
    <MainContext.Provider value={providers}>
      <main className="main-wrapper">{props.children}</main>
    </MainContext.Provider>
  )
}

export default Main
