import { FC } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { connect } from "react-redux";
import { RootState } from "redux/store";
import { showSidebar } from "redux/sidebar.selector";
import { toggleSidebar } from "redux/sidebar.slice";

export interface ISideBarProps {
  show: boolean;
  toggle: (value?: boolean) => void;
}

const SideBar: FC<ISideBarProps> = ({ show, toggle }) => {
  const handleClose = () => {
    toggle(false);
  };

  return (
    <section
      style={{
        translate: show ? "0" : "-100%",
      }}
      className="fixed top-0 left-0 z-10 h-screen p-4 transition-all duration-100 bg-white shadow-2xl md:static sidebar w-72 md:h-full "
    >
      <button
        onClick={handleClose}
        aria-label="Hide Sidebar"
        className="block mb-5 ml-auto text-2xl font-medium md:hidden"
      >
        <AiOutlineLeft />
      </button>
      <ul className="grid grid-cols-1 gap-2 ">
        {linkes.map((item, index) => (
          <Link
            to={item.href}
            key={index}
            className="p-2 font-medium border rounded "
            onClick={handleClose}
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </section>
  );
};

const linkes = [
  {
    label: "Contact",
    href: "/",
  },
  {
    label: "Add Contact",
    href: "/add",
  },
  {
    label: "Charts",
    href: "/charts",
  },
];
const mapStateToProps = (state: RootState) => ({
  show: showSidebar(state),
});

const mapDispatchToProps = {
  toggle: toggleSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
