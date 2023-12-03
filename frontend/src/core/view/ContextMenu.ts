import React from "react"
import { ContextMenuItem } from "../../components/view/ContextMenu"
import store from "../../store"
import { ContextMenuAction } from "../../store/reducers/ContextMenu"

export namespace ContextMenu {
  export const displayMenuList = (
    event: React.MouseEvent,
    list: Array<ContextMenuItem>
  ) => {
    const state = store.getState().ContextMenu
    const dispatch = store.dispatch

    if (state.isMenuShow) {
      store.dispatch(ContextMenuAction.setHideMenu())
    }

    setTimeout(() => {
      dispatch(ContextMenuAction.setOffset({ x: event.pageX, y: event.pageY }))
      dispatch(ContextMenuAction.setMenuList({ list }))
      dispatch(ContextMenuAction.setShowMenu())
    }, 100)
  }
}
