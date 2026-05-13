import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ Correct import
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useDarkMode } from "../Contexts/ThemeContext";



const Login = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const { singIn, forgetPassword, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxios();
  const { darkMode } = useDarkMode(); 

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    singIn(email, password)
      .then((result) => {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
          draggable: true,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    forgetPassword(email)
      .then(() => {
        Swal.fire({
          title: "Password reset email sent!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        axiosSecure
          .post("/users", userInfo)
          .then(() => {
            Swal.fire({
              title: `Welcome, ${user.displayName}`,
              icon: "success",
              draggable: true,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("User save failed:", error);
            Swal.fire("Oops!", "User save failed", "error");
          });
      })
      .catch((error) => {
        console.error(error);
        alert("Google login failed");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full mx-auto max-w-md p-6 rounded-2xl shadow-lg ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Login to your account
      </h2>

      {/* Google Login */}
      <div className="my-6">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className={`flex items-center justify-center w-full p-4 space-x-3 border rounded-md transition ${
            darkMode
              ? "border-gray-600 hover:bg-gray-800"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <FcGoogle size={24} />
          <p>Login with Google</p>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center w-full my-4">
        <hr className={`w-full ${darkMode ? "border-gray-600" : "border-gray-300"}`} />
        <p className={`px-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>OR</p>
        <hr className={`w-full ${darkMode ? "border-gray-600" : "border-gray-300"}`} />
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            ref={emailRef}
            name="email"
            className={`w-full p-3 rounded-md focus:outline-none ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
            }`}
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className={`w-full p-3 rounded-md focus:outline-none ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
            }`}
            placeholder="Password"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div
          onClick={handleForgotPassword}
          className="text-sm text-blue-500 hover:underline cursor-pointer"
        >
          Forgot password?
        </div>

        <button
          className={`w-full p-3 rounded-md font-semibold mt-3 transition ${
            darkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Login
        </button>

        <p className="font-bold text-center pt-5">
          Don’t Have An Account?{" "}
          <Link
            className={`${
              darkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
            }`}
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
