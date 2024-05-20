import App from "@/App";
import { NoFound } from "@/components";
import { AppointmentListRoute } from "@/features/appointment";
import { DoctorListRoute, DoctorProfileRoute } from "@/features/doctor";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
      {
            path: "/",
            element: <App />,
            children: [
                  {
                        path: "*",
                        element: <NoFound />,
                  },
                  {
                        path: "",
                        element: <DoctorListRoute />,
                  },
                  {
                        path: "/:doctorId/profile",
                        element: <DoctorProfileRoute />,
                  },
                  {
                        path: "/appointments",
                        element: <AppointmentListRoute />
                  },
            ],
      },
]);

export default router;
