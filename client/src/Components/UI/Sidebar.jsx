import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaPlusCircle,
  FaFolderPlus,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const adminLinks = [
    {
      name: "Dashboard",
      to: "/",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Products",
      to: "/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Categories",
      to: "/categories",
      icon: <FaTags />,
    },
    {
      name: "Add Product",
      to: "/products/add",
      icon: <FaPlusCircle />,
    },
    {
      name: "Add Category",
      to: "/categories/add",
      icon: <FaFolderPlus />,
    },
    {
      name: "Profile",
      to: "/profile",
      icon: <FaUser />,
    },
  ];

  const userLinks = [
    {
      name: "Products",
      to: "/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Profile",
      to: "/profile",
      icon: <FaUser />,
    },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="hidden min-h-screen w-64 bg-slate-900 text-white lg:block">
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-2xl font-bold">
          Admin Panel
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Product Catalog
        </p>
      </div>

      <nav className="mt-4 px-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>

            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}