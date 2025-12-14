import React from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInWithGoogle, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      // User Registration using google
      const res = await signInWithGoogle();

      // creating userInfo obj.
      const userInfo = {
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
      };

      // save userInfo to the database
      axiosSecure.post("/users", userInfo);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleGoogleSignIn}
      className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
    >
      <FcGoogle size={32} />

      <p>Continue with Google</p>
    </div>
  );
};

export default SocialLogin;
