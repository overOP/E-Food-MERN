import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/minLayout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path : "/cart",
        element : <Cart />
    }
    ],
  },
]);
