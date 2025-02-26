import { createRoot } from "react-dom/client";
import "flowbite/dist/flowbite.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import  { UserTokenContext } from "./context/UserToken";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { numItem } from "./context/NumberCartContext";
import CounterContextProvider from "./context/Countercontext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <numItem.Provider>
    <QueryClientProvider client={queryClient}>
      <UserTokenContext.Provider>
        <CounterContextProvider>
          <Toaster></Toaster>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </CounterContextProvider>
      </UserTokenContext.Provider>
    </QueryClientProvider>
  </numItem.Provider>
);
