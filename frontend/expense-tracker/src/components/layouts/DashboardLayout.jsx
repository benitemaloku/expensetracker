import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import EditProfile from "./EditProfile";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [openEditProfile, setOpenEditProfile] = useState(false);

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar
        activeMenu={activeMenu}
        onOpenEditProfile={() => setOpenEditProfile(true)}
      />

      {user ? (
        <div className="flex">
          {/* Sidebar desktop */}
          <div className="hidden lg:block">
            <SideMenu
              activeMenu={activeMenu}
              openEditProfile={() => setOpenEditProfile(true)}
            />
          </div>

          {/* Content area */}
          <div className="grow mx-5">{children}</div>
        </div>
      ) : null}

      <EditProfile
        isOpen={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
      />
    </div>
  );
};

export default DashboardLayout;
