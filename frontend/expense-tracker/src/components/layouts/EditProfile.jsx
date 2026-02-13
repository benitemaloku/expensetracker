import React, { useState, useContext } from "react";
import Modal from "../Modal";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserProvider";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import Input from "../Inputs/Input";

const EditProfile = ({ isOpen, onClose }) => {
  const { user, updateUser } = useContext(UserContext);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [image, setImage] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      if (image) {
        formData.append("profileImage", image);
      }

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_USER,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        updateUser(response.data.user || response.data);
        onClose();
      }
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
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
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Enter new name"
          type="text"
          className="border p-2 rounded"
        />
        <ProfilePhotoSelector image={image} setImage={setImage} />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Save
        </button>
      </form>
    </Modal>
  );
};

export default EditProfile;
