import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaSearch,
  FaUserShield,
  FaUserTimes,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [emailQuery, setEmailQuery] = useState("");

  // Get current logged in user role
  const { data: currentUser = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["currentUserRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isAdmin = currentUser?.role === "admin";

  // Fetch all users if admin
  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["allUsers", emailQuery],
    enabled: isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${emailQuery}`
      );
      return res.data;
    },
  });

  // Update user role
  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),

    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    let newRole = "user";
    let actionText = "Remove Access";

    // Toggle Role
    if (currentRole === "user") {
      newRole = "tourist";
      actionText = "Make Tourist";
    } else if (currentRole === "tourist") {
      newRole = "guide";
      actionText = "Make Guide";
    } else if (currentRole === "guide") {
      newRole = "admin";
      actionText = "Make Admin";
    }

    const confirm = await Swal.fire({
      title: `${actionText}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `${actionText} successful`,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update role",
      });
    }
  };

  // Remove role => default user
  const handleRemoveAccess = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove Access?",
      text: "User role will become default user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: "user" });

      Swal.fire({
        icon: "success",
        title: "Access Removed",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  // Loading
  if (roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Only admin can access
  if (!isAdmin) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-3">
          Access Denied
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          Only admin can manage users.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
          Manage Users
        </h2>

        {/* Search */}
        <div className="relative w-full md:w-[350px]">
          <FaSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 ${
              emailQuery
                ? "opacity-0 scale-75"
                : "opacity-100 scale-100"
            }`}
          />

          <input
            type="text"
            placeholder="Search user by email..."
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Loading */}
      {isFetching && (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}

      {/* No Users */}
      {!isFetching && users.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No users found.
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="table w-full">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Created</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td>{index + 1}</td>

                  <td className="font-medium text-gray-800 dark:text-gray-100">
                    {u.email}
                  </td>

                  <td className="text-gray-600 dark:text-gray-300">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                          : u.role === "guide"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                          : u.role === "tourist"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      {/* Make Role Button */}
                      {u.role !== "admin" && (
                        <button
                          onClick={() =>
                            handleRoleChange(
                              u._id,
                              u.role || "user"
                            )
                          }
                          className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 border-none text-white"
                        >
                          <FaUserShield />

                          {u.role === "user"
                            ? "Tourist"
                            : u.role === "tourist"
                            ? "Guide"
                            : "Admin"}
                        </button>
                      )}

                      {/* Remove Access */}
                      {u.role !== "user" && (
                        <button
                          onClick={() => handleRemoveAccess(u._id)}
                          className="btn btn-sm bg-red-600 hover:bg-red-700 border-none text-white"
                        >
                          <FaUserTimes />
                          Remove
                        </button>
                      )}

                      {/* Default User */}
                      {u.role === "user" && (
                        <button className="btn btn-sm bg-gray-500 border-none text-white cursor-default">
                          <FaUser />
                          User
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;