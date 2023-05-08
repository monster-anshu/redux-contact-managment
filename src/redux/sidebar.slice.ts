import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  show: boolean;
}

const initialState: IState = {
  show: false,
};

const sidebarSlice = createSlice({
  initialState,
  name: "sidebar",
  reducers: {
    toggle(state, action: PayloadAction<boolean | undefined>) {
      const cmd = action.payload;
      if (typeof cmd !== "boolean") {
        state.show = !state.show;
        return;
      }
      state.show = cmd;
    },
  },
});

export default sidebarSlice;

export const { toggle: toggleSidebar } = sidebarSlice.actions;
