import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BecomeLibrarianModal = ({ closeModal, isOpen }) => {
  const [warehousesData, setWarehousesData] = useState([]);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/warehouses.json").then((data) => setWarehousesData(data.data));
  }, []);

  const regions = [
    ...new Set(warehousesData.map((warehouse) => warehouse.region)),
  ];

  const librarianRegion = useWatch({ control, name: "librarianRegion" });

  const districtsByRegion = (region) => {
    const districts = warehousesData
      .filter((house) => house.region === region)
      .map((dis) => dis.district);

    return districts;
  };

  const handleLibrarianApplication = async (data) => {
    console.log(data);

    try {
      const res = await axiosSecure.post("/librarians", data);
      if (res.data.insertedId) {
        toast.success(
          "Your application is received. We will contact you as soon as possible."
        );

        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-gray-200 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-2xl font-bold text-center leading-6 text-gray-900"
            >
              Tell us about yourself.
            </DialogTitle>
            <form className="mt-2">
              {/* librarian name */}
              <div>
                <label className="block mb-2 text-sm">Your Name</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter Your Name Here"
                  defaultValue={user?.displayName}
                  readOnly
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-white text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>

              {/* librarian email */}
              <div>
                <label className="block mb-2 text-sm">Your Email</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter Your Email Here"
                  defaultValue={user?.email}
                  readOnly
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-white text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>

              {/* library name */}
              <div>
                <label className="block mb-2 text-sm">
                  Name of Your Library
                </label>
                <input
                  type="text"
                  {...register("libraryName", { required: true })}
                  placeholder="Your Library Name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-white text-gray-900"
                  data-temp-mail-org="0"
                />

                {errors.libraryName?.type === "required" && (
                  <small className="text-red-700">
                    Library Name is Required.
                  </small>
                )}
              </div>

              {/* library region */}
              <div>
                <label className="block mb-2 text-sm">Business Region</label>
                <select
                  defaultValue="Select Business Region"
                  {...register("librarianRegion")}
                  className="select w-full focus:outline-[#62ab00] bg-white border border-gray-200 rounded-md px-3 py-2"
                >
                  <option disabled={true}>Select Business Region</option>
                  {regions.map((region, ind) => (
                    <option key={ind} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* library district */}
              <div>
                <label className="block mb-2 text-sm">Business District</label>
                <select
                  defaultValue="Select Business District"
                  {...register("librarianDistrict")}
                  className="select w-full focus:outline-[#62ab00] bg-white border border-gray-200 rounded-md px-3 py-2"
                >
                  <option disabled={true}>Select Business District</option>
                  {districtsByRegion(librarianRegion).map((district, ind) => (
                    <option key={ind} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* library address */}
              <div>
                <label className="block mb-2 text-sm">Business Address</label>
                <input
                  type="text"
                  {...register("libraryAddress", { required: true })}
                  placeholder="Your Business Adrresss"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-white text-gray-900"
                  data-temp-mail-org="0"
                />

                {errors.libraryAddress?.type === "required" && (
                  <small className="text-red-700">Address is Required!</small>
                )}
              </div>

              {/* about business */}
              <div className="">
                <label htmlFor="description" className="block text-gray-600">
                  Business Description
                </label>

                <textarea
                  {...register("aboutBusiness", { required: true })}
                  placeholder="Write something about your business here..."
                  className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-[#62ab00] "
                ></textarea>

                {errors.aboutBusiness?.type === "required" && (
                  <small className="text-red-700">
                    This field is required!
                  </small>
                )}
              </div>
            </form>

            <div className="flex mt-5 justify-around">
              <button
                onClick={handleSubmit(handleLibrarianApplication)}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-[#62ab00] px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Apply
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

export default BecomeLibrarianModal;
