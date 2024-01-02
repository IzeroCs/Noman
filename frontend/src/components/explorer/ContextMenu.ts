import React from "react"
import store from "../../store"
import i18next from "../../i18next"
import { ContextMenuItem } from "../view/ContextMenu"
import { ContextMenuAction } from "../../store/reducers/ContextMenu"

export enum ContextMenuTag {
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
    tag: ContextMenuTag.RENAME,
    title: i18next.t("explorer:view-list.context_menu_rename"),
    icon: "ic-action-rename"
  },
  {
    tag: ContextMenuTag.COPY,
    title: i18next.t("explorer:view-list.context_menu_copy"),
    icon: "ic-action-copy"
  },
  {
    tag: ContextMenuTag.CUT,
    title: i18next.t("explorer:view-list.context_menu_cut"),
    icon: "ic-action-cut"
  },
  {
    tag: ContextMenuTag.DELETE,
    title: i18next.t("explorer:view-list.context_menu_delete"),
    icon: "ic-action-delete"
  },
  {
    tag: ContextMenuTag.DETAIL,
    title: i18next.t("explorer:view-list.context_menu_detail"),
    icon: "ic-action-detail",
    divider: true
  },
  {
    tag: ContextMenuTag.FAVORITES,
    title: i18next.t("explorer:view-list.context_menu_favorites"),
    icon: "ic-action-favorites"
  },
  {
    tag: ContextMenuTag.SHARE,
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
