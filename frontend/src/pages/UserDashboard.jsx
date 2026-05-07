import SectionTitle from "../components/SectionTitle.jsx";

const panels = ["Profile", "Orders", "Wishlist", "Saved Address", "Notifications", "Order Tracking"];

export default function UserDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <SectionTitle title="My Account" />
      <div className="grid gap-4 md:grid-cols-3">
        {panels.map((panel) => <div key={panel} className="rounded-luxury border border-mist bg-ivory p-6 shadow-sm"><h2 className="font-serif text-2xl">{panel}</h2><p className="mt-2 text-sm text-ink/60">Manage your {panel.toLowerCase()}.</p></div>)}
      </div>
    </section>
  );
}

