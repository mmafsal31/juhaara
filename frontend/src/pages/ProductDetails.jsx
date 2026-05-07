import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiStar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Button from "../components/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { addToCart } from "../redux/store.js";
import { products, reviews } from "../data/catalog.js";
import { api } from "../services/api.js";

export default function ProductDetails() {
  const { id } = useParams();
  const fallbackProduct = products.find((item) => item.id === Number(id)) || products[0];
  const [apiProduct, setApiProduct] = useState(null);
  const product = apiProduct || fallbackProduct;
  const gallery = useMemo(() => {
    if (product.gallery) return product.gallery;
    const images = product.images?.map((item) => item.image?.startsWith("http") ? item.image : `${import.meta.env.VITE_MEDIA_URL || "http://127.0.0.1:8001"}${item.image}`) || [];
    return images.length ? images : [fallbackProduct.image];
  }, [product, fallbackProduct.image]);
  const [image, setImage] = useState(gallery[0]);
  const dispatch = useDispatch();
  const cartProduct = {
    ...product,
    image,
    category: product.category_name || product.category,
    price: Number(product.price)
  };

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get(`/products/${id}/`);
        setApiProduct(response.data);
      } catch {
        setApiProduct(null);
      }
    }
    loadProduct();
  }, [id]);

  useEffect(() => {
    setImage(gallery[0]);
  }, [gallery]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4 md:grid-cols-[110px_1fr]">
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">
            {gallery.map((item) => (
              <button key={item} onClick={() => setImage(item)} className="aspect-square w-24 overflow-hidden rounded-2xl border border-mist">
                <img src={item} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 overflow-hidden rounded-[32px] shadow-luxury md:order-2">
            <img src={image} alt={product.name} className="aspect-square h-full w-full object-cover transition duration-700 hover:scale-110" />
          </div>
        </div>
        <aside className="glass sticky top-28 h-fit rounded-[32px] p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{product.category_name || product.category}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">{product.name}</h1>
          <p className="mt-4 text-ink/65">{product.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-bold">₹{Number(product.price).toLocaleString("en-IN")}</span>
            {(product.originalPrice || product.compare_at_price) && <span className="text-ink/40 line-through">₹{Number(product.originalPrice || product.compare_at_price).toLocaleString("en-IN")}</span>}
            <span className="flex items-center gap-1 text-gold"><FiStar fill="currentColor" /> {product.rating}</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <select className="rounded-2xl border border-mist bg-white px-4 py-3"><option>Size: Adjustable</option><option>Size: 6</option><option>Size: 7</option></select>
            <select className="rounded-2xl border border-mist bg-white px-4 py-3"><option>Gold finish</option><option>Rose gold finish</option></select>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Button onClick={() => dispatch(addToCart(cartProduct))}>Add to Cart</Button>
            <Button onClick={() => dispatch(addToCart(cartProduct))}>Buy Now</Button>
            <Button variant="secondary" aria-label="Wishlist"><FiHeart /></Button>
          </div>
          <div className="mt-7 grid gap-3 text-sm text-ink/60">
            <p>Anti-tarnish coating with 6-month shine support.</p>
            <p>Ships in 24 hours with premium gift packaging.</p>
            <p>Easy 7-day return and exchange.</p>
          </div>
        </aside>
      </div>
      <section className="mt-14">
        <SectionTitle title="Reviews" />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => <div key={review.name} className="rounded-luxury border border-mist bg-ivory p-5"><strong>{review.name}</strong><p className="mt-2 text-ink/65">{review.text}</p></div>)}
        </div>
      </section>
      <section className="mt-14">
        <SectionTitle title="Related Products" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((item) => item.id !== product.id).slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </section>
  );
}
