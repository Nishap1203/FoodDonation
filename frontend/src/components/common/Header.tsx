import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean; // Add this to track sidebar state for styling
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-18 bg-[#44A08D] text-white flex items-center justify-between px-4 z-50 shadow-md">
      <div className="flex items-center gap-4">
        <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        <h1 className="text-xl font-semibold">MealBridge</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md px-4 py-1 text-black focus:outline-none focus:ring-2 focus:ring-green-950 w-32 md:w-48"
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
        <FaBell className="text-xl cursor-pointer hover:text-gray-300" />
        <FaUserCircle className="text-xl cursor-pointer hover:text-gray-300" />
      </div>
    </header>
  );
};

export default Header;