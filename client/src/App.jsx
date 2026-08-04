import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./Components/AppLayout/Applayout";

import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Pages */}
        {token && role === "admin" && (
          <>
            <Route path="/categories" element={<h1>Categories</h1>} />
            <Route path="/products/add" element={<h1>Add Product</h1>} />
            <Route path="/categories/add" element={<h1>Add Category</h1>} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;