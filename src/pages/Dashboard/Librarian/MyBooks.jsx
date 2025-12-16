import BookDataRow from "../../../components/Dashboard/TableRows/BookDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyInventory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { result: books = [], totalBooks = 0 } = data || {};

  return (
    <>
      <div className="">
        <h2 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold text-[#62ab00]">
          I Have Added: ({totalBooks}) Books
        </h2>
      </div>
      {books.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-xl md:text-2xl lg:text-6xl font-bold text-gray-600">
            You haven't added any book yet.
          </span>
        </div>
      ) : (
        <div className="container mx-auto sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm capitilize font-bold"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Book Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Book Author
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Quantity
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <BookDataRow
                        key={book._id}
                        book={book}
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

export default MyInventory;
