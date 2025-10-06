import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AppRouterProvider } from "./routes/provider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  );
}

export default App;
