import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import HomePage from "../Pages/HomePage";
import SingleFlowerPage from "../Pages/SingleFlowerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "post/:id",
        element: <SingleFlowerPage />,
      },
    ],
  },
]);