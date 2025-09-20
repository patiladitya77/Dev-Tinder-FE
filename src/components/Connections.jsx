import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import axiosInstance from "../utils/axiosInstance";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/users/connections",
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return <h1>No connections found</h1>;
  }

  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, photoURL, about, _id } =
          connection;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
