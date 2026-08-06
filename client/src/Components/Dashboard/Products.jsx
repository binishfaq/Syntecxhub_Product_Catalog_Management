import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState} from "react";
import { getProducts,deleteProduct  } from "../../api/productApi";


export default function ProductsSection() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);


async function fetchProducts() {
  try {
    const response = await getProducts();
    setProducts(Array.isArray(response.data.product) ? response.data.product : []);;
  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false);
  }
}

  useEffect(() => {
   
    fetchProducts();
  }, [])
const handleDelete= async (id) => {
  if(!window.confirm("Delete this product?"))
    return;
  try {
    await deleteProduct(id);
    setProducts((prev)=>
      prev.filter((product)=>product._id !==id));

  } catch (error) {
    console.log(error)
  }
}
if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">

      <div className="flex flex-col items-center gap-4">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

        <p className="font-medium text-slate-600">
          Loading...
        </p>

      </div>

    </div>
  );
}

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Products
        </h2>

        <Link
          to="/products/add"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </td>

                <td className="px-4 py-3 font-medium">
                  {product.name}
                </td>

                <td className="px-4 py-3">
                  {product.description}
                </td>

                <td className="px-4 py-3">
                  {product.brand}
                </td>

                <td className="px-4 py-3">
  {product.category?.name || "No Category"}
</td>

                <td className="px-4 py-3 font-semibold text-green-600">
                  ${product.price}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <Link
  to={`/products/edit/${product._id}`}
  className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600"
>
  <FaEdit />
</Link>

                    <button onClick={()=>handleDelete(product._id)} className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}