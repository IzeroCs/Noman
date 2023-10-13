import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import Header from "./reducers/Header"
import ContextMenu from "./reducers/ContextMenu"

const store = configureStore({
  reducer: {
    Header, ContextMenu
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, RootState, unknown, Action<string>
>

export default store
