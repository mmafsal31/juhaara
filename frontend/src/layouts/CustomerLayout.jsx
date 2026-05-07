import { Outlet, NavLink, Link } from "react-router-dom";
import { FiHeart, FiHome, FiMenu, FiMoon, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../components/Logo.jsx";
import { toggleDarkMode } from "../redux/store.js";

const nav = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Collections", "/shop?sort=popular"],
  ["About Us", "/#reviews"],
  ["Contact", "/#footer"]
];

export default function CustomerLayout() {
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen text-ink">
      <div className="bg-emerald py-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white">Free shipping on orders above ₹999</div>
      <header className="sticky top-0 z-40 border-b border-mist/80 bg-ivory/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <button className="grid h-10 w-10 place-items-center rounded-full border border-mist md:hidden" aria-label="Open menu"><FiMenu /></button>
          <Link to="/"><Logo /></Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {nav.map(([label, to]) => (
              <NavLink key={label} to={to} className={({ isActive }) => isActive ? "text-emerald" : "text-ink/70 hover:text-emerald"}>{label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {[FiSearch, FiHeart, FiUser].map((Icon, index) => (
              <button key={index} className="hidden h-10 w-10 place-items-center rounded-full hover:bg-pearl md:grid" aria-label="Header action"><Icon /></button>
            ))}
            <button className="hidden h-10 w-10 place-items-center rounded-full hover:bg-pearl md:grid" aria-label="Toggle dark mode" onClick={() => dispatch(toggleDarkMode())}><FiMoon /></button>
            <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-pearl" aria-label="Cart">
              <FiShoppingBag />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-emerald">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-mist bg-ivory/95 px-3 py-2 backdrop-blur md:hidden">
        {[[FiHome, "/"], [FiSearch, "/shop"], [FiHeart, "/account"], [FiShoppingBag, "/cart"]].map(([Icon, to]) => (
          <Link key={to} to={to} className="grid justify-items-center gap-1 py-1 text-xs text-emerald"><Icon className="text-lg" /></Link>
        ))}
      </nav>
    </div>
  );
}

