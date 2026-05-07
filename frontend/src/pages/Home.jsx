import { motion } from "framer-motion";
import { FiPackage, FiRefreshCw, FiShield, FiTruck } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { categories, heroSlides, products, reviews } from "../data/catalog.js";

const featureIcons = [FiShield, FiPackage, FiTruck, FiRefreshCw];
const features = [
  ["Anti-Tarnish", "Premium quality"],
  ["Handpicked", "Signature pieces"],
  ["Free Shipping", "Across India"],
  ["Easy Returns", "Hassle free"]
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <div className="relative min-h-[520px] overflow-hidden rounded-[32px] shadow-luxury">
          <img src={heroSlides[0].image} alt="Luxury shell charm bracelet" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/72 to-transparent" />
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative flex min-h-[520px] max-w-xl flex-col justify-center px-7 md:px-14">
            <h1 className="font-serif text-5xl font-semibold leading-[0.95] text-ink md:text-7xl">Elegance Within Reach</h1>
            <p className="mt-6 max-w-sm text-base text-ink/70 md:text-lg">Premium Anti-Tarnish Jewelry for Every You.</p>
            <div className="mt-8 flex gap-3">
              <Link to="/shop"><Button>Shop Now</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 md:grid-cols-4 md:px-8">
        {features.map(([title, text], index) => {
          const Icon = featureIcons[index];
          return (
            <motion.div whileHover={{ y: -4 }} key={title} className="glass flex items-center gap-4 rounded-luxury p-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl text-emerald shadow-sm"><Icon /></span>
              <div><h3 className="font-semibold">{title}</h3><p className="text-sm text-ink/55">{text}</p></div>
            </motion.div>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <SectionTitle title="Shop by Category" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <motion.div whileHover={{ scale: 1.04 }} key={category.name} className="text-center">
              <Link to={`/shop?category=${category.name}`} className="group block">
                <div className="mx-auto aspect-square max-w-[170px] overflow-hidden rounded-full border border-mist shadow-sm transition group-hover:shadow-glow">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <h3 className="mt-4 font-semibold">{category.name}</h3>
                <p className="text-sm text-ink/50">({category.count})</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <SectionTitle title="Best Selling Pieces" action={<Link to="/shop"><Button variant="secondary">View All</Button></Link>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((product) => product.isBestSeller).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="overflow-hidden bg-emerald py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionTitle eyebrow="Trending" title="The Shell Garden Collection" />
          <div className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
            {products.map((product) => (
              <div key={product.id} className="min-w-[260px] rounded-luxury bg-white/10 p-3 backdrop-blur">
                <img src={product.image} alt={product.name} className="aspect-[4/3] rounded-2xl object-cover" />
                <h3 className="mt-4 font-semibold">{product.name}</h3>
                <p className="text-sm text-white/70">Recently viewed by luxury shoppers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <SectionTitle eyebrow="Reviews" title="Loved by Everyday Stylists" />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="glass rounded-luxury p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="h-14 w-14 rounded-full object-cover" />
                <div><h3 className="font-semibold">{review.name}</h3><p className="text-sm text-gold">★★★★★</p></div>
              </div>
              <p className="mt-5 text-ink/70">“{review.text}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <SectionTitle eyebrow="Social" title="Seen on Instagram" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <img key={product.id} src={product.image} alt="" className={`h-full min-h-52 rounded-luxury object-cover shadow-sm ${index === 1 ? "md:row-span-2" : ""}`} />
          ))}
        </div>
      </section>

      <footer id="footer" className="bg-ink px-4 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div><h2 className="font-serif text-3xl">JUHAARA</h2><p className="mt-3 max-w-sm text-white/60">Premium anti-tarnish jewelry, crafted for soft glamour and everyday ease.</p></div>
          <div><h3 className="font-semibold">Shop</h3><p className="mt-3 text-white/60">Necklaces<br />Bracelets<br />Rings<br />Earrings</p></div>
          <div><h3 className="font-semibold">Support</h3><p className="mt-3 text-white/60">Returns<br />Shipping<br />Contact<br />Track order</p></div>
          <div><h3 className="font-semibold">Newsletter</h3><div className="mt-4 flex rounded-2xl bg-white p-1"><input className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none" placeholder="Email address" /><Button className="py-2">Join</Button></div></div>
        </div>
      </footer>
    </>
  );
}
