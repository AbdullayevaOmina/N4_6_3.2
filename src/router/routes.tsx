import { Brands, Models, Products, Users, ImageUpload } from "@pages";

const router = [
  {
    path: "/main/products",
    element: <Products />,
    content: "Products",
  },
  {
    path: "/main/brands",
    element: <Brands />,
    content: "Brands",
  },
  {
    path: "/main/users",
    element: <Users />,
    content: "Users",
  },
  {
    path: "/main/models",
    element: <Models />,
    content: "Models",
  },
  {
    path: "/main/imageUpload",
    element: <ImageUpload />,
    content: "ImageUpload",
  },
];

export default router;