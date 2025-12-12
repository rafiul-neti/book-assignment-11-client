import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import useAuth from "../../../hooks/useAuth";

const UserDataRow = () => {
  const { user } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={user?.photoURL} alt={user?.name} />
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
        <p className="">User</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
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
          role="customer"
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
