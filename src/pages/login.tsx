import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type ErrorType = {
  email: string;
  password: string;
};

type User = {
  email: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<ErrorType>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setApiError("");
    setLoading(true);

    const newError: ErrorType = {
      email: "",
      password: "",
    };

    let hasError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.email) {
      newError.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(user.email)) {
      newError.email = "Invalid email format";
      hasError = true;
    }

    if (!user.password) {
      newError.password = "Password is required";
      hasError = true;
    } else if (user.password.length < 6) {
      newError.password = "Min 6 characters";
      hasError = true;
    }

    setError(newError);

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://crud-api-5f45.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);

        setLoading(false); 

        setTimeout(() => {
          alert("Login successful !✨"); 
          navigate("/dashboard"); 
        }, 100);
      } else {
        setApiError(data.message || "Invalid credentials ");
      }
    } catch (err) {
      console.log(err);
      setApiError("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    let errorMsg = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMsg = "Email required";
      else if (!emailRegex.test(value)) errorMsg = "Invalid email format";
    }

    if (name === "password") {
      if (!value) errorMsg = "Password is required";
      else if (value.length < 6) errorMsg = "Min 6 characters";
    }

    setError((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white w-87.5 p-6 rounded-2xl shadow-lg">
        <h1 className="text-pink-600 text-3xl font-bold text-center mb-4">
          Login Page
        </h1>

        <form
          onSubmit={handleLoginSubmit}
          className="flex flex-col gap-4 w-full"
        >
          {apiError && (
            <p className="text-red-600 text-center text-sm">{apiError}</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleLoginChange}
            className={`border p-2 rounded-md w-full ${
              error.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.email && (
            <p className="text-red-500 text-left text-sm mt-1">
              {error.email}
            </p>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleLoginChange}
            className={`border p-2 rounded-md w-full ${
              error.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.password && (
            <p className="text-red-500 text-left text-sm mt-1">
              {error.password}
            </p>
          )}

          {/* Button with loader */}
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 text-white py-2 rounded-md w-full hover:bg-pink-600 transition flex justify-center items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-pink-500 font-semibold hover:underline"
            >
              SignUp Now
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;