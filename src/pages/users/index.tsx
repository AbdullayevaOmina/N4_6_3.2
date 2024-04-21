import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditeUserModal from "../../components/edituser/index.tsx";
import { Link } from "react-router-dom";

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
      <div className="d-flex gap-8 h-9 my-3">
        <h2>Users</h2>
        <form className="d-flex input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Search user..."
          />
          <button className="btn btn-primary rounded-r-none" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <button className="btn btn-success">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User ID</th>
            <th scope="col">User Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.id}</td>
              <td>
                <Link className=" text-decoration-none" to={`/users/`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.phone}</td>
              <td className="d-flex gap-2">
                <EditeUserModal userID={user.id} />
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  <i className="fa-solid fa-user-minus" />
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
