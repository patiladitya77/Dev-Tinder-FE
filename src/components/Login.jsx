import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        return navigate("/feed");
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(res);

      dispatch(addUser(res.data.savedUser));
      console.log(res.data.savedUser);

      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Login successfull</span>
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
                    value={firstName}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    value={lastName}
                    type="text"
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
                value={emailId}
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                value={password}
                type="password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-500"> {error}</p>

            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "SignUp"}
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
