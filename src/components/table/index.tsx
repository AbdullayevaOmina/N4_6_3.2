import { toast } from "react-toastify";
import { Delete } from "@httpModel";
import  EditeUserModal  from "../edituser/index";

const index = ({ headers, body }) => {

  const deleteUser = async (userID: number) => {
    const confirmation = window.confirm("Userni o'chirishni tasdiqlaysizmi?");
    if (confirmation) {
      try {
        await Delete(`/users`, userID);
        toast.success("User deleted");
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
  };

  return (
    <div className="">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            {headers.map((item, index) => {
              return <th key={index}>{item.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {body?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                {headers?.map((header, i) => {
                  if (header.value === "action") {
                    return (
                      <td key={i} className="d-flex gap-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(item.id)}
                        >
                          <i className="fa-solid fa-user-minus" />
                        </button>
                        <EditeUserModal
                          userID={item?.id}
                          btnColor="warning"
                          btnIcon={"fa-solid fa-user-pen"}
                          btnTitle={"Edit"}
                          title={"Edit User Info"}
                          apiType={"patch"}
                        />
                      </td>
                    );
                  } else {
                    return <td key={i}>{item[header?.value]}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default index;
