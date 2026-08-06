import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./Components/AppLayout/Applayout";
import ProtectedRoute from "./Components/protection/ProtectedRoutes";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import AddProduct from "./Pages/AddProduct";
import AddCategory from "./Pages/AddCategory";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Only */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute adminOnly={true}>
              <Categories />
            </ProtectedRoute>
          }
        />
        
        <Route

          path="/dashboard"

          element={

            <ProtectedRoute adminOnly={true}>

              <Dashboard />

            </ProtectedRoute>

          }

        />

        <Route
          path="/products/add"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/add"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddCategory />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;