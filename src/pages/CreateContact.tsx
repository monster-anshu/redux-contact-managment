import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addContact } from "redux/contact.slice";
import { useAppDispatch } from "redux/hooks";
import { contactSchema } from "utils/contact";

export interface ICreateContactProps {}

const CreateContact: FC<ICreateContactProps> = () => {
  const [details, setDetails] = useState<IContact>({
    firstName: "",
    lastName: "",
    id: Math.random() + "", // auto genrate id
    status: "ACTIVE",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({} as Record<string, string>);
  const dispatch = useAppDispatch();

  const handleChange = (event: {
    target: {
      value: string;
      name: string;
    };
  }) => {
    const { name, value } = event.target;
    setDetails(curr => ({ ...curr, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const validation = validate();
    if (!validation.success) {
      return;
    }
    const details = validation.data;
    dispatch(addContact(details));
    navigate("/");
  };

  const validate = () => {
    const result = contactSchema.safeParse(details);

    if (result.success) {
      setErrors({});
      return {
        success: true as const,
        data: result.data,
      };
    }
    const errToSet: typeof errors = {};
    const err = result.error.formErrors.fieldErrors;
    for (let [key, value] of Object.entries(err)) {
      const currError = (value as string[])?.[0];
      if (currError) errToSet[key] = currError;
    }
    setErrors(errToSet);
    return {
      errors: errToSet,
      success: false as const,
    };
  };

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-20">
      <p className="text-xl font-medium text-center md:text-3xl">
        Create Contact Screen
      </p>
      <form
        onSubmit={handleSubmit}
        className="p-4 grid sm:grid-cols-[auto_1fr] gap-2 rounded shadow-md bg-slate-200 w-full max-w-xl"
      >
        <label htmlFor="first_name">First Name :</label>
        <input
          type="text"
          value={details.firstName}
          name="firstName"
          id="first_name"
          className="px-2 py-1 border border-black rounded"
          onChange={handleChange}
        />
        <p className="error">{errors.firstName}</p>
        <label htmlFor="last_name">Last Name :</label>
        <input
          value={details.lastName}
          name="lastName"
          type="text"
          id="last_name"
          className="px-2 py-1 border border-black rounded"
          onChange={handleChange}
        />
        <p className="error">{errors.lastName}</p>

        <label htmlFor="last_name">Status :</label>
        <div>
          <div>
            Active :
            <input
              type="radio"
              value={"ACTIVE"}
              name="status"
              onChange={handleChange}
              className="ml-2"
              checked={details.status === "ACTIVE"}
            />
          </div>
          <div>
            Inactive :
            <input
              type="radio"
              value={"INACTIVE"}
              name="status"
              onChange={handleChange}
              className="ml-2"
              checked={details.status === "INACTIVE"}
            />
          </div>
        </div>
        <p className="error">{errors.status}</p>

        <button className="block px-2 py-1 mx-auto mt-4 font-medium text-white border rounded col-span-full bg-primary text-">
          Create Contact
        </button>
      </form>
    </div>
  );
};
export default CreateContact;
