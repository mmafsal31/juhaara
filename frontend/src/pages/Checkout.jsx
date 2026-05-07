import Button from "../components/Button.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Checkout() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <SectionTitle title="Checkout" />
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <form className="grid gap-4 rounded-luxury border border-mist bg-ivory p-6">
          <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Full name" />
          <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Phone number" />
          <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Email address" />
          <textarea className="min-h-28 rounded-2xl border border-mist px-4 py-3" placeholder="Shipping address" />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="rounded-2xl border border-mist p-4"><input type="radio" name="payment" defaultChecked /> Razorpay / Card</label>
            <label className="rounded-2xl border border-mist p-4"><input type="radio" name="payment" /> Cash on delivery</label>
          </div>
          <Button>Place Order</Button>
        </form>
        <aside className="glass h-fit rounded-luxury p-6">
          <h2 className="font-serif text-2xl">Protected Checkout</h2>
          <p className="mt-3 text-sm text-ink/60">Payment gateway hooks are ready for Razorpay or Stripe. COD is supported from the order API.</p>
        </aside>
      </div>
    </section>
  );
}

