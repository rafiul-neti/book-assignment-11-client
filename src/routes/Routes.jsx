import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import BookDetails from "../pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddBooks from "../pages/Dashboard/Librarian/AddBooks";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyBooks from "../pages/Dashboard/Librarian/MyBooks";
import ManageOrders from "../pages/Dashboard/Librarian/ManageOrders";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import { createBrowserRouter } from "react-router";
import Invoices from "../pages/Dashboard/User/Invoices";
import ManageBooks from "../pages/Dashboard/Admin/ManageBooks";
import AllBooks from "../pages/AllBooks/AllBooks";
import LibrarianOnlyRoute from "./LibrarianOnlyRoute";
import AdminOnlyRoute from "./AdminOnlyRoute";
import UserOnlyRoutes from "./UserOnlyRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/all-books",
        Component: AllBooks,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "add-book",
        element: (
          <LibrarianOnlyRoute>
            <AddBooks />
          </LibrarianOnlyRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianOnlyRoute>
            <MyBooks />
          </LibrarianOnlyRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminOnlyRoute>
            <ManageUsers />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminOnlyRoute>
            <ManageBooks />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-orders",
        element: (
          <UserOnlyRoutes>
            <MyOrders />
          </UserOnlyRoutes>
        ),
      },
      {
        path: "my-payments",
        element: (
          <UserOnlyRoutes>
            <Invoices />
          </UserOnlyRoutes>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <LibrarianOnlyRoute>
            <ManageOrders />
          </LibrarianOnlyRoute>
        ),
      },
    ],
  },
]);
