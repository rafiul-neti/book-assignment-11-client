import { BsFingerprint } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem icon={MdPayments} label={`Invoices`} address={`my-payments`} />
      <MenuItem
        icon={FaRegHeart}
        label={`My Wishlist`}
        address={`my-wishlist`}
      />
    </>
  );
};

export default UserMenu;
