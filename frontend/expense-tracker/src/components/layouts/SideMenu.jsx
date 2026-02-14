// SideMenu.jsx
import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { DeleteAlert } from "./DeleteAlert";
import Modal from "../Modal";

const SideMenu = ({ activeMenu, openEditProfile = () => {} }) => {
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);

  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/edit-profile") {
      openEditProfile();
      return;
    }

    if (route === "logout") {
      setOpenLogoutAlert(true);
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-5 flex flex-col">

      {/* User info */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium">
          {user?.fullName}
        </h5>
      </div>

      {/* Menu items */}
      <div className="flex flex-col">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition ${
              activeMenu === item.label
                ? "text-white bg-primary"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout modal */}
      <Modal
        isOpen={openLogoutAlert}
        onClose={() => setOpenLogoutAlert(false)}
        title="Logout"
      >
        <DeleteAlert
          content="Are you sure you want to logout?"
          onDelete={handleLogout}
        />
      </Modal>
    </div>
  );
};

export default SideMenu;
