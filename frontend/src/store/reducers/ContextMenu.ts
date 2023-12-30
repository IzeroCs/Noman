import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { ContextMenuItem } from "../../components/view/ContextMenu"

export type ConextMenuState = {
  isMenuShow: boolean
  offsetX: number
  offsetY: number
  list: Array<ContextMenuItem>
}

const initialState: ConextMenuState = {
  isMenuShow: false,
  offsetX: 0,
  offsetY: 0,
  list: Array(0)
}

export const ContextMenu = createSlice({
  name: "ContextMenu",
  initialState,
  reducers: {
    setShowMenu: (state) => {
      state.isMenuShow = true
    },
    setHideMenu: (state) => {
      state.isMenuShow = false
    },
    setOffset: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.offsetX = action.payload.x
      state.offsetY = action.payload.y
    },

    setMenuList: (state, action: PayloadAction<{ list: Array<ContextMenuItem> }>) => {
      state.list = action.payload.list
    }
  }
})

export const ContextMenuSelector = {
  isMenuShow: (state: RootState) => state.ContextMenu.isMenuShow,
  offsetX: (state: RootState) => state.ContextMenu.offsetX,
  offsetY: (state: RootState) => state.ContextMenu.offsetY,
  list: (state: RootState) => state.ContextMenu.list
}

export const ContextMenuAction = {
  setShowMenu: ContextMenu.actions.setShowMenu,
  setHideMenu: ContextMenu.actions.setHideMenu,
  setOffset: ContextMenu.actions.setOffset,
  setMenuList: ContextMenu.actions.setMenuList
}

export default ContextMenu.reducer
