import { useState } from "react";
import UpdateUserProfileModal from "../../../components/Modal/UpdateUserProfileModal";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  if (roleLoading) {
    return <LoadingSpinner />;
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
          <div className="flex flex-col items-center justify-center p-4 -mt-16">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={user?.photoURL}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="p-2 px-4 text-xs text-white bg-[#62ab00] rounded-full capitalize">
              {role}
            </p>
            <p className="mt-2 text-xl font-medium text-gray-800 ">
              User Id: {user?.uid}
            </p>
            <div className="w-full p-2 mt-4 rounded-lg">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-gray-600 ">
                    {user?.displayName}
                  </span>
                </p>
                <p className="flex flex-col">
                  Email
                  <span className="font-bold text-gray-600 ">
                    {user?.email}
                  </span>
                </p>

                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#62ab00]  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1"
                  >
                    Update Profile
                  </button>
                  <button className="bg-[#62ab00] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateUserProfileModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default Profile;
