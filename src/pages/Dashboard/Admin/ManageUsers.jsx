import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ManageUsers = () => {
  return (
    <section>
      <h1 className="my-5 text-2xl md:text-3xl lg:text-5xl font-bold text-[#62ab00]">
        Manage Users
      </h1>

      <Tabs>
        <TabList>
          <Tab>All Users</Tab>
          <Tab>Manage Librarians Requests</Tab>
        </TabList>

        <TabPanel>
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
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
                      <UserDataRow />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>Have to Update from database</TabPanel>
      </Tabs>
    </section>
  );
}

export default ManageUsers
