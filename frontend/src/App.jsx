import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Auth from "./pages/Auth.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import OwnerDashboard from "./dashboard/OwnerDashboard.jsx";
import ProductsAdmin from "./dashboard/ProductsAdmin.jsx";
import OrdersAdmin from "./dashboard/OrdersAdmin.jsx";
import SettingsAdmin from "./dashboard/SettingsAdmin.jsx";
import OwnerLogin from "./dashboard/OwnerLogin.jsx";
import ProtectedOwnerRoute from "./dashboard/ProtectedOwnerRoute.jsx";
import PageTransition from "./animations/PageTransition.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
          <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
          <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
          <Route path="/account" element={<PageTransition><UserDashboard /></PageTransition>} />
        </Route>
        <Route path="/jahaara" element={<PageTransition><OwnerLogin /></PageTransition>} />
        <Route element={<ProtectedOwnerRoute />}>
          <Route path="/owner" element={<DashboardLayout />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
