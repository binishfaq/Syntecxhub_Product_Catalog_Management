import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const guestLinks = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
  ];

  const userLinks = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
  ];

  const adminLinks = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "Categories", to: "/categories" },
    { name: "Add Product", to: "/products/add" },
    { name: "Add Category", to: "/categories/add" },
    { name: "Dashboard", to: "/dashboard" }
  ];

  const navLinks = !token
    ? guestLinks
    : role === "admin"
    ? adminLinks
    : userLinks;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          Product<span className="text-blue-500">Catalog</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {!token ? (
            <>
              <NavLink
                to="/login"
                className="rounded-lg border border-blue-500 px-4 py-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className="rounded-lg px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white"
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
        >
          {isOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-900 md:hidden">
          <div className="space-y-2 px-4 py-4">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <hr className="border-slate-700" />

            {!token ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg border border-blue-500 px-4 py-3 text-center text-blue-400"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-white"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-slate-700"
                >
                  Profile
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}