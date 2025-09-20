import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // import Axios instance
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/login", { emailId, password });
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/feed");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axiosInstance.post("/signup", {
        firstName,
        lastName,
        emailId,
        password,
      });
      dispatch(addUser(res.data.savedUser));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.log(err);
    }
  };

  return (
    <div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Login successful</span>
          </div>
        </div>
      )}

      <div className="flex justify-center py-6">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>

            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <p className="text-red-500">{error}</p>}

            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>

            <p
              className="mx-auto px-2 cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm
                ? "New User? Sign Up here"
                : "Existing User? Login here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
