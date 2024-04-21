import { Header, SideBar } from "@components";
import { Flex, Main } from "@containers";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <Flex>
      <div className="basis-1/4">
        <SideBar />
      </div>
      <div className="basis-3/4">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </Flex>
  );
};

export default index;
