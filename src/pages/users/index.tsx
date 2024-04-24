import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EditeUserModal from "../../components/edituser/index.tsx";
import { Get, Delete } from "@httpModel";

interface User {
  id: number;
  username: string;
  phone: string;
}

const Index: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await Get("/users");
      setUsers(response);
    };

    fetchUsers();
  }, [setUsers]);

  const deleteUser = async (userID: number) => {
    const confirmation = window.confirm("Userni o'chirishni tasdiqlaysizmi?");
    if (confirmation) {
      try {
        await Delete(`/users`, userID);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userID));
        toast.success("User deleted");
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
  };

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
        <EditeUserModal
          btnIcon={"fa-solid fa-plus"}
          btnColor="success"
          title={"Create User"}
          btnTitle={"Create"}
          apiType={"post"}
        />
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
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.id}</td>
              <td className="text-primary">{user.username}</td>
              <td>{user.phone}</td>
              <td className="d-flex gap-2">
                <EditeUserModal
                  userID={user.id}
                  btnColor="warning"
                  btnIcon={"fa-solid fa-user-pen"}
                  btnTitle={"Edit"}
                  title={"Edit User Info"}
                  apiType={"patch"}
                />
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
