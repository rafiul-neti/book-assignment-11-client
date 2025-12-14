import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDataRow = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  let [isOpen, setIsOpen] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="mb-4">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search by user name & email"
          />
        </label>
      </div>

      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              User Info
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Current Role
            </th>

            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Admin Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user?.displayName}</div>
                    <div className="text-sm opacity-50">Bangladesh</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 ">{user?.email}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="capitalize">{user.userRole}</p>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  onClick={() => openModal(user)}
                  className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Update Role</span>
                </span>
                {/* Modal */}
                <UpdateUserRoleModal
                  isOpen={isOpen}
                  closeModal={closeModal}
                  role={user?.userRole}
                  userInfo={selectedUser}
                  refetch={refetch}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserDataRow;
