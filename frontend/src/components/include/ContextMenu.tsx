import React, { useEffect, useState } from "react"
import className from "classnames"
import { useAppDispatch, useAppSelector } from "../../store/Hooks"
import { ContextMenuAction, ContextMenuSelector } from "../../store/reducers/ContextMenu"

export type OnContextMenuCallback = (e: React.MouseEvent,
  list: Array<IContextMenuEntry>) => any

export interface IContextMenuEntry {
  title: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  children?: Array<IContextMenuChildrenEntry>
}

export interface IContextMenuChildrenEntry {
  title: string
}

type ContextMenuEntryProps = {
  index: number
  entry: IContextMenuEntry
}

type ContextMenuProps = {}

const ContextMenyNode: React.FC<ContextMenuEntryProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return <div className={className("context-menu-node",
    props.className)}
  >{props.children}</div>
}

const ContextMenu: React.FC<ContextMenuProps &
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const appDispatch = useAppDispatch()
  const isMenuShow = useAppSelector(ContextMenuSelector.isMenuShow)
  const offsetX = useAppSelector(ContextMenuSelector.offsetX)
  const offsetY = useAppSelector(ContextMenuSelector.offsetY)
  const list = useAppSelector(ContextMenuSelector.list)
  const [isHasIcon, setIsHasIcon] = useState(false)

  useEffect(() => {
    const checkClickOn = () => appDispatch(ContextMenuAction.setHideMenu())

    window.addEventListener("click", checkClickOn)
    setIsHasIcon(list.filter((entry) =>
      typeof entry.icon !== "undefined").length > 0)

    return () => window.removeEventListener("click", checkClickOn)
  }, [setIsHasIcon, list, appDispatch])

  return <div className={className("context-menu",
    { "show": isMenuShow }, props.className)} style={{
      top: offsetY + "px", left: offsetX + "px"
    }}
  >
    {list.map((entry, index) => {
      return <ContextMenyNode
        key={index}
        index={index}
        entry={entry}
        className={className({
          "disabled": entry.disabled,
          "divider": entry.divider,
          "children": entry.children
        })}
      >
        {isHasIcon && <span className={className("context-menu-icon", "icomoon",
          !entry.icon ? "ic-zero invisible" : entry.icon)}></span>}
        <span className="context-menu-title">{entry.title}</span>

        {entry.children && <div className="context-menu-children" onClick={() => { console.log("Click") }}>
          {entry.children.map((childrenEntry, childrenIndex) => {
            return <div className="context-menu-children-entry"
              key={childrenIndex}>
              <span className="context-menu-title">{childrenEntry.title}</span>
            </div>
          })}
        </div>}
      </ContextMenyNode>
    })}
  </div>
}

export default ContextMenu
