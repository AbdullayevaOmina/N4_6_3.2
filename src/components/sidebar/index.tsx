import routes from "@routes";
import "../sidebar/style.scss";
import { NavLink } from "react-router-dom";

const index = () => {
  return (
    <aside className="h-screen bg-slate-700 px-4 pt-10 fixed w-1/4">
      <ul className="flex flex-col gap-2">
        {routes.map((link, index) => {
          return (
            <li key={index}>
              <NavLink className="border block py-2 px-4 text-decoration-none text-center" to={link.path}>
                {link.content}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default index;
