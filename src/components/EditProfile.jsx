import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import PropTypes from "prop-types";
import axiosInstance from "../utils/axiosInstance";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoURL, setPhotoURl] = useState(user.photoURL || "");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //clear error msgs

    try {
      const res = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  value={age}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  value={gender}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  value={about}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Profile Photo</span>
                </div>
                <input
                  value={photoURL}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoURl(e.target.value)}
                />
              </label>

              <p className="text-red-500"> </p>

              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoURL }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};

export default EditProfile;
