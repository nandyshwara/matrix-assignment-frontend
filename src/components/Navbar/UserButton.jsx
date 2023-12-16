import React, { useState } from "react";

export default function UserButton({ user, setRender, setUser }) {
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("matrice_user_cred");
    setRender((prev) => !prev);
    setUser(null);
  };

  return (
    <div className="relative text-white">
      <button
        className="bg-[#392467] text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring"
        onClick={toggleDropdown}
      >
        {user?.user.email
          .split(" ")
          .map((email) => email.charAt(0).toUpperCase())}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#392467] border border-gray-200 rounded shadow z-50">
          <ul>
            <li
              className="py-2 px-4 hover:bg-[#A367B1] cursor-pointer font-medium text-sm"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
