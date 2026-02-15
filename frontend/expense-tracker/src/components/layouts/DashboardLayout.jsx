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
          {/* Sidebar */}
          <div className="max-[1080px]:hidden">
            <SideMenu
              activeMenu={activeMenu}
              openEditProfile={() => setOpenEditProfile(true)}
            />
          </div>

          {/* Content area with margin to avoid overlap */}
          <div className="grow ml-64 mx-5">{children}</div>
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
