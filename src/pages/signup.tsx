import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { validateField } from "../utils/validation";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setApiError("");
    setLoading(true);

    const newError = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };

    let hasError = false;

    if (!user.name) {
      newError.name = "Name is required";
      hasError = true;
    }

    if (!user.email) {
      newError.email = "Email is required";
      hasError = true;
    }

    if (!user.password) {
      newError.password = "Password is required";
      hasError = true;
    }

    if (user.password !== user.confirm_password) {
      newError.confirm_password = "Passwords do not match";
      hasError = true;
    }

    setError(newError);

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const { res, data } = await signupUser(user);

      if (res.ok) {
        setSuccess("Signup Successful ");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setApiError(data.message || "Signup failed ");
      }
    } catch (err) {
      console.log(err);
      setApiError("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errMsg = validateField(name, value, user);

    setError((prev) => ({
      ...prev,
      [name]: errMsg,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white w-87.5 p-6 rounded-2xl shadow-lg">
        <h1 className="text-pink-600 text-3xl font-bold text-center mb-4">
          Signup Page
        </h1>

        <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4">
          {apiError && (
            <p className="text-red-600 text-sm text-left">{apiError}</p>
          )}

          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleSignUpChange}
              className="border p-2 rounded-md w-full"
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {error.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleSignUpChange}
              className="border p-2 rounded-md w-full"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleSignUpChange}
              className="border p-2 rounded-md w-full"
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {error.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={user.confirm_password}
              onChange={handleSignUpChange}
              className="border p-2 rounded-md w-full"
            />
            {error.confirm_password && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {error.confirm_password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 text-white py-2 rounded-md flex justify-center items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Success */}
          {success && (
            <p className="text-green-500 text-center text-sm">{success}</p>
          )}

          <p className="text-sm text-center">
            Already have an account?{" "}
            <NavLink to="/login" className="text-pink-500">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
