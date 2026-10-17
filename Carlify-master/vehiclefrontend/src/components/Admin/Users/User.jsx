import { Edit, Eye, Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { AdminContext } from "../../Context/AdminContextProvider";

function User() {
  let { currentPageUser, setCurrentPageUser, totalPageUser, users, deleteUser } =
    useContext(AdminContext);

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPageUser(pageNumber);
  };



  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Users Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["User	", "Contact", "Joined At", "Verified", "Actions"].map(
                (item) => (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {item}
                    </th>
                  </>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.mobile}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-50 text-green-600">
                    {user.createdAt.split("T")[0]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-sm capitalize font-medium ${
                      user.isVerified === true
                        ? "bg-green-50 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-purple-600 hover:text-purple-900 mr-3">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-6 border-t border-gray-200">
        <button
          onClick={() => paginate(currentPageUser - 1)}
          disabled={currentPageUser === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Previous
        </button>
        <span>
          {currentPageUser} of {totalPageUser}
        </span>
        <button
          onClick={() => paginate(currentPageUser + 1)}
          disabled={currentPageUser === totalPageUser}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default User;
