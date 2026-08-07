
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productApi";

export default function ProductsSection({ search = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      setProducts(
        Array.isArray(response.data.product)
          ? response.data.product
          : []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.msg ||
          "Failed to delete product"
      );
    }
  };

  // Search filter
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.category?.name
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="font-medium text-slate-600">
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage all products in your store
          </p>
        </div>

        <Link
          to="/products/add"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Add Product
        </Link>

      </div>

      {/* Search Result */}
      {search.trim() && (
        <div className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Showing results for:
          <span className="ml-1 font-semibold">
            "{search}"
          </span>

          <span className="ml-2 text-blue-500">
            ({filteredProducts.length} found)
          </span>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">

          <thead className="bg-slate-100">
            <tr>

              <th className="px-4 py-3 text-left">
                Image
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Description
              </th>

              <th className="px-4 py-3 text-left">
                Brand
              </th>

              <th className="px-4 py-3 text-left">
                Category
              </th>

              <th className="px-4 py-3 text-left">
                Price
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredProducts.length > 0 ? (

              filteredProducts.map((product) => {

                // Backend image URL
                const imageUrl = product.image
                  ? `http://localhost:5000${
                      product.image.startsWith("/")
                        ? ""
                        : "/"
                    }${encodeURI(
                      product.image.replace(/\\/g, "/")
                    )}`
                  : "https://via.placeholder.com/100x100?text=No+Image";

                return (
                  <tr
                    key={product._id}
                    className="border-b transition hover:bg-slate-50"
                  >

                    {/* Image */}
                    <td className="px-4 py-3">
                      <div className="h-14 w-14 overflow-hidden rounded-lg bg-gray-100">

                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            console.log(
                              "Image failed:",
                              imageUrl
                            );

                            e.currentTarget.src =
                              "https://via.placeholder.com/100x100?text=No+Image";
                          }}
                        />

                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {product.name}
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-4 py-3 text-sm text-slate-600">
                      <p className="line-clamp-2">
                        {product.description}
                      </p>
                    </td>

                    {/* Brand */}
                    <td className="px-4 py-3 text-slate-700">
                      {product.brand || "N/A"}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {product.category?.name ||
                          "No Category"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-semibold text-green-600">
                      ${product.price}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">

                        {/* Edit */}
                        <Link
                          to={`/products/edit/${product._id}`}
                          className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                          title="Edit Product"
                        >
                          <FaEdit />
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })

            ) : (

              <tr>
                <td
                  colSpan="7"
                  className="py-12 text-center"
                >

                  <p className="text-lg font-semibold text-gray-600">
                    No Products Found
                  </p>

                  {search.trim() && (
                    <p className="mt-2 text-sm text-gray-400">
                      Try searching for another product,
                      brand, or category.
                    </p>
                  )}

                </td>
              </tr>

            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}