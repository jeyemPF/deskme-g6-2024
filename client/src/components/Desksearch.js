import React, { useState } from 'react';

function DeskTable({ tableItems }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Check if tableItems is defined before filtering
  const filteredItems = tableItems ? tableItems.filter((item) =>
    item.desk_id.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="rounded-lg bg-white border-[1px] border-neutral-100 shadow-sm lg:col-span-2 p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold pl-4 text-lg">Available Desks:</h1>
        <div className="relative w-60 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pr-10 pl-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
            placeholder="Search desks"
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
              <th className="py-3 pr-6">Office Equipments</th>
              <th className="py-3 pr-6">Area</th>
              <th className="py-3 pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y text-center text-sm">
            {filteredItems.map((item, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.desk_id}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.officeEquipment}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.area}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeskTable;
