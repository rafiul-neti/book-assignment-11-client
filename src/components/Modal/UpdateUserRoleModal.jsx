import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UpdateUserRoleModal = ({
  isOpen,
  closeModal,
  role,
  userInfo,
  refetch,
}) => {
  const [updatedRole, setUpdatedRole] = useState(role);
  const axiosSecure = useAxiosSecure();

  console.log(userInfo);

  const handleUpdateUserRole = (user) => {
    const roleInfo = { role: updatedRole };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I wanna change it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(
            `/users/${user._id}/role`,
            roleInfo
          );

          const msg =
            updatedRole === "librarian"
              ? "Role updated as 'Librarian'!"
              : updatedRole === "admin"
              ? "Role updated as 'Admin'!"
              : "Role updated as 'User'!";

          if (res.data.modifiedCount) {
            refetch();
            toast.success(msg);
            closeModal();
            setUpdatedRole("user");
          }
        }
      } catch (err) {
        toast.error(err.message);
      }
    });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                Update User Role
              </DialogTitle>
              <form>
                <div>
                  <select
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    className="w-full my-3 border border-gray-200 rounded-xl px-2 py-3"
                    name="role"
                    id=""
                  >
                    <option value="user">User</option>
                    <option value="librarian">Librarian</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex mt-2 justify-around">
                  <button
                    onClick={() => handleUpdateUserRole(userInfo)}
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default UpdateUserRoleModal;
