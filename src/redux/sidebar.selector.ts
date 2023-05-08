import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const sidebarState = (state: RootState) => state.sidebar;

export const showSidebar = createSelector(
  sidebarState,
  sidebarState => sidebarState.show
);
