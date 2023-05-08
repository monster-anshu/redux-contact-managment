import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { contactMap } from "redux/contact.selector";
import { RootState } from "redux/store";

export interface ILocalStorageProps {
  contacts: Record<number, IContact>;
}

const LocalStorage: FC<ILocalStorageProps> = ({ contacts }) => {
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  return null;
};

const mapStateToProps = (state: RootState) => ({
  contacts: contactMap(state),
});

export default connect(mapStateToProps)(LocalStorage);
