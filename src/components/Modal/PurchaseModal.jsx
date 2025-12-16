import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const PurchaseModal = ({ closeModal, isOpen, book }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // Total Price Calculation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBookOrder = async (data) => {
    // console.log(data);
    // console.log(book._id);
    const orderInfo = {
      librarianEmail: book.librarianEmail,
      bookName: book.bookName,
      bookImage: book.bookImage,
      bookPrice: book.bookPrice,
      orderedAt: new Date(),
      ...data,
    };
    // console.log(orderInfo);

    try {
      const res = await axiosSecure.post(`/orders`, orderInfo);
      if (res.data.insertedId) {
        toast.success(
          `Your order has been placed for "${book.bookName}". Please pay to complete further procedures.`
        );

        closeModal();
        navigate("/dashboard/my-orders");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle as="h3" className="leading-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-900">
                  Review Info Before Purchase
                </h1>
                <button
                  type="button"
                  className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-2 py-1 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  <MdOutlineCancelPresentation size={24} />
                </button>
              </div>
            </DialogTitle>
            <form
              onSubmit={handleSubmit(handleBookOrder)}
              className="text-center"
            >
              {/* name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-left">Your Name</legend>
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  className="input w-full"
                  placeholder="Your Name"
                  readOnly
                  {...register("customerName")}
                />
              </fieldset>

              {/* email */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-left">
                  Your Email
                </legend>
                <input
                  defaultValue={user?.email}
                  type="text"
                  className="input w-full"
                  placeholder="Your Email"
                  readOnly
                  {...register("customerEmail")}
                />
              </fieldset>

              {/* phone Number */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-left">
                  Your Phone Number
                </legend>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Phone Number"
                  {...register("customerPhoneNumber", {
                    min: 11,
                    required: true,
                  })}
                />

                {errors.customerPhoneNumber?.type === "min" && (
                  <small className="label text-red-600">
                    Phone number must be 11 characters long.
                  </small>
                )}
                {errors.customerPhoneNumber?.type === "required" && (
                  <small className="label text-red-600">
                    Phone number is required.
                  </small>
                )}
              </fieldset>

              {/* Address */}
              <fieldset className="fieldset">
                <p className="mb-0 label text-red-600">
                  Be careful about your address. We will deliver your parcel
                  here.
                </p>
                <legend className="mt-0 fieldset-legend text-left">
                  Your Address
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Your Address"
                  {...register("customerAddress", { required: true })}
                />

                {errors.customerAddress?.type === "required" && (
                  <small className="label text-red-600">
                    Address is required.
                  </small>
                )}
              </fieldset>

              <p className="mt-6 label text-xs text-center text-warning-content">
                Please re-check your info before payment.
              </p>
              <input
                type="submit"
                className="my-2 btn btn-block cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-[#62ab00] px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                value={`Place Order`}
              />
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
