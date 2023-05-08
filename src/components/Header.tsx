import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { toggleSidebar } from "redux/sidebar.slice";

export interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { pathname } = location;

  const handleClick = () => {
    dispatch(toggleSidebar(true));
  };
  return (
    <header className="flex items-center justify-center w-full px-4 py-4 bg-primary h-fit">
      <button className="text-white md:hidden" onClick={handleClick}>
        <GiHamburgerMenu />
      </button>
      <p className="flex-1 text-lg font-medium text-center text-white sm:text-2xl">
        {pathname.startsWith("/edit")
          ? "Edit Contact"
          : Labels[pathname] ?? "Page name not found"}
      </p>
    </header>
  );
};

const Labels = {
  "/add": "Create Contact",
  "/": "Contact Managment System With Redux",
  "/charts": "Covid Data",
} as Record<string, string>;

export default Header;
