import React from "react"
import store from "../../store"
import i18next from "../../i18next"
import { ContextMenuItem } from "../view/ContextMenu"
import { ContextMenuAction } from "../../store/reducers/ContextMenu"

export enum ContextMenuIndexed {
  RENAME = 1,
  COPY = 2,
  CUT = 3,
  DELETE = 4,
  DETAIL = 5,
  FAVORITES = 6,
  SHARE = 7
}

export const ContextMenuList: Array<ContextMenuItem> = [
  {
    tag: ContextMenuIndexed.RENAME,
    title: i18next.t("explorer:view-list.context_menu_rename"),
    icon: "ic-action-rename"
  },
  {
    tag: ContextMenuIndexed.COPY,
    title: i18next.t("explorer:view-list.context_menu_copy"),
    icon: "ic-action-copy"
  },
  {
    tag: ContextMenuIndexed.CUT,
    title: i18next.t("explorer:view-list.context_menu_cut"),
    icon: "ic-action-cut"
  },
  {
    tag: ContextMenuIndexed.DELETE,
    title: i18next.t("explorer:view-list.context_menu_delete"),
    icon: "ic-action-delete"
  },
  {
    tag: ContextMenuIndexed.DETAIL,
    title: i18next.t("explorer:view-list.context_menu_detail"),
    icon: "ic-action-detail",
    divider: true
  },
  {
    tag: ContextMenuIndexed.FAVORITES,
    title: i18next.t("explorer:view-list.context_menu_favorites"),
    icon: "ic-action-favorites"
  },
  {
    tag: ContextMenuIndexed.SHARE,
    title: i18next.t("explorer:view-list.context_menu_share"),
    icon: "ic-action-share"
  }
]

export const ContextMenuDisplay = (event: React.MouseEvent) => {
  const state = store.getState().ContextMenu
  const dispatch = store.dispatch
  const list = ContextMenuList

  if (state.isMenuShow) {
    store.dispatch(ContextMenuAction.setHideMenu())
  }

  setTimeout(() => {
    dispatch(ContextMenuAction.setOffset({ x: event.pageX, y: event.pageY }))
    dispatch(ContextMenuAction.setMenuList({ list }))
    dispatch(ContextMenuAction.setShowMenu())
  }, 100)
}
