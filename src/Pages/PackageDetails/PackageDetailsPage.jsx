import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Swal from "sweetalert2";

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
    const { data: packageData = {} } = useQuery({
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
        console.log("Package ID:", packageData._id);
        console.log("Price:", packageData.price);
        const bookingInfo = {
            packageId: packageData._id,
            packageName: packageData.title,
            touristName: user?.displayName,
            touristEmail: user?.email,
            touristImage: user?.photoURL,
            price: packageData.price,
            tourDate,
            guideName: selectedGuide,
            guideEmail: selectedGuide?.email,
            status: "pending",
            payment_status: "unpaid",
        };

        try {
            const res = await axios.post("/bookings", bookingInfo);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Confirm your Booking",
                    icon: "success",
                    confirmButtonText: "Go to My Bookings",
                }).then(() => {
                    navigate("/dashboard/my-bookings");
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Booking Failed", "Something went wrong", "error");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Gallery */}
            <div className="">
                <PackageGallery></PackageGallery>
            </div>

            {/* About Tour */}
            <div className=" rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
                <div className="md:flex">
                    <h2 className="text-2xl font-semibold mb-2">About the Tour</h2>
                    <div className="md:shrink-0">
                        <img
                            className="h-48 w-full object-cover md:h-full md:w-48"
                            src={packageData.images}
                            alt={packageData.title}
                        />
                    </div>
                    <div className="p-6">
                        <h2 className="block mt-1 text-xl leading-tight font-semibold ">
                            {packageData.title}
                        </h2>
                        <p className="mt-2 ">{packageData.description}</p>

                        <div className="mt-4 text-sm ">
                            <p><span className="font-medium">Price:</span> ${packageData.price}</p>
                            <p><span className="font-medium">Duration:</span> {packageData.duration}</p>
                            <p><span className="font-medium">Location:</span> {packageData.location}</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Tour Plan Accordion Style */}
            <div className="mb-8 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
                <h2 className="text-2xl font-semibold mb-4">Tour Plan</h2>
                <div className="space-y-2">
                    {packageData.tourPlan?.map((plan, idx) => (
                        <div
                            key={idx}
                            className="collapse collapse-arrow bg-base-100 border border-base-300"
                        >
                            <input
                                type="radio"
                                name="tour-plan-accordion"
                                defaultChecked={idx === 0}
                            />
                            <div className="collapse-title font-semibold bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
                                Day {plan.day || idx + 1}
                            </div>
                            <div className="collapse-content text-sm bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
                                {plan.activity}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Tour Guide List */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-3 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">Meet Our Tour Guides</h2>
                <div className="flex flex-wrap gap-3">
                    {guides?.map((guide) => (
                        <button
                            key={guide._id}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                            // onClick={() => navigate(`/guides/${guide._id}`)}
                        >
                            {guide.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white dark:bg-black text-black dark:text-white p-6 shadow-md rounded-md transition-colors duration-300">
  <h2 className="text-xl font-semibold mb-4">Book This Tour</h2>
  <form onSubmit={handleBooking} className="space-y-4">
    {/* Title */}
    <input
      type="text"
      value={packageData.title || ""}
      className="w-full border p-2 rounded mb-3 bg-white dark:bg-gray-900 text-black dark:text-white"
      readOnly
    />
    <input
      type="text"
      value={user?.displayName || ""}
      className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
      readOnly
    />
    <input
      type="email"
      value={user?.email || ""}
      className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
      readOnly
    />
    <input
      type="text"
      value={user?.photoURL || ""}
      className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
      readOnly
    />
    <input
      type="number"
      value={packageData.price || ""}
      className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
      readOnly
    />

    <div>
      <label className="block mb-1 font-medium">Tour Date</label>
      <DatePicker
        selected={tourDate}
        onChange={(date) => setTourDate(date)}
        className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Select Tour Guide</label>
      <select
        value={selectedGuide?._id || ""}
        onChange={(e) => {
          const selected = guides.find(guide => guide._id === e.target.value);
          setSelectedGuide(selected);
        }}
        className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        required
      >
        <option value="" disabled>
          Choose a guide
        </option>
        {guides.map((guide) => (
          <option key={guide._id} value={guide._id}>
            {guide.name}
          </option>
        ))}
      </select>
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Book Now
    </button>
  </form>
</div>

        </div>
    );
};

export default PackageDetailsPage;