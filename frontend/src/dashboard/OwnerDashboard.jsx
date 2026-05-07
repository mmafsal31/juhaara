import { Cell, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FiArrowUpRight } from "react-icons/fi";
import { orders, products, salesData } from "../data/catalog.js";

const cards = [
  ["Total Sales", "₹2,45,890", "18.2% this month"],
  ["Orders", "320", "12.5% this month"],
  ["Customers", "1,245", "8.4% this month"],
  ["Revenue Target", "75%", "of ₹5,00,000"]
];
const pieData = [{ name: "New", value: 35 }, { name: "Returning", value: 45 }, { name: "Loyal", value: 20 }];
const colors = ["#4D9473", "#D6B36A", "#7BA7A1"];

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map(([label, value, trend]) => (
          <div key={label} className="rounded-[24px] border border-mist bg-ivory p-6 shadow-sm">
            <p className="text-sm text-ink/55">{label}</p>
            <h2 className="mt-3 text-3xl font-bold">{value}</h2>
            <p className="mt-3 flex items-center gap-1 text-sm text-emerald"><FiArrowUpRight /> {trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Sales Overview">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6DED3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#0D3B2A" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Top Selling Products" action="View All">
          <div className="space-y-4">
            {products.slice(0, 4).map((product, index) => (
              <div key={product.id} className="flex items-center gap-3">
                <img src={product.image} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                <div className="flex-1"><h3 className="text-sm font-semibold">{product.name}</h3><p className="text-xs text-ink/50">{120 - index * 16}+ sold</p></div>
                <strong>₹{(45678 - index * 6400).toLocaleString("en-IN")}</strong>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Recent Orders">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-ink/45"><tr><th className="py-3">Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {orders.map((order) => <tr key={order.id} className="border-t border-mist"><td className="py-4 font-semibold">{order.id}</td><td>{order.customer}</td><td>{order.date}</td><td>{order.amount}</td><td><span className="rounded-full bg-emerald/10 px-3 py-1 text-xs text-emerald">{order.status}</span></td></tr>)}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Customer Insights">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} innerRadius={62} outerRadius={92} dataKey="value">
                {pieData.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid gap-2 text-sm">{pieData.map((item, index) => <p key={item.name} className="flex justify-between"><span>{item.name} Customers</span><strong>{item.value}%</strong></p>)}</div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Sales Report">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6DED3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4D9473" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Recent Notifications" action="View All">
          {["New order #ORD1234 received", "Payment received from Ayesha Khan", "Low stock alert for 5 products", "New customer registered: Neha Sharma"].map((item) => <p key={item} className="border-b border-mist py-3 text-sm text-ink/70">{item}</p>)}
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, action, children }) {
  return (
    <section className="rounded-[24px] border border-mist bg-ivory p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between"><h2 className="font-bold">{title}</h2>{action && <button className="text-sm text-emerald">{action}</button>}</div>
      {children}
    </section>
  );
}

