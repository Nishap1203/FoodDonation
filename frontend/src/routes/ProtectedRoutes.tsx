import { Route, Navigate, Outlet, useLocation, Routes } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/instore";
import Profile from "../pages/Profile";
import Logout from "../components/auth/Logout";
import Donations from "../pages/Donations";
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import DonorDashboard from "../pages/dashboards/DonorDashboard";
import NgoDashboard from "../pages/dashboards/NgoDashboard";
import SearchNGO from "../pages/SearchNgo";

const ProtectedRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Role-based dashboard redirect */}
        <Route
          index
          element={
            <Navigate
              to={`/dashboard/${
                user.role.toLowerCase().replace("_", "-") + "-dashboard"
              }`}
              replace
            />
          }
        />

        {/* Role-specific routes */}
        {user.role === "DONOR" && (
          <Route path="donor-dashboard" element={<DonorDashboard />} />
        )}
        {user.role === "NGO" && (
          <Route path="ngo-dashboard" element={<NgoDashboard />} />
        )}
        {user.role === "ADMIN" && (
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        )}

        {/* Common protected routes */}
        <Route path="donations" element={<Donations />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search-ngo" element={<SearchNGO />} />
        <Route path="logout" element={<Logout />} />

        {/* Catch-all for invalid protected routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Outlet />
    </Suspense>
  );
};

export default ProtectedRoutes;