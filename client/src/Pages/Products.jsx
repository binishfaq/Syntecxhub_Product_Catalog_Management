// src/Pages/Products.jsx

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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, category, products]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      const data = response.data.product || [];

      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let data = [...products];

    if (search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter(
        (item) => item.category?.name === category
      );
    }

    setFilteredProducts(data);
  };

  const categories = [
    "All",
    ...new Set(
      products.map((item) => item.category?.name).filter(Boolean)
    ),
  ];

 return (
  <div className="min-h-screen bg-slate-100">
    <div className="mx-auto max-w-7xl px-6 py-8">

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
        <div className="py-20 text-center text-lg font-semibold">
          Loading Products...
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              Featured Products
            </h2>

            <span className="text-gray-500">
              {filteredProducts.length} Products
            </span>
          </div>

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
            <div className="rounded-xl bg-white py-20 text-center shadow">
              <h2 className="text-2xl font-bold text-gray-700">
                No Products Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try searching with another keyword or category.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
}