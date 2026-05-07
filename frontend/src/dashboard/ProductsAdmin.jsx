import { useEffect, useMemo, useState } from "react";
import { FiEdit3, FiTrash2, FiUpload } from "react-icons/fi";
import Button from "../components/Button.jsx";
import { api } from "../services/api.js";

const emptyForm = {
  name: "",
  category: "",
  newCategory: "",
  price: "",
  compare_at_price: "",
  stock: "",
  rating: "0",
  description: "",
  seo_title: "",
  seo_description: "",
  is_featured: false,
  is_active: true,
  images: []
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const imageNames = useMemo(() => Array.from(form.images || []).map((file) => file.name).join(", "), [form.images]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        api.get("/products/?page_size=100"),
        api.get("/categories/?page_size=100")
      ]);
      setProducts(productResponse.data.results || productResponse.data);
      setCategories(categoryResponse.data.results || categoryResponse.data);
    } catch {
      setMessage("Could not load product data. Check that the backend server is running.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function ensureCategory() {
    if (form.category !== "__new") return form.category;
    const response = await api.post("/categories/", {
      name: form.newCategory,
      description: `Created from owner dashboard for ${form.newCategory}.`,
      is_active: true
    });
    setCategories((current) => [...current, response.data]);
    return response.data.id;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const categoryId = await ensureCategory();
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("category", categoryId);
      payload.append("price", form.price);
      payload.append("stock", form.stock || "0");
      payload.append("rating", form.rating || "0");
      payload.append("description", form.description);
      payload.append("seo_title", form.seo_title);
      payload.append("seo_description", form.seo_description);
      payload.append("is_featured", form.is_featured ? "true" : "false");
      payload.append("is_active", form.is_active ? "true" : "false");
      if (form.compare_at_price) payload.append("compare_at_price", form.compare_at_price);
      Array.from(form.images || []).forEach((image) => payload.append("uploaded_images", image));

      if (editingId) {
        await api.patch(`/products/${editingId}/`, payload, { headers: { "Content-Type": "multipart/form-data" } });
        setMessage("Product updated successfully.");
      } else {
        await api.post("/products/", payload, { headers: { "Content-Type": "multipart/form-data" } });
        setMessage("Product and images added successfully.");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadDashboardData();
    } catch (error) {
      const detail = error.response?.data ? JSON.stringify(error.response.data) : "Please check all fields and admin login.";
      setMessage(`Save failed: ${detail}`);
    } finally {
      setSaving(false);
    }
  }

  function editProduct(product) {
    setEditingId(product.id);
    setForm({
      ...emptyForm,
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      compare_at_price: product.compare_at_price || "",
      stock: product.stock || "",
      rating: product.rating || "0",
      description: product.description || "",
      seo_title: product.seo_title || "",
      seo_description: product.seo_description || "",
      is_featured: Boolean(product.is_featured),
      is_active: Boolean(product.is_active)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProduct(productId) {
    if (!window.confirm("Delete this product from the store?")) return;
    try {
      await api.delete(`/products/${productId}/`);
      setProducts((current) => current.filter((product) => product.id !== productId));
      setMessage("Product deleted.");
    } catch {
      setMessage("Delete failed. Check your admin login and try again.");
    }
  }

  function productImage(product) {
    const firstImage = product.images?.[0]?.image;
    if (!firstImage) return "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80";
    return firstImage.startsWith("http") ? firstImage : `${import.meta.env.VITE_MEDIA_URL || "http://127.0.0.1:8001"}${firstImage}`;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={handleSubmit} className="rounded-[24px] border border-mist bg-ivory p-6 shadow-sm">
        <h2 className="font-serif text-3xl">{editingId ? "Edit Product" : "Add Product"}</h2>
        <div className="mt-5 grid gap-4">
          <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Product name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          <select className="rounded-2xl border border-mist px-4 py-3" value={form.category} onChange={(event) => updateField("category", event.target.value)} required>
            <option value="">Select category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            <option value="__new">Create new category</option>
          </select>
          {form.category === "__new" && <input className="rounded-2xl border border-mist px-4 py-3" placeholder="New category name" value={form.newCategory} onChange={(event) => updateField("newCategory", event.target.value)} required />}
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Price" type="number" min="0" step="0.01" value={form.price} onChange={(event) => updateField("price", event.target.value)} required />
            <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Compare price" type="number" min="0" step="0.01" value={form.compare_at_price} onChange={(event) => updateField("compare_at_price", event.target.value)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Stock" type="number" min="0" value={form.stock} onChange={(event) => updateField("stock", event.target.value)} required />
            <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => updateField("rating", event.target.value)} />
          </div>
          <textarea className="min-h-24 rounded-2xl border border-mist px-4 py-3" placeholder="Description" value={form.description} onChange={(event) => updateField("description", event.target.value)} required />
          <input className="rounded-2xl border border-mist px-4 py-3" placeholder="SEO title" value={form.seo_title} onChange={(event) => updateField("seo_title", event.target.value)} />
          <textarea className="min-h-20 rounded-2xl border border-mist px-4 py-3" placeholder="SEO description" value={form.seo_description} onChange={(event) => updateField("seo_description", event.target.value)} />
          <label className="grid min-h-36 cursor-pointer place-items-center rounded-2xl border border-dashed border-gold bg-pearl p-4 text-center text-emerald">
            <FiUpload className="text-3xl" />
            <span>{imageNames || "Drag and drop or click to upload product images"}</span>
            <input className="hidden" type="file" accept="image/*" multiple onChange={(event) => updateField("images", event.target.files)} />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-mist p-4">Feature product <input type="checkbox" checked={form.is_featured} onChange={(event) => updateField("is_featured", event.target.checked)} /></label>
          {message && <p className="rounded-2xl bg-pearl px-4 py-3 text-sm text-emerald">{message}</p>}
          <div className="grid gap-3 sm:grid-cols-2">
            <Button disabled={saving}>{saving ? "Saving..." : editingId ? "Update Product" : "Save Product"}</Button>
            {editingId && <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</Button>}
          </div>
        </div>
      </form>
      <section className="rounded-[24px] border border-mist bg-ivory p-6 shadow-sm">
        <h2 className="font-serif text-3xl">Inventory</h2>
        <div className="mt-5 grid gap-4">
          {loading && <p className="text-sm text-ink/55">Loading products...</p>}
          {!loading && products.length === 0 && <p className="rounded-2xl bg-pearl p-4 text-sm text-ink/60">No products yet. Add your first product from the form.</p>}
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-mist p-3">
              <img src={productImage(product)} alt="" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-ink/55">₹{product.price} · Stock: {product.stock} · {product.category_name}</p>
              </div>
              <button onClick={() => editProduct(product)} className="grid h-10 w-10 place-items-center rounded-full border border-mist text-emerald" aria-label="Edit product"><FiEdit3 /></button>
              <button onClick={() => deleteProduct(product.id)} className="grid h-10 w-10 place-items-center rounded-full border border-mist text-red-600" aria-label="Delete product"><FiTrash2 /></button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
