import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import ConfirmSignup from "../pages/ConfirmSignup";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
// import SearchNgo from "../pages/SearchNgo";
import RegisterNgo from "../pages/RegisterNgo";
import About from "../pages/About";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/confirm-signup" element={<ConfirmSignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/search-ngo" element={<SearchNgo />} /> */}
      <Route path="/register-ngo" element={<RegisterNgo />} />
    </Routes>
  );
};

export default PublicRoutes;
