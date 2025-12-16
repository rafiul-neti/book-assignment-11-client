import { useQuery } from "@tanstack/react-query";
import LibrarianOrderDataRow from "../../../components/Dashboard/TableRows/LibrarianOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: librarianOrders = [], refetch } = useQuery({
    queryKey: ["manage-orders", user?.email, "librarian"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?librarianEmail=${user.email}`);
      return res.data;
    },
  });

  return (
    <>
      <div className="">
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-[#62ab00] font-bold text-center">
          Gotten Orders: ({librarianOrders.length})
        </h1>
      </div>

      {librarianOrders.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-xl md:text-2xl lg:text-6xl font-bold text-gray-600">
            You haven't gotten any order yet.
          </span>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-base uppercase font-bold"
                      >
                        Book Details
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-base uppercase font-bold"
                      >
                        Customer
                      </th>
                      
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-base uppercase font-bold"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-base uppercase font-bold"
                      >
                        Delivery Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-base uppercase font-bold"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {librarianOrders.map((order) => (
                      <LibrarianOrderDataRow
                        key={order._id}
                        order={order}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageOrders;
