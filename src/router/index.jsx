import App from "@/App";
import { DoctorListRoute, DoctorProfileRoute } from "@/features/doctor";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <DoctorListRoute />,
      },
      {
        path: "/:doctorId/profile",
        element: <DoctorProfileRoute />,
      },
    ],
  },
]);

export default router;
