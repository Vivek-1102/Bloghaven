import { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  // State to control dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Function to toggle dropdown visibility
  function loadDropbar() {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/blog"} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>
      <div className="relative">
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            New
          </button>
        </Link>

        {/* Avatar component with onClick to toggle dropdown */}
        <Avatar onClick={loadDropbar} size={"big"} name="harkirat" />

        {/* Conditionally render dropdown */}
        {showDropdown && (
          <div
            id="dropdown"
            className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="/blog" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Bookmarks
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Setting
                </a>
              </li>
              <li>
                <a href="#" onClick={()=>{
                    localStorage.setItem("token","");
                    navigate("/");
                }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
