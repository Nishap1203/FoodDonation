import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/userSlice";
import { RootState, AppDispatch } from "../../store/instore";

import {
  updateUserProfile,
  changeUserPassword,
} from "../../graphql/user";

import { notifySuccess, notifyError } from "../common/ToastNotification";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser, loading } = useSelector(
    (state: RootState) => state.user
  );

  const [name, setName] = useState(currentUser?.name || "");
  // const [avatar, setAvatar] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile())
      .unwrap()
      .then((res) => console.log("Fetched user data:", res))
      .catch((err) => console.error("Error fetching user profile:", err));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setPhone(currentUser.phone || "");
      setAddress(currentUser.address || "");
       console.log("currentUser from Redux:", currentUser);
    }
  }, [currentUser]);

  

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await updateUserProfile(name, phone, address);
      notifySuccess("Profile updated successfully!");
      setName(updatedUser.name || "");
      setPhone(updatedUser.phone || "");
      setAddress(updatedUser.address || "");
      dispatch(fetchUserProfile());
      setIsEditing(false);

    } catch (error) {
      notifyError("Failed to update profile.",error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await changeUserPassword(oldPassword, newPassword);
      notifySuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordFields(false);
    } catch (error) {
      notifyError("Failed to change password.",error);
    }
  };

  if (!currentUser) return <p>No user data available.</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div>
          <p className="mb-4 text-gray-700">
            <strong>Email:</strong> {currentUser.email}
          </p>

          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className={`border p-3 w-full rounded-md mb-4 ${
              isEditing ? "" : "bg-gray-100"
            }`}
          />

          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!isEditing}
            className={`border p-3 w-full rounded-md mb-4 ${isEditing ? "" : "bg-gray-100"}`}
          />

          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isEditing}
            className={`border p-3 w-full rounded-md mb-4 ${isEditing ? "" : "bg-gray-100"}`}
          />

          <div className="flex space-x-4">
            {isEditing ? (
              <button
                onClick={handleUpdateProfile}
                disabled={!name && !phone && !address}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Change Password Section */}
          <div className="mt-8">
            {!showPasswordFields ? (
              <button
                onClick={() => setShowPasswordFields(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Change Password
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border p-3 w-full rounded-md"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border p-3 w-full rounded-md"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleChangePassword}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowPasswordFields(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
