import { FC } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { contactArray } from "redux/contact.selector";
import { deleteContact } from "redux/contact.slice";
import { useAppDispatch } from "redux/hooks";
import { RootState } from "redux/store";

export interface IContactProps {
  contacts: IContact[];
}

const Contact: FC<IContactProps> = ({ contacts }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  if (!contacts.length) return <NoContacts />;

  return (
    <div className="px-6 py-10 ">
      <button className="block px-6 py-1 mx-auto mb-4 font-medium text-white border rounded text-xll col-span-full bg-primary">
        <Link to={"/add"}>Create Contact</Link>
      </button>
      <div className="flex flex-wrap gap-2">
        {contacts.map(item => (
          <div
            key={item.id}
            className="p-4 grid flex-grow gap-4 grid-rows-[1fr_auto] text-center  rounded shadow-md bg-slate-300 "
          >
            <div>
              <p className="text-2xl font-medium">
                {item.firstName} {item.lastName}
              </p>
              <p>{item.status}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <Link to={`/edit/${item.id}`}>
                <button className="w-full p-2 text-white bg-green-500 rounded">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-white bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NoContacts = () => (
  <div className="flex flex-col items-center justify-center h-full gap-5 ">
    <Link className="text-center " to={"/add"}>
      <button className="block px-2 py-1 mx-auto font-medium text-white border rounded bg-primary text-">
        Create Contact
      </button>
    </Link>
    <div className="flex items-start gap-2 p-3 border-2 rounded shadow-md bg-slate-200">
      <RxCrossCircled className="text-5xl " />
      <p className="text-3xl ">
        No Contact Found
        <br />
        Please add contact from <br />
        Create Contact Button
      </p>
    </div>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  contacts: contactArray(state),
});

export default connect(mapStateToProps)(Contact);
