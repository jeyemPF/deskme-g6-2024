import React, { useState } from "react";
import {
  LayoutDashboard,
  Layers,
  Users,
  BookCopy,
  Settings,
  LogOut,
  Flag,
  NotebookTabs,
  UserCog,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar, {
  SidebarItem,
  SidebarProvider,
  Content,
} from "../components/Sidebar";
import Header from "../components/Header";
import useFetch from "../Hooks/useFetch";
import { Skeleton } from "antd";
import axios from "axios";
import AddUserModal from "../components/AddUserModal";
import ManageUserModal from "../components/ManageUserModal";
import useFetchCreatedUsers from "../Hooks/useFetchCreatedUser";
import useUserCount from "../Hooks/useUserCount";
import useNonUserCount from "../Hooks/useNonUserCount";
import { PlusOutlined } from "@ant-design/icons";

const SAPManage = () => {
  const {
    data: createdUsers,
    loading: createdUsersLoading,
    error: createdUsersError,
  } = useFetchCreatedUsers();

  const {
    userCount,
    loading: userCountLoading,
    error: userCountError,
  } = useUserCount();
  const {
    nonUserCount,
    loading: nonUserCountLoading,
    error: nonUserCountError,
  } = useNonUserCount();

  const isLoading = userCountLoading || userCountError;
  const isError = nonUserCountLoading || nonUserCountError;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/authorized-user`,
        formData
      );
      console.log(response.data);
      setIsModalOpen(false);
      // Optionally, you can add a success message or refresh the users list
    } catch (error) {
      console.error("There was an error creating the user!", error);
      // Optionally, you can handle specific errors and provide user feedback
    }
  };

  // Separate users with roles "Office Manager" and "Admin"
  const adminAndOfficeManagerUsers = createdUsers
    ? createdUsers.filter(
        (user) =>
          user && (user.role === "admin" || user.role === "officemanager")
      )
    : [];
  const normalUsers = createdUsers
    ? createdUsers.filter(
        (user) => user && user.role !== "admin" && user.role !== "officemanager"
      )
    : [];

    const handleManageClick = (userId) => {
      setIsModalOpen(true);
      setUserIdToDelete(userId); // Set the userIdToDelete state
    };
    


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null); // Clear userIdToDelete after closing the modal

  };

  

  const handleManageClick2 = () => {
    console.log("handleManageClick2 called");
    setIsModalOpen2(true);
    console.log("isModalOpen2:", isModalOpen2); // Add this line to check the value of isModalOpen2 after it's updated
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    // Clear session storage
    sessionStorage.removeItem('userCredentials');
  
    // Navigate to login page
    navigate('/login');
  };


  const handleBookingClick = () => {
    navigate("/superbooking");
  };

  const handleDashboardClick = () => {
    navigate("/superdashboard");
  };

  const handleManageBookingClick = () => {
    navigate("/supermanagebooking");
  };

  const handleReportClick = () => {
    navigate("/superreports");
  };

  const handleAuditClick = () => {
    navigate("/superaudit");
  };

  const handleConfirmDelete = async (userId) => {
  };

  

  return (
    <>
      <Header />
      <div className="flex dark:bg-neutral-900">
        <SidebarProvider>
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              onClick={handleDashboardClick}
            />
            <SidebarItem
              icon={<BookCopy size={20} />}
              text="Booking"
              onClick={handleBookingClick}
            />
            <SidebarItem
              icon={<Layers size={20} />}
              text="Manage Bookings"
              onClick={handleManageBookingClick}
            />
            <SidebarItem
              icon={<Users size={20} />}
              text="Manage Users"
              active
            />
            <hr className="my-3" />
            <SidebarItem
              icon={<Flag size={20} />}
              text="Reports"
              onClick={handleReportClick}
            />
            <SidebarItem
              icon={<NotebookTabs size={20} />}
              text="Audit Trails"
              onClick={handleAuditClick}
            />
            <hr className="my-3" />
            <SidebarItem
              icon={<LogOut size={20} />}
              text="Sign Out"
              onClick={handleSignOutClick}
            />
          </Sidebar>
          <Content>
            <h1 className="font-bold text-xl mb-3 dark:text-neutral-50">
              Manage Users | Role-Access
            </h1>
            {isLoading ? (
              <Skeleton height={120} count={4} />
            ) : isError ? (
              <div>Error: {isError.message}</div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-pink-50 to-pink-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold">
                        Total: {nonUserCount}
                      </span>
                      <span className="text-sm font-normal">
                        Privilege Users
                      </span>
                    </div>
                    <UserCog className="w-10 h-10 ml-10" />
                  </div>
                  <div className="flex flex-row items-center justify-center h-32 rounded-lg bg-gradient-to-r from-teal-50 to-teal-200 border-[1px] border-neutral-100 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold">
                        Total: {userCount}
                      </span>
                      <span className="text-sm font-normal">Users</span>
                    </div>
                    <Users className="w-10 h-10 ml-10" />
                  </div>
                </div>
              </>
            )}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-6">
              <div className="rounded-lg bg-white p-5 border-[1px] border-neutral-100 shadow-sm">
                <div className="flex justify-end items-center">
                <button
                    onClick={handleManageClick2}
                    className="flex items-center py-1 px-2 border border-blue-600 text-blue-600 rounded-sm hover:bg-blue-50 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <PlusOutlined style={{ fontSize: '12px', marginRight: '4px' }} /> Users
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto mt-2">
                    <thead className="text-gray-900 font-medium text-lg border-b text-center">
                      <tr>
                        <th className="py-3 pr-6">ID</th>
                        <th className="py-3 pr-6">Name</th>
                        <th className="py-3 pr-6">Roles</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y text-center text-sm">
                      {adminAndOfficeManagerUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td className="pr-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="pr-6 py-4 whitespace-nowrap">
                            {user.username}
                          </td>
                          <td className="pr-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                user.role === "admin"
                                  ? "text-green-600 bg-green-50"
                                  : "text-blue-600 bg-blue-50"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="whitespace-nowrap text-center">
                          <button
                          onClick={() => handleManageClick(user._id)} // Pass user._id to handleManageClick
                          className="py-1.5 px-3 text-gray-600 text-sm hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                        >
                          Manage
                        </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ol className="flex justify-center gap-1 mt-5 text-xs font-medium">
                  <li>
                    <a
                      href="#"
                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ol>
              </div>

              {/* User Adding */}

              <div className="rounded-lg bg-white p-5 border-[1px] border-neutral-100 shadow-sm">
                <div className="flex justify-end items-center">
                  <div className="relative w-60 max-w-md">
                    <input
                      type="text"
                      className="w-full p-2 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
                      placeholder="Search users"
                    />
                    <div className="absolute right-0 top-0 flex items-center h-full pr-4">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto mt-2">
                    <thead className="text-gray-900 font-medium text-lg border-b text-center">
                      <tr>
                        <th className="py-3 pr-6">ID</th>
                        <th className="py-3 pr-6">Name</th>
                        <th className="py-3 pr-6">Roles</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y text-center text-sm">
                      {normalUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td className="pr-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="pr-6 py-4 whitespace-nowrap">
                            {user.username}
                          </td>
                          <td className="pr-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                user.role === "Active"
                                  ? "text-green-600 bg-green-50"
                                  : "text-blue-600 bg-blue-50"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="whitespace-nowrap text-center">
                        <button
                          onClick={() => handleManageClick(user._id)} // Pass user._id to handleManageClick
                          className="py-1.5 px-3 text-gray-600 text-sm hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                        >
                          Manage
                        </button>
                      </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ol className="flex justify-center gap-1 mt-5 text-xs font-medium">
                  <li>
                    <a
                      href="#"
                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </Content>
        </SidebarProvider>
      </div>

      {isModalOpen && 
      <ManageUserModal 
        handleCloseModal={handleCloseModal}
        userId={userIdToDelete}
        handleConfirmDelete={handleConfirmDelete} // Pass handleConfirmDelete here

         />}
      {isModalOpen2 && (
        <AddUserModal
          isOpen={isModalOpen2}
          onClose={handleCloseModal2}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit} // Pass the handleSubmit function to the AddUserModal component
        />
      )}
    </>
  );
};

export default SAPManage;
