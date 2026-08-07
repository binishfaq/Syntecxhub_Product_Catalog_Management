
import { FaSearch } from "react-icons/fa";

export default function Hero({ search, setSearch }) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back, manage your product catalog efficiently.
          </p>
        </div>

        {/* Right */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:w-80"
          />
        </div>

      </div>
    </div>
  );
}

