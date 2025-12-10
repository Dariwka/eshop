import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
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
import SearchPage from "./pages/Search/SearchPage.jsx";
import SideDrawer from "./components/Drawer/SideDrawer.jsx";
import { useState } from "react";
import BackDrop from "./components/BackDrop/BackDrop.jsx";
import Announcement from "./components/Announcement/Announcement.jsx";
import Success from "./pages/Success/Success.jsx";
import Terms from "./pages/Terms/Terms.jsx";
import Cancel from "./pages/Cancel/Cancel.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess/CheckoutSuccess.jsx";
import ConsentBar from "./components/Consent/ConsentBar.jsx";
import PromoSquareModal from "./components/PromoBanner/PromoSquareModal.jsx";
import Privacy from "./pages/Privacy/Privacy.jsx";
import Precare from "./pages/Precare/Precare.jsx";
import LipolaserHoitoHelsinki from "./pages/Seo/LipolaserHoitoHelsinki.jsx";
import KriolipolyysiHelsinki from "./pages/Seo/KriolipolyysiHelsinki.jsx";
import DiodilaserHelsinki from "./pages/Seo/DiodilaserHelsinki.jsx";
import RipsienpidennysHelsinki from "./pages/Seo/RipsienpidennysHelsinki.jsx";
import SokerointiHelsinki from "./pages/Seo/SokerointiHelsinki.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import AccountPage from "./pages/Account/AccountPage.jsx";
import OrdersPage from "./pages/Orders/OrdersPage.jsx";
import RegisterPage from "./pages/Auth/RigesterPage.jsx";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage.jsx";

const Layout = () => {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <div className="app">
      <Announcement />
      <Navbar click={() => setSideToggle(true)} />
      <PromoSquareModal />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <BackDrop show={sideToggle} click={() => setSideToggle(false)} />
      <Outlet />
      <ConsentBar />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Navigate to="/" replace />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/treatments",
        element: <Treatments />,
      },
      {
        path: "/treatment/:slug",
        element: <Treatment />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:slug",
        element: <Product />,
      },
      {
        path: "/trainings",
        element: <Courses />,
      },
      {
        path: "/training/:slug",
        element: <Course />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/brands/:slug",
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
        path: "/checkout-success-payment",
        element: <CheckoutSuccess />,
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
        path: "/precare",
        element: <Precare />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/lipolaser-hoito-helsinki",
        element: <LipolaserHoitoHelsinki />,
      },
      {
        path: "/kriolipolyysi-helsinki",
        element: <KriolipolyysiHelsinki />,
      },
      {
        path: "/diodilaser-helsinki",
        element: <DiodilaserHelsinki />,
      },
      {
        path: "/ripsienpidennys-helsinki",
        element: <RipsienpidennysHelsinki />,
      },
      {
        path: "/sokerointi-helsinki",
        element: <SokerointiHelsinki />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      { path: "*", element: <Navigate to="/" replace /> },
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
