import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utilities/image_upload";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SocialLogin from "../SocialLogin/SocialLogin";

const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form submit handler
  const handleRegister = async (data) => {
    // event.preventDefault();
    console.log(data);
    console.log(data.image[0]);
    const image = await imageUpload(data.image[0]);

    try {
      //2. User Registration
      const result = await createUser(data.email, data.password);

      //3. Save username & profile photo
      const updatedInfo = {
        displayName: data.name,
        photoURL: image,
      };
      await updateUserProfile(updatedInfo);
      console.log(result);

      const userInfo = {
        displayName: data.name,
        photoURL: image,
        email: data.email,
      };
      await axiosSecure.post("/users", userInfo);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />

              {errors.name?.type === "required" && (
                <small className="text-red-600">Name is required.</small>
              )}
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-[#62ab00]
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-[#62ab00] rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-[#62ab00] focus:border-[#62ab00]
      py-2"
                {...register("image")}
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />

              {errors.email?.type === "required" && (
                <small className="text-red-600">Email is required.</small>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#62ab00] bg-gray-200 text-gray-900"
              />
            </div>
            {errors.password?.type === "required" && (
              <small className="text-red-600">Password is required.</small>
            )}
            {errors.password?.type === "pattern" && (
              <small className="text-red-600">
                Password must be at least 8 characters long and include
                uppercase, lowercase, number, and special character.
              </small>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#62ab00] w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <SocialLogin />
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-[#62ab00] text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
