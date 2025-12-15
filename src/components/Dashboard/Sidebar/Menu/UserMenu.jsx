import { BsFingerprint } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem icon={MdPayments} label={`Invoices`} address={`my-payments`} />
    </>
  );
};

export default UserMenu;
