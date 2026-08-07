import { Link } from "react-router-dom";
import { FaEye, FaTag, FaBuilding } from "react-icons/fa";

export default function ProductCard({ product }) {
  // Build backend image URL
  const imageUrl = product.image
    ? `http://localhost:5000/${product.image
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")}`
    : "https://via.placeholder.com/500x350?text=No+Image";

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="h-64 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          onError={(e) => {
            console.log("Image failed to load:", imageUrl);
            e.currentTarget.src =
              "https://via.placeholder.com/500x350?text=No+Image";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
          {product.category?.name || "Uncategorized"}
        </span>

        {/* Product Name */}
        <h2 className="mt-3 text-xl font-bold text-slate-800">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        {/* Brand */}
        {product.brand && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <FaBuilding className="text-blue-600" />
            {product.brand}
          </div>
        )}

        {/* Stock */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <FaTag className="text-green-600" />
          Stock: {product.stock}
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-green-600">
            ${product.price}
          </h3>

          <Link
            to={`/products/${product._id}`}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <FaEye />
            View
          </Link>
        </div>

      </div>
    </div>
  );
}
