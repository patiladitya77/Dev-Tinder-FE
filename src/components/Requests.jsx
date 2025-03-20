import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) {
    return;
  }

  if (requests.length === 0) {
    return <h1>No Requests found</h1>;
  }

  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-2xl">Pending Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, photoURL, about, _id } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-4/12 mx-auto"
          >
            <div>
              <img className="w-20 h-20 rounded-full" src={photoURL} />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold trxt-2xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <h2>{age + ", " + gender}</h2>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
