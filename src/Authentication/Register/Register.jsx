import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useDarkMode } from "../../Contexts/ThemeContext"; 
const Register = () => {
  const { createUser, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { darkMode } = useDarkMode();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // ✅ Password validation
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegExp.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters, include 1 number, 1 lowercase, and 1 uppercase letter."
      );
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      setUser(user);

      const userInfo = {
        name,
        email,
        photo,
        role: "user",
        created_at: new Date(),
        last_log_in: new Date(),
      };

      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId || res.data.message === "User already exists") {
        Swal.fire({
          title: "Register successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-6 rounded-2xl shadow-lg ${
          darkMode ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="mb-4 text-3xl font-semibold text-center">
          Register your account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              className={`w-full p-3 rounded-md focus:outline-none ${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              }`}
              placeholder="Your name"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              className={`w-full p-3 rounded-md focus:outline-none ${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              }`}
              placeholder="Photo URL"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full p-3 rounded-md focus:outline-none ${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              }`}
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`w-full p-3 rounded-md focus:outline-none ${
                  darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                }`}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`w-full p-3 rounded-md font-semibold mt-3 transition ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Register
          </button>

          <p className="font-bold text-center pt-5">
            Already Have An Account?{" "}
            <Link
              className={`${
                darkMode
                  ? "text-blue-400 hover:underline"
                  : "text-blue-600 hover:underline"
              }`}
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
