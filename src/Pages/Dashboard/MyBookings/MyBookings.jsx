import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {
  CalendarDays,
  CreditCard,
  Eye,
  Trash2,
  MapPin,
} from "lucide-react";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user.email}`
      );

      return res.data;
    },
  });

  const handleView = (id) => {
    console.log("View Booking", id);
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Booking?",
      text: "This booking will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/bookings/${id}`);

        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Booking deleted successfully.",
            icon: "success",
          });

          refetch();
        }
      } catch (err) {
        Swal.fire(
          "Error",
          err.message || "Failed to delete booking",
          "error"
        );
      }
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString();

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "in-review":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      case "paid":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] p-4 md:p-8 transition-all duration-500">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          My Bookings
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your booked tours and payments easily.
        </p>
      </div>

      {/* Booking Cards */}
      {bookings.length > 0 ? (
        <div className="grid gap-6">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left */}
                <div className="flex items-start gap-5">
                  {/* Number */}
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {booking.packageName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-500 dark:text-gray-400">
                      <p className="flex items-center gap-2">
                        <CalendarDays size={17} />
                        {formatDate(booking.tourDate)}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin size={17} />
                        Bangladesh
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-3xl font-bold text-indigo-600">
                        ৳{booking.price}
                      </span>

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status || "pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleView(booking._id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                  >
                    <Eye size={18} />
                    View
                  </button>

                  {booking.status !== "paid" && (
                    <button
                      onClick={() => handlePay(booking._id)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md"
                    >
                      <CreditCard size={18} />
                      Pay Now
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition shadow-md"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-md p-14 text-center border border-gray-100 dark:border-slate-700">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No bookings"
            className="w-28 mx-auto mb-6 opacity-80"
          />

          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            No Bookings Found
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            You haven’t booked any tours yet.
          </p>

          <button
            onClick={() => navigate("/all-trips")}
            className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            Explore Tours
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;