import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, reset } from "../features/auth/authSlice";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/Button";

const Profile = () => {
  const [messages, setMessages] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // Track which action needs confirmation
  const { user, isError, isSuccess, message, role } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const { firstName, lastName, email, phone, address } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      firstName === user?.firstName &&
      lastName === user?.lastName &&
      email === user?.email &&
      phone === user?.phone &&
      address === user?.address
    ) {
      setMessages("No changes detected.");
      setTimeout(() => {
        setMessages("");
      }, 2000);
    } else {
      dispatch(updateUser(formData));
    }
  };

  const handleDeleteAccount = () => {
    setConfirmAction(() => () => {
      dispatch(deleteUser(user._id));
      console.log(user._id);
      if (isError || isSuccess) {
        setTimeout(() => {
          setMessages("");
          dispatch(reset());
          navigate("/sign-up");
        }, 2000);
      }
    });
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setShowConfirmDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    if (isError || isSuccess) {
      setMessages(message);
      setTimeout(() => {
        setMessages("");
        dispatch(reset());
      }, 2000);
    }
  }, [isError, isSuccess, message, dispatch]);

  return (
    <div className="w-[80%] mx-auto">
      <div className="mt-12">
        <Breadcrumb />
      </div>
      <div>
        <h2 className="text-[24px] font-poppins font-bold my-8">
          Welcome{" "}
          <span className="text-secondary2">{` ${user.firstName} ${user.lastName}`}</span>
          {role === "admin" && (
            <span className="text-[16px]">{` (${role})`}</span>
          )}
        </h2>
      </div>
      <div className="text-[20px] font-poppins text-secondary2 font-medium">
        <h3>Edit Your Profile</h3>
      </div>
      {user ? (
        <form onSubmit={handleUpdate} className="font-poppins text-[16px]">
          <div className="flex ">
            <div className="flex flex-1 flex-col">
              <div className="flex flex-col">
                <label className="mb-1 mt-4">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 mr-10 rounded-md p-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 mt-4">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 mr-10 rounded-md p-3"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex flex-col">
                <label className="mb-1 mt-4">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 mr-10 rounded-md p-3"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 mt-4">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  className="bg-secondary text-text2 focus:outline-secondary2 mr-10 rounded-md p-3"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 mt-4">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              className="bg-secondary text-text2 focus:outline-secondary2 mr-10 rounded-md p-3"
            />
          </div>

          <div className="flex justify-between items-center py-8">
            <div className="flex gap-4">
              {role === "admin" ? (
                <Button text={"Dashboard"} href={"/admin/dashboard"} />
              ) : (
                <button onClick={handleDeleteAccount}>
                  <Button text={"Delete Account"} />
                </button>
              )}
            </div>
            <div className="flex">
              {messages ? (
                <div className="border-l-4 text-green-700 p-3 rounded-lg">
                  {messages}
                </div>
              ) : (
                <div></div>
              )}
              <button
                type="submit"
                className="mx-10 bg-button2 text-text p-3 text-[16px] font-medium font-poppins rounded-sm hover:bg-hoverButton"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>No user data available</p>
      )}

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Profile;
