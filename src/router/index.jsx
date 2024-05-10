import App from "@/App";
import { DoctorListRoute } from "@/features/doctor";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
        children: [
            {
                  path: "",
                  element: <DoctorListRoute />
            },
        ]
      },
    ]);
    
export default router;
