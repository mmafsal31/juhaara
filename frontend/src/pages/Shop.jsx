import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { categories, products } from "../data/catalog.js";
import { api } from "../services/api.js";

export default function Shop() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [apiProducts, setApiProducts] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          api.get("/products/?page_size=100"),
          api.get("/categories/?page_size=100")
        ]);
        setApiProducts(productResponse.data.results || productResponse.data);
        setApiCategories(categoryResponse.data.results || categoryResponse.data);
      } catch {
        setApiProducts([]);
      }
    }
    loadProducts();
  }, []);

  const sourceProducts = apiProducts.length ? apiProducts : products;
  const sourceCategories = apiCategories.length ? apiCategories : categories;

  const filtered = useMemo(() => {
    const list = category === "All" ? [...sourceProducts] : sourceProducts.filter((product) => (product.category_name || product.category) === category);
    if (sort === "latest") return list.reverse();
    if (sort === "price") return list.sort((a, b) => a.price - b.price);
    return list.sort((a, b) => b.rating - a.rating);
  }, [category, sort, sourceProducts]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <SectionTitle eyebrow="Shop" title="All Jewelry" />
      <div className="mb-8 grid gap-4 rounded-luxury border border-mist bg-ivory p-4 md:grid-cols-5">
        <select className="rounded-2xl border border-mist bg-white px-4 py-3" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>All</option>
          {sourceCategories.map((item) => <option key={item.name}>{item.name}</option>)}
        </select>
        <select className="rounded-2xl border border-mist bg-white px-4 py-3" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="popular">Popular</option>
          <option value="latest">Latest</option>
          <option value="price">Price</option>
        </select>
        <select className="rounded-2xl border border-mist bg-white px-4 py-3"><option>₹0 - ₹999</option><option>₹1000+</option></select>
        <select className="rounded-2xl border border-mist bg-white px-4 py-3"><option>4 stars & up</option></select>
        <select className="rounded-2xl border border-mist bg-white px-4 py-3"><option>In stock</option></select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
