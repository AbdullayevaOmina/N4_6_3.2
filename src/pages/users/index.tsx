import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  async function editUser(userID) {
    await axios(`/users${userID}`);
  }

  async function deleteUser(userID) {
    const confirmation = window.confirm("Userni o'chirishni tasdiqlaysizmi?");
    if (confirmation) {
      try {
        await axios.delete(`/users/${userID}`);
        toast.success("User deleted");
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
  }

  return (
    <div>
      <h1 className="text-center">Users</h1>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User ID</th>
            <th scope="col">User Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td className=" d-flex gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => editUser(user.id)}
                >
                  <i className="fa-solid fa-user-pen"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  <i className="fa-solid fa-user-minus"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
