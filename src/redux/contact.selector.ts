import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const contactState = (state: RootState) => state.contact;

export const contactMap = createSelector(contactState, state => state.contacts);

export const contactArray = createSelector(contactMap, contactMap => {
  const contacts: IContact[] = [];
  for (let [, value] of Object.entries(contactMap)) {
    contacts.push(value);
  }
  return contacts;
});

export const contactById = (id: string) =>
  createSelector(contactMap, contactMap => contactMap[id]);
