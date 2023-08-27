import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import Product from "./pages/Product/Product.jsx";
import Treatments from "./pages/Treatments/Treatments.jsx";
import Treatment from "./pages/Treatment/Treatment.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Course from "./pages/Course/Course.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./app.scss";

import Brand from "./pages/Brand/Brand.jsx";
import Brands from "./pages/Brands/Brands.jsx";
import About from "./pages/About/About.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Professionals from "./pages/Professionals/Professionals.jsx";
import Professional from "./pages/Professional/Professional.jsx";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/treatments",
        element: <Treatments />,
      },
      {
        path: "/treatment/:id",
        element: <Treatment />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },

      {
        path: "/training",
        element: <Courses />,
      },
      {
        path: "/training/:id",
        element: <Course />,
      },
      {
        path: "/professionals",
        element: <Professionals />,
      },
      {
        path: "/professional/:id",
        element: <Professional />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/brand/:id",
        element: <Brand />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
