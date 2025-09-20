import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  const { photoURL, firstName, lastName, about, age, gender, _id } = user;
  const dispatch = useDispatch();

  const handlesendRequest = async (status, userId) => {
    try {
      await axios.post(
        import.meta.env.VITE_BASE_URL +
          "/request/send/" +
          status +
          "/" +
          userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 h-auto shadow-sm ">
      <figure>
        <img src={photoURL} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handlesendRequest("ignored", _id)}
          >
            ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handlesendRequest("interested", _id)}
          >
            interested
          </button>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    about: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
