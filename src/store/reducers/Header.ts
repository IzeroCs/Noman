import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

export type HeaderState = {
  title: string
}

const initialState: HeaderState = {
  title: "Noman Cloud",
}

export const Header = createSlice({
  name: "Header", initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title
    }
  }
})

export const HeaderSelector = {
  title: (state: RootState) => state.Header.title
}

export const HeaderAction = {
  setTitle: Header.actions.setTitle
}

export default Header.reducer
