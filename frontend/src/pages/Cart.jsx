import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { removeFromCart, updateQuantity } from "../redux/store.js";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + tax;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <SectionTitle title="Shopping Cart" />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.length === 0 && <div className="rounded-luxury border border-mist bg-ivory p-8">Your cart is waiting for something beautiful.</div>}
          {items.map((item) => (
            <div key={item.id} className="grid gap-4 rounded-luxury border border-mist bg-ivory p-4 md:grid-cols-[110px_1fr_auto]">
              <img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl object-cover" />
              <div><h3 className="font-semibold">{item.name}</h3><p className="text-ink/55">₹{item.price}</p><button className="mt-3 text-sm text-emerald" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button></div>
              <input type="number" min="1" value={item.quantity} onChange={(event) => dispatch(updateQuantity({ id: item.id, quantity: Number(event.target.value) }))} className="h-12 w-24 rounded-2xl border border-mist px-4" />
            </div>
          ))}
        </div>
        <aside className="glass h-fit rounded-luxury p-6">
          <h2 className="font-serif text-3xl">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex justify-between"><span>Subtotal</span><strong>₹{subtotal}</strong></p>
            <p className="flex justify-between"><span>Shipping</span><strong>₹{shipping}</strong></p>
            <p className="flex justify-between"><span>Tax</span><strong>₹{tax}</strong></p>
            <p className="flex justify-between border-t border-mist pt-3 text-lg"><span>Total</span><strong>₹{total}</strong></p>
          </div>
          <input className="mt-5 w-full rounded-2xl border border-mist px-4 py-3" placeholder="Coupon code" />
          <Link to="/checkout"><Button className="mt-4 w-full">Checkout</Button></Link>
        </aside>
      </div>
    </section>
  );
}

