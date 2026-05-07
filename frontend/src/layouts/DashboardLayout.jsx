import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiBell, FiBox, FiGrid, FiLogOut, FiPackage, FiPieChart, FiSettings, FiShoppingBag, FiStar, FiTag, FiUsers } from "react-icons/fi";
import Logo from "../components/Logo.jsx";
import useRealtimeNotifications from "../hooks/useRealtimeNotifications.js";

const links = [
  [FiGrid, "Dashboard", "/owner"],
  [FiShoppingBag, "Orders", "/owner/orders"],
  [FiBox, "Products", "/owner/products"],
  [FiPackage, "Categories", "/owner/products"],
  [FiUsers, "Customers", "/owner"],
  [FiPieChart, "Sales", "/owner"],
  [FiStar, "Reviews", "/owner"],
  [FiBell, "Notifications", "/owner"],
  [FiTag, "Coupons", "/owner"],
  [FiSettings, "Settings", "/owner/settings"]
];

export default function DashboardLayout() {
  useRealtimeNotifications();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("juhaara_access");
    localStorage.removeItem("juhaara_refresh");
    navigate("/jahaara", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-ink">
      <div className="mx-auto grid max-w-[1500px] gap-6 p-4 md:grid-cols-[260px_1fr] md:p-6">
        <aside className="sticky top-6 hidden h-[calc(100vh-48px)] rounded-[28px] border border-mist bg-ivory p-5 shadow-sm md:flex md:flex-col">
          <div className="rounded-3xl bg-emerald p-5"><Logo /></div>
          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {links.map(([Icon, label, to]) => (
              <NavLink end={to === "/owner"} key={label} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${isActive ? "bg-pearl text-emerald" : "text-ink/65 hover:bg-pearl"}`}>
                <Icon /> {label}
              </NavLink>
            ))}
          </nav>
          <button onClick={logout} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-ink/65"><FiLogOut /> Logout</button>
        </aside>
        <div>
          <header className="mb-6 flex items-center justify-between rounded-[28px] border border-mist bg-ivory p-5 shadow-sm">
            <div><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-sm text-ink/55">Live sales, orders, customers, and inventory.</p></div>
            <div className="flex items-center gap-3"><button className="relative grid h-11 w-11 place-items-center rounded-full bg-pearl"><FiBell /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold" /></button><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Admin" className="h-11 w-11 rounded-full object-cover" /></div>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
