import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import EditProfile from "./EditProfile";

const Navbar = ({ activeMenu, onOpenEditProfile }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <div className="flex gap-5 bg-white border-b border-gray-200 py-4 px-7 sticky top-0 z-30">

        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-black">
          Expense Tracker
        </h2>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 bg-white z-40 shadow-lg">
          <SideMenu
            activeMenu={activeMenu}
            openEditProfile={() => {
              onOpenEditProfile();
              setOpenSideMenu(false);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
