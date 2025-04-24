import { Link } from "react-router-dom";


import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaUserCircle,
  FaInfoCircle,
  FaSearch,
  FaRegRegistered,
} from "react-icons/fa";
import { useState } from "react";

import { RootState } from "../../store/instore";
import { useSelector } from "react-redux";

interface SidebarProps {
  isOpen: boolean;
}

const Navbar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [active, setActive] = useState<string>("Home");

  const user = useSelector((state: RootState) => state.auth.user);

  // Menu items for unauthenticated users
  const unauthenticatedMenuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "About Us", icon: <FaInfoCircle />, path: "/about" },
    { name: "Signup", icon: <FaUser />, path: "/signup" },
    { name: "Login", icon: <FaUser />, path: "/login" },
  ];

  // Menu items for authenticated users
  const authenticatedMenuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "About", icon: <FaInfoCircle />, path: "/about" },
  ];

  const getDashboardPath = () => {
    if (user?.role === "DONOR") return "/dashboard/donor-dashboard";
    if (user?.role === "NGO") return "/dashboard/ngo-dashboard";
    if (user?.role === "ADMIN") return "/dashboard/admin-dashboard";
    return "/"; // Default fallback
  };
// bg-[#168c74]
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#44A08D] text-white shadow-md transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome! {user?.role}</h2>

        {user ? (
          <>
            {authenticatedMenuItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                  active === item.name ? "bg-[#093637]" : "hover:bg-gray-700"
                }`}
                onClick={() => setActive(item.name)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}

            <Link
              to={getDashboardPath()}
              className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                active === "Dashboard" ? "bg-[#093637]" : "hover:bg-gray-700"
              }`}
              onClick={() => setActive("Dashboard")}
            >
              <FaUserCircle />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/dashboard/search-ngo"
              className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                active === "SearchNGO" ? "bg-[#093637]" : "hover:bg-gray-700"
              }`}
              onClick={() => setActive("SearchNGO")}
            >
              <FaSearch />
              <span>SearchNGO</span>
            </Link>

            <Link
              to="/register-ngo"
              className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                active === "Register NGO" ? "bg-[#093637]" : "hover:bg-gray-700"
              }`}
              onClick={() => setActive("Register NGO")}
            >
              <FaRegRegistered />
              <span>Register NGO</span>
            </Link>

            <Link
              to="/dashboard/profile"
              className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                active === "Profile" ? "bg-[#093637]" : "hover:bg-gray-700"
              }`}
              onClick={() => setActive("Profile")}
            >
              <FaUser />
              <span>Profile</span>
            </Link>

            <Link
              to="/dashboard/logout"
              className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                active === "Logout" ? "bg-[#093637]" : "hover:bg-gray-700"
              }`}
              onClick={() => setActive("Logout")}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          </>
        ) : (
          <>
            {unauthenticatedMenuItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                  active === item.name ? "bg-[#093637]" : "hover:bg-gray-700"
                }`}
                onClick={() => setActive(item.name)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </>
        )}
      </div>
    </aside>
  );
};
export default Navbar;
