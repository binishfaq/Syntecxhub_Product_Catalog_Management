import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";
import api from "../../api/api";

export default function StatsCards() {
  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    stock: 0,
  });

 
  async function fetchStats() {
  try {
    const response = await api.get("/products/dashboardstats");

    const data = response.data.stats;

    setStats({
      products: data.reduce((sum, item) => sum + item.totalProducts, 0),
      stock: data.reduce((sum, item) => sum + item.totalStock, 0),
      categories: data.length,
      users: 0, // you don't return users
    });
  } catch (error) {
    console.log(error);
  }
}
   useEffect(() => {
    fetchStats();
  }, []);


  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {/* Products */}
      <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Products</p>
            <h2 className="mt-2 text-3xl font-bold">
              {stats.products}
            </h2>
          </div>

          <div className="rounded-full bg-blue-100 p-4">
            <FaBoxOpen className="text-2xl text-blue-600" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <h2 className="mt-2 text-3xl font-bold">
              {stats.categories}
            </h2>
          </div>

          <div className="rounded-full bg-green-100 p-4">
            <FaTags className="text-2xl text-green-600" />
          </div>
        </div>
      </div>

      {role === "admin" && (
        <>
          {/* Users */}
          <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Users</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {stats.users}
                </h2>
              </div>

              <div className="rounded-full bg-purple-100 p-4">
                <FaUsers className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Stock</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {stats.stock}
                </h2>
              </div>

              <div className="rounded-full bg-orange-100 p-4">
                <FaWarehouse className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}