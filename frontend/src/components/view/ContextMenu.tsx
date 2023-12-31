import className from "classnames"
import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/Hooks"
import { ContextMenuAction, ContextMenuSelector } from "../../store/reducers/ContextMenu"

export type OnContextMenuItemClick = (
  event: any,
  tag: number,
  index: number,
  children: boolean
) => any

export type ContextMenuItem = {
  tag: number
  title: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  childrens?: Array<ContextMenuChildrenItem>
}

export type ContextMenuChildrenItem = {
  title: string
}

type ContextMenuProps = {}

type ContextMenuItemProps = {
  index: number
  item: ContextMenuItem
}

const ConextMenuItem: React.FC<ContextMenuItemProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div className={className("context-menu-item", props.className)} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

const ContextMenu: React.FC<ContextMenuProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const appDispatch = useAppDispatch()
  const isContextMenuShow = useAppSelector(ContextMenuSelector.isMenuShow)
  const offsetX = useAppSelector(ContextMenuSelector.offsetX)
  const offsetY = useAppSelector(ContextMenuSelector.offsetY)
  const list = useAppSelector(ContextMenuSelector.list)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isHasIcon, setIsHasIcon] = useState(false)

  useEffect(() => {
    const checkClickOn = (): any => appDispatch(ContextMenuAction.setHideMenu())

    window.addEventListener("click", checkClickOn)
    setIsHasIcon(
      list.filter((item) => {
        return typeof item.icon !== "undefined"
      }).length > 0
    )

    const windowWidth = document.documentElement.clientWidth
    const windowHeight = document.documentElement.clientHeight
    const currentHeight = menuRef.current?.offsetHeight || 0
    const currentWidth = menuRef.current?.offsetWidth || 0
    const limitOffsetX = windowWidth - currentWidth * 1.05
    const limitOffsetY = windowHeight - currentHeight * 1.05

    let changeOffsetX = offsetX
    let changeOffsetY = offsetY

    if (changeOffsetX > limitOffsetX) changeOffsetX = limitOffsetX
    if (changeOffsetY > limitOffsetY) changeOffsetY = limitOffsetY
    if (changeOffsetX !== offsetX || changeOffsetY !== offsetY) {
      appDispatch(ContextMenuAction.setOffset({ x: changeOffsetX, y: changeOffsetY }))
    }

    return () => window.removeEventListener("click", checkClickOn)
  }, [setIsHasIcon, list, offsetX, offsetY, appDispatch])

  return (
    <div className={className("context-menu-wrapper", props.className)}>
      <div
        className={className("context-menu", { show: isContextMenuShow })}
        style={{
          top: offsetY + "px",
          left: offsetX + "px"
        }}
        ref={menuRef}
      >
        {list.map((item, index) => {
          return (
            <ConextMenuItem
              key={index}
              index={index}
              item={item}
              className={className({
                disabled: item.disabled,
                divider: item.divider,
                children: item.childrens
              })}
              onClick={(event) => {
                event.preventDefault()
              }}
            >
              {isHasIcon && (
                <span
                  className={className(
                    "context-menu-icon",
                    "icomoon",
                    !item.icon ? "ic-context-menu-invisible invisible" : item.icon
                  )}
                ></span>
              )}
              <span className="context-menu-title">{item.title}</span>

              {item.childrens && (
                <div
                  className="context-menu-children"
                  onClick={() => {
                    console.log("Click")
                  }}
                >
                  {item.childrens.map(
                    (childrenItem: ContextMenuChildrenItem, childrenIndex: number) => {
                      return (
                        <div className="context-menu-children-item" key={childrenIndex}>
                          <span className="context-menu-title">{childrenItem.title}</span>
                        </div>
                      )
                    }
                  )}
                </div>
              )}
            </ConextMenuItem>
          )
        })}
      </div>
    </div>
  )
}

export default ContextMenu
