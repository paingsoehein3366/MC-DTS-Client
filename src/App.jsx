import { QueryClientProvider } from "react-query";
import queryClient from "./lib/react-query";
import { Outlet } from "react-router-dom";
import { Header } from "./components";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-7xl mx-auto px-4">
          <Header />
          <Outlet />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
