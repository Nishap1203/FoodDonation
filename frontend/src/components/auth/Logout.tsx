import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../graphql/auth";
import { notifySuccess } from "../common/ToastNotification";


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();


        // Dispatch logout action to clear the user state
        dispatch(logoutUser());
        notifySuccess("you successfully logged out");
        navigate("/", { replace: true }); 
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setLoading(false); 
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return <p>{loading ? "Logging out..." : "Redirecting to home..."}</p>;
};

export default Logout;
