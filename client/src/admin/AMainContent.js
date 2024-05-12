import React from "react";

const MainContent = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="flex-1 p-4">
      <Header />
      <div className="mb-4">
        <button onClick={toggleSidebar} className="bg-blue-700 p-2 rounded-md">
          Toggle Sidebar
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Welcome to the Main Content!</h2>
        <p className="text-gray-700">
          This is where your main content goes. You can customize this area as needed.
        </p>
      </div>
    </div>
  );
};

export default MainContent;