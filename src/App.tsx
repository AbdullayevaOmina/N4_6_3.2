// import { MainLayout } from "@layout";
import { Outlet } from "react-router-dom";

// import { Table } from "@components";

function App() {
  // const headers = [
  //   { title: "Name", value: "name" },
  //   { title: "Age", value: "age" },
  //   { title: "Phone", value: "phone" },
  // ];

  // const body = [
  //   { name: "Ali", age: 23, phone: "+998 99 088 63 78" },
  //   { name: "Ali", age: 23, phone: "+998 99 088 63 78" },
  //   { name: "Ali", age: 23, phone: "+998 99 088 63 78" },
  //   { name: "Ali", age: 23, phone: "+998 99 088 63 78" },
  // ];

  return (
    <>
      {/* <MainLayout> */}
      <Outlet />
      {/* </MainLayout> */}
      {/* <Table headers={headers} body={body} /> */}
    </>
  );
}

export default App;
