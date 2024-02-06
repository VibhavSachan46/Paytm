import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/user/bulk?filter=${filter}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => {
        setUsers(response.data.user);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        // Handle error, such as redirecting to the login page
      });
  }, [filter]);

  return (
    <div className="flex flex-col ml-4 mr-4 px-4">
      <div className="font-semibold mt-6 text-xl">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-richblack-400"
        />
      </div>
      <div>
        {users.map(user => (
          <User key={user._id} user={user} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

function User({ user, navigate }) {
  return (
    <div className="flex gap-y-4 mt-2 justify-between">
      <div className="flex items-center gap-2">
        <div>
          <img
            src={user.image}
            className="h-[32px] w-[32px] rounded-full"
            alt="Author"
          />
        </div>
        <div className="flex flex-col justify-center h-full" >
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <button
          type="button"
          className="w-full text-white bg-richblack-300 hover:bg-richblack-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => {
            // Example where you navigate to SendMoney
            navigate("/send?id=" + user._id + "&name=" + user.firstName + "&image=" + user.image);

          }}
        >
          Send money
        </button>
      </div>
    </div>
  );
}

export default Users;
