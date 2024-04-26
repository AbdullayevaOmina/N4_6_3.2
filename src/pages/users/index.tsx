import React, { useState, useEffect } from "react";
import EditeUserModal from "../../components/edituser/index.tsx";
import { Get } from "@httpModel";
import Table from "@table";
// import Table from "../../components/table/index.tsx";

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

  const headers = [
    { title: "ID", value: "id" },
    { title: "User Name", value: "username" },
    { title: "Phone", value: "phone" },
    { title: "Action", value: "action" },
  ];

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
          <button className="btn btn-primary  rounded-r-none" type="submit">
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

      <Table headers={headers && headers} body={users && users} />
    </div>
  );
};

export default Index;
