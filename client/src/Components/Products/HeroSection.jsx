import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-8 py-16 text-white shadow-xl">
      {/* Background Decoration */}
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-white/5"></div>

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
        {/* Left Side */}
        <div>
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            Product Catalog Management
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            Discover Amazing <br />
            Products Every Day
          </h1>

          <p className="mt-6 max-w-xl text-lg text-blue-100">
            Explore products from multiple categories, compare prices,
            discover trusted brands, and find exactly what you're looking
            for with our powerful catalog.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="#products"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100"
            >
              Browse Products
              <FaArrowRight />
            </Link>

            <Link
              to="/categories"
              className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-blue-700"
            >
              Categories
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden justify-center lg:flex">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700"
            alt="Products"
            className="w-full max-w-md rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}