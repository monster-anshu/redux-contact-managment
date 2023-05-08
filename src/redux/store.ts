import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./contact.slice";
import sidebarSlice from "./sidebar.slice";

const store = configureStore({
  reducer: {
    contact: contactSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
