import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Products from "./components/Products";
import Brand from "./components/Brand";
import Categories from "./components/Categories";
import CategoryProducts from "./components/CategoryProducts";
import BrandProducts from "./components/CategoryProducts";
import ProductDetails from "./components/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserTokenProvider } from "./context/UserToken";
import "./index.css";

function App() {
  const queryClient = new QueryClient();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        { path: "/products", element: <Products></Products> },
        {
          path: "/ProductDetails/:id/:catId",
          element: <ProductDetails></ProductDetails>,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },

        {
          path: "brands",
          element: <Brand />,
        },
        {
          path: "brands/:id",
          element: <BrandProducts />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categories/:id",
          element: <CategoryProducts />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserTokenProvider>
        <RouterProvider router={routes} />
      </UserTokenProvider>
    </QueryClientProvider>
  );
}

export default App;
