import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/store.js";
import Button from "./Button.jsx";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wished = useSelector((state) => state.wishlist.ids.includes(product.id));
  const firstApiImage = product.images?.[0]?.image;
  const image = product.image || (firstApiImage?.startsWith("http") ? firstApiImage : firstApiImage ? `${import.meta.env.VITE_MEDIA_URL || "http://127.0.0.1:8001"}${firstApiImage}` : "");
  const category = product.category_name || product.category || "Jewelry";
  const price = Number(product.price);
  const originalPrice = product.originalPrice || product.compare_at_price;
  const cartProduct = { ...product, image, category, price: Number.isFinite(price) ? price : product.price };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-luxury border border-mist bg-ivory shadow-sm transition hover:shadow-luxury"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/4.2] overflow-hidden">
        <img src={image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <button
          aria-label="Toggle wishlist"
          onClick={(event) => {
            event.preventDefault();
            dispatch(toggleWishlist(product.id));
          }}
          className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/80 shadow-sm backdrop-blur transition ${wished ? "text-emerald" : "text-ink"}`}
        >
          <FiHeart fill={wished ? "currentColor" : "none"} />
        </button>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <Link to={`/product/${product.id}`} className="line-clamp-1 text-sm font-semibold text-ink">{product.name}</Link>
          <p className="text-xs text-ink/55">{category}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold">₹{Number.isFinite(price) ? price.toLocaleString("en-IN") : product.price}</span>
            {originalPrice && <span className="ml-2 text-xs text-ink/40 line-through">₹{Number(originalPrice).toLocaleString("en-IN")}</span>}
          </div>
          <span className="flex items-center gap-1 text-xs text-gold"><FiStar fill="currentColor" /> {product.rating}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
          <Button className="py-2" onClick={() => dispatch(addToCart(cartProduct))}>Add to Cart</Button>
          <Button variant="secondary" className="px-3 py-2" onClick={() => dispatch(addToCart(cartProduct))} aria-label="Buy now"><FiShoppingBag /></Button>
        </div>
      </div>
    </motion.article>
  );
}
