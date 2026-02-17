import React, { useState, useContext, useEffect } from "react";
import Modal from "../Modal";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserProvider";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import Input from "../Inputs/Input";

const EditProfile = ({ isOpen, onClose }) => {
  const { user, updateUser } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setImage(user.profileImageUrl || null); 
    }
  }, [user, isOpen]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);

      if (image && typeof image === "object") {
        formData.append("profileImage", image);
      }

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_USER,
        formData
      );

      if (response.status === 200) {
        updateUser(response.data.user);
        onClose();
      }
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data || err.message
      );
      alert(
        "Error updating profile: " +
          (err.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
        
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="Enter new name"
          type="text"
        />

        <ProfilePhotoSelector
          image={image}
          setImage={setImage}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition font-medium"
        >
          Save Changes
        </button>

      </form>
    </Modal>
  );
};

export default EditProfile;
