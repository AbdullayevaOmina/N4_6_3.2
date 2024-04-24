import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { Brands, Models, Products, SignIn, SignUp, User, Users } from "@pages";
import { MainLayout } from "@layout";



const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="main/*" element={<MainLayout />}>
          <Route path="products" element={<Products />} />
          <Route path="brands" element={<Brands />} />
          <Route path="users" element={<Users />} />
          <Route path="models" element={<Models />} />
          <Route path="" element={<User />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default index;
