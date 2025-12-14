import { FaUserCog, FaBookOpen } from "react-icons/fa";
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaBookOpen} label="Manage Books" address={`manage-books`} />
    </>
  )
}

export default AdminMenu
