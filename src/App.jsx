import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { queryClient } from "./lib/react-query";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-7xl mx-auto px-4">
          <Header />
          <Outlet />
        </div>
        <ToastContainer autoClose={2000} />
      </QueryClientProvider>
    </>
  );
}

export default App;
