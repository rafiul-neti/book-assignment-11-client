import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeLibrarianModal from "../../../Modal/BecomeLibrarianModal";
import Swal from "sweetalert2";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAskForLibrarian = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "By clicking the 'Continue' button, you're accepting our Terms & Privacy Policy.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsOpen(true);
      }
    });
  };

  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem icon={MdPayments} label={`Invoices`} address={`my-payments`} />

      <div
        onClick={handleAskForLibrarian}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300 hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-2 font-medium">Become A Librarian</span>
      </div>

      <BecomeLibrarianModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default UserMenu;
