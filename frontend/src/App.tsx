import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/approutes";
import { useState } from "react";
import ToastNotification from "./components/common/ToastNotification";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ToastNotification />
      <Router>
        <div className="flex min-h-screen flex-col">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="flex flex-1">
            <Navbar isOpen={isSidebarOpen} />
            <div
              className={`flex-grow bg-gray-100 pt-16 transition-all duration-300 ${
                isSidebarOpen ? "ml-64" : "ml-0"
              }`}
            >
              <main className="flex justify-center items-start p-4 min-h-[calc(100vh-8rem)]">
                <div className="w-full max-w-4xl">
                  <AppRoutes />
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;