import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../utilities/image_upload";

const UpdateUserProfileModal = ({ closeModal, isOpen }) => {
  const { user, updateUserProfile } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const handleUpdateProfile = async (data) => {
    console.log(data);
    try {
      const updatedInfo = {};

      if (data.name?.trim()) {
        updatedInfo.displayName = data.name;
      }

      if (data.image?.length > 0 && data.image[0] instanceof File) {
        const photoURL = await imageUpload(data.image[0]);
        updatedInfo.photoURL = photoURL;
      }

      if (Object.keys(updatedInfo).length > 0) {
        updateUserProfile(updatedInfo).then(() => {
          toast.success("Your profile has been updated!");

          reset();
          closeModal();
        }).catch(err=> toast.error(err.message));
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-2xl font-bold text-center leading-6 text-gray-900"
            >
              Manage Your Profile
            </DialogTitle>
            <form className="mt-2">
              <div>
                <label htmlFor="" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter Your Name Here"
                  defaultValue={user?.displayName}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-gray-100 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>

              <div className="my-2.5">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Update Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-[#62ab00]
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-[#62ab00] rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-[#62ab00] focus:border-[#62ab00]
      py-2"
                  {...register("image")}
                />
                <p className="mt-1 text-xs text-gray-400">
                  PNG, JPG or JPEG (max 2MB)
                </p>
              </div>
            </form>
            <hr className="mt-8 text-[#bd0018]" />
            <div className="flex mt-5 justify-around">
              <button
                onClick={handleSubmit(handleUpdateProfile)}
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserProfileModal;
