import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Manage Users
      </h2>

      {/* Search box */}
      <div className="relative w-full max-w-md mb-6">
        <FaSearch
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 transition-all duration-300
      ${emailQuery ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
        />
        <input
          type="text"
          className="w-full pl-10 p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Search user by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
      </div>



      {isFetching && <p className="text-gray-600 dark:text-gray-400">Loading users...</p>}

      {!isFetching && users.length === 0 && emailQuery && (
        <p className="text-gray-500 dark:text-gray-400">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="text-left text-gray-700 dark:text-gray-200">
                <th className="p-2">Email</th>
                <th className="p-2">Created At</th>
                <th className="p-2">Role</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className={`${index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                    } border-t border-gray-200 dark:border-gray-700`}
                >
                  <td className="p-2 text-gray-800 dark:text-gray-100">{u.email}</td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${u.role === "admin"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRoleChange(u._id, u.role || "user")}
                      className={`px-3 py-1 rounded text-sm flex items-center gap-1 transition ${u.role === "admin"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <FaUserTimes />
                          Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield />
                          Make Admin
                        </>
                      )}
                    </button>
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
