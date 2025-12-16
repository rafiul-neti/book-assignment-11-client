import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const LibrarianOnlyRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "librarian") {
    return (
      <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
        <p className="font-bold text-6xl">Access Fordidden</p>
        <h1 className="text-9xl font-bold">403</h1>
      </div>
    );
  }
  return children;
};

export default LibrarianOnlyRoute;
