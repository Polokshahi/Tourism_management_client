import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  CalendarDays,
  Clock3,
  MapPin,
  DollarSign,
  Users,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import PackageGallery from "./PackageGallery";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PackageDetailsPage = () => {
  const { id } = useParams();

  const axios = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tourDate, setTourDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState("");

  // Fetch package data
  const { data: packageData = {}, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axios.get(`/packages/${id}`);
      return res.data;
    },
  });

  // Fetch guides
  const { data: guides = [] } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axios.get("/guides");
      return res.data;
    },
  });

  // Handle Booking Submit
  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingInfo = {
      packageId: packageData._id,
      packageName: packageData.title,
      touristName: user?.displayName,
      touristEmail: user?.email,
      touristImage: user?.photoURL,
      price: packageData.price,
      tourDate,
      guideName: selectedGuide?.name,
      guideEmail: selectedGuide?.email,
      status: "pending",
      payment_status: "unpaid",
    };

    try {
      const res = await axios.post("/bookings", bookingInfo);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Booking Confirmed 🎉",
          text: "Your tour has been booked successfully.",
          icon: "success",
          confirmButtonText: "Go to My Bookings",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          navigate("/dashboard/my-bookings");
        });
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        title: "Booking Failed",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0f172a] min-h-screen text-black dark:text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={packageData.images}
          alt={packageData.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute bottom-10 left-10 text-white max-w-3xl">
          <p className="uppercase tracking-[4px] text-sm mb-2 text-blue-300">
            Explore Bangladesh
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {packageData.title}
          </h1>

          <p className="text-gray-200 text-lg">
            {packageData.description?.slice(0, 150)}...
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Gallery */}
        <div className="mb-14">
          <PackageGallery />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">
                About This Tour
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-8">
                {packageData.description}
              </p>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-5 mt-8">
                <div className="bg-blue-50 dark:bg-slate-800 p-5 rounded-2xl">
                  <DollarSign className="mb-3 text-blue-600" />
                  <p className="text-sm text-gray-500">Price</p>
                  <h3 className="text-xl font-bold">
                    ${packageData.price}
                  </h3>
                </div>

                <div className="bg-blue-50 dark:bg-slate-800 p-5 rounded-2xl">
                  <Clock3 className="mb-3 text-blue-600" />
                  <p className="text-sm text-gray-500">Duration</p>
                  <h3 className="text-xl font-bold">
                    {packageData.duration}
                  </h3>
                </div>

                <div className="bg-blue-50 dark:bg-slate-800 p-5 rounded-2xl">
                  <MapPin className="mb-3 text-blue-600" />
                  <p className="text-sm text-gray-500">Location</p>
                  <h3 className="text-xl font-bold">
                    {packageData.location}
                  </h3>
                </div>
              </div>
            </div>

            {/* Tour Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">
                Tour Plan
              </h2>

              <div className="space-y-4">
                {packageData.tourPlan?.map((plan, idx) => (
                  <div
                    key={idx}
                    className="collapse collapse-arrow border border-gray-200 dark:border-slate-700 rounded-2xl"
                  >
                    <input
                      type="radio"
                      name="tour-plan"
                      defaultChecked={idx === 0}
                    />

                    <div className="collapse-title text-lg font-semibold">
                      Day {plan.day || idx + 1}
                    </div>

                    <div className="collapse-content text-gray-600 dark:text-gray-300">
                      {plan.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guides */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-blue-600" />
                <h2 className="text-3xl font-bold">
                  Meet Our Guides
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {guides?.map((guide) => (
                  <div
                    key={guide._id}
                    className="flex items-center gap-4 border border-gray-200 dark:border-slate-700 p-4 rounded-2xl hover:shadow-lg transition"
                  >
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-bold text-lg">
                        {guide.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Tour Guide
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - BOOKING */}
          <div>
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold mb-2">
                Book This Tour
              </h2>

              <p className="text-gray-500 mb-8">
                Reserve your seat today and start your journey.
              </p>

              <form onSubmit={handleBooking} className="space-y-5">
                <div>
                  <label className="font-medium mb-2 block">
                    Package Name
                  </label>

                  <input
                    type="text"
                    value={packageData.title || ""}
                    readOnly
                    className="w-full p-3 rounded-xl border bg-gray-100 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Tourist Name
                  </label>

                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="w-full p-3 rounded-xl border bg-gray-100 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Email
                  </label>

                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full p-3 rounded-xl border bg-gray-100 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Tour Date
                  </label>

                  <div className="border rounded-xl p-3 bg-gray-100 dark:bg-slate-800">
                    <DatePicker
                      selected={tourDate}
                      onChange={(date) => setTourDate(date)}
                      className="bg-transparent outline-none w-full"
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Select Guide
                  </label>

                  <select
                    value={selectedGuide?._id || ""}
                    onChange={(e) => {
                      const selected = guides.find(
                        (guide) => guide._id === e.target.value
                      );

                      setSelectedGuide(selected);
                    }}
                    className="w-full p-3 rounded-xl border bg-gray-100 dark:bg-slate-800"
                    required
                  >
                    <option value="">Choose a Guide</option>

                    {guides.map((guide) => (
                      <option key={guide._id} value={guide._id}>
                        {guide.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 dark:bg-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">
                      Total Price
                    </span>

                    <span className="text-3xl font-bold text-blue-600">
                      ${packageData.price}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold text-lg"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;