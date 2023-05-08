import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { contactSchema } from "utils/contact";
import { z } from "zod";

interface IState {
  contacts: Record<string, IContact>;
}

const getInitialContacts = () => {
  try {
    const local = localStorage.getItem("contacts") || "";
    const json = JSON.parse(local);
    const result = z.record(z.string(), contactSchema).safeParse(json);
    if (!result.success) {
      return {};
    }
    return result.data;
  } catch (error) {
    return {};
  }
};

const initialState: IState = {
  contacts: getInitialContacts(),
};

const contactSlice = createSlice({
  initialState,
  name: "contacts",
  reducers: {
    addContact(state, action: PayloadAction<IContact>) {
      const id = action.payload.id;
      state.contacts[id] = action.payload;
    },
    deleteContact(state, action: PayloadAction<string>) {
      delete state.contacts[action.payload];
    },
    editContact(state, action: PayloadAction<IContact>) {
      const { id, ...contactDetails } = action.payload;
      state.contacts[id] = {
        ...(state.contacts[id] ?? {}),
        ...contactDetails,
        id,
      };
    },
  },
});

export default contactSlice;
export const { addContact, deleteContact, editContact } = contactSlice.actions;
