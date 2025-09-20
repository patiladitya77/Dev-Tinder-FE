import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import axiosInstance from "../utils/axiosInstance";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/profile/view",
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
