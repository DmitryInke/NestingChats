import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./home/Home";
import Chat from "./chat/Chat";
import Profile from "./profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chats/:_id",
    element: <Chat />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
