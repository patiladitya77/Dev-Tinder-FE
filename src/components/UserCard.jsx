const UserCard = ({ user }) => {
  const { photoURL, firstName, lastName, about, age, gender } = user;
  console.log(user);

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
          <button className="btn btn-primary">ignore</button>
          <button className="btn btn-secondary">interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
