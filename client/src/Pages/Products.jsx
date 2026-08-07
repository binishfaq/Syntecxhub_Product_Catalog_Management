import { useEffect, useState } from "react";
import ProductCard from "../Components/Products/ProductCard";
import HeroSection from "../Components/Products/HeroSection";
import CategoryFilter from "../Components/Products/CategoryFilter";
import api from "../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter whenever search/category/products change
  useEffect(() => {
    filterProducts();
  }, [search, category, products]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      console.log("Products API:", response.data);

      const data = Array.isArray(response.data.product)
        ? response.data.product
        : [];

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(
        "Failed to fetch products:",
        error.response?.data || error.message
      );

      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Search + category filtering
  const filterProducts = () => {
    let data = [...products];

    // Search by product name
    if (search.trim()) {
      data = data.filter((product) =>
        product.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "All") {
      data = data.filter(
        (product) => product.category?.name === category
      );
    }

    setFilteredProducts(data);
  };

  // Create category list from products
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category?.name)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">

      {/* Hero Section */}
      <HeroSection />

      {/* Search */}
      <div className="my-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        setSelectedCategory={setCategory}
      />

      {/* Products */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="mt-4 text-lg font-semibold text-slate-600">
            Loading Products...
          </p>
        </div>
      ) : (
        <>
          {/* Products Header */}
          <div className="mb-6 mt-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Featured Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Explore our latest collection
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              {filteredProducts.length} Products
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
              <div className="text-5xl">
                🛍️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-700">
                No Products Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try searching with another keyword or category.
              </p>

              {(search || category !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}