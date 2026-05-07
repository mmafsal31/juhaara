import Button from "../components/Button.jsx";
import { orders } from "../data/catalog.js";

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersAdmin() {
  return (
    <section className="rounded-[24px] border border-mist bg-ivory p-6 shadow-sm">
      <h2 className="font-serif text-3xl">Order Management</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-ink/45"><tr><th className="py-3">Order</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th><th>Invoice</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-mist">
                <td className="py-4 font-semibold">{order.id}</td><td>{order.customer}</td><td>{order.date}</td><td>{order.amount}</td>
                <td><select defaultValue={order.status} className="rounded-xl border border-mist px-3 py-2">{statuses.map((status) => <option key={status}>{status}</option>)}</select></td>
                <td><Button variant="secondary" className="py-2">Generate</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

