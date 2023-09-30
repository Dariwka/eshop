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
import SearchPage from "./pages/Search/SearchPage.jsx";
import SideDrawer from "./components/Drawer/SideDrawer.jsx";
import { useState } from "react";
import BackDrop from "./components/BackDrop/BackDrop.jsx";
import Announcement from "./components/Announcement/Announcement.jsx";
import Success from "./pages/Success/Success.jsx";
import Terms from "./pages/Terms/Terms.jsx";
import Cancel from "./pages/Cancel/Cancel.jsx";
import Rent from "./pages/Rent/Rent.jsx";
import Rents from "./pages/Rents/Rents.jsx";

const Layout = () => {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <div className="app">
      <Announcement />
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <BackDrop show={sideToggle} click={() => setSideToggle(false)} />
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
        path: "/trainings",
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
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/checkout-success",
        element: <Success />,
      },
      {
        path: "/cancel-payment",
        element: <Cancel />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/rents",
        element: <Rents />,
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
