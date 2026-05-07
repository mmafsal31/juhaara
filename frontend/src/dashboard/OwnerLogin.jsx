import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Logo from "../components/Logo.jsx";
import { api } from "../services/api.js";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("juhaara_access");
    if (token) {
      navigate("/owner", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const tokenResponse = await api.post("/auth/token/", form);
      localStorage.setItem("juhaara_access", tokenResponse.data.access);
      localStorage.setItem("juhaara_refresh", tokenResponse.data.refresh);
      const profileResponse = await api.get("/auth/profile/");
      if (!profileResponse.data.is_staff) {
        localStorage.removeItem("juhaara_access");
        localStorage.removeItem("juhaara_refresh");
        setError("This login is not allowed for the owner dashboard.");
        return;
      }
      navigate("/owner", { replace: true });
    } catch (error) {
      const message = error.response?.data?.detail || error.response?.data || "Invalid admin username or password.";
      setError(typeof message === "string" ? message : JSON.stringify(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-pearl px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-mist bg-ivory shadow-luxury md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden min-h-[620px] md:block">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=85"
            alt="Juhaara jewelry"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald/80 via-emerald/20 to-transparent" />
          <div className="absolute bottom-8 left-8 max-w-sm text-white">
            <h1 className="font-serif text-5xl leading-none">Private Store Control</h1>
            <p className="mt-4 text-white/75">Manage products, stock, orders, and sales from the hidden owner portal.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex min-h-[560px] flex-col justify-center p-7 md:p-12">
          <Logo />
          <h2 className="mt-10 font-serif text-4xl">Owner Login</h2>
          <p className="mt-2 text-sm text-ink/60">Use a staff account created in Django Admin with <code>is_staff</code> enabled. Admins can create staff users by checking "Staff status" in Django Admin.</p>
          <div className="mt-8 grid gap-4">
            <input
              className="rounded-2xl border border-mist bg-white px-4 py-3 outline-none focus:border-gold"
              placeholder="Admin username"
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              autoComplete="username"
              required
            />
            <input
              className="rounded-2xl border border-mist bg-white px-4 py-3 outline-none focus:border-gold"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              autoComplete="current-password"
              required
            />
            {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <Button disabled={loading}>{loading ? "Checking..." : "Login to Dashboard"}</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

