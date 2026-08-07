import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaAlignLeft,
  FaTag,
  FaDollarSign,
  FaWarehouse,
  FaImage,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import {
  createProduct,
  getCategories,
} from "../api/productApi";

    export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        setCategories(response.data.category || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  // Handle text/select inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });

    // Image preview
    setPreview(URL.createObjectURL(file));
  };

  // Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // FormData is required for image upload
      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append(
        "description",
        formData.description
      );
      productData.append("brand", formData.brand);
      productData.append(
        "price",
        Number(formData.price)
      );
      productData.append(
        "stock",
        Number(formData.stock)
      );
      productData.append(
        "category",
        formData.category
      );

      // Add image only if selected
      if (formData.image) {
        productData.append(
          "image",
          formData.image
        );
      }

      const response = await createProduct(productData);

      console.log(response.data);

      alert("Product Added Successfully");

      navigate("/products");

    } catch (error) {
      console.log(
        error.response?.data || error
      );

      alert(
        error.response?.data?.msg ||
          "Failed to create product"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Add Product
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new product for your store
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Product Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <FaBoxOpen className="text-blue-600" />
            Product Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <FaAlignLeft className="text-blue-600" />
            Description
          </label>

          <textarea
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <FaTag className="text-blue-600" />
            Brand
          </label>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Price + Stock */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* Price */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <FaDollarSign className="text-green-600" />
              Price
            </label>

            <input
              type="number"
              name="price"
              required
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <FaWarehouse className="text-orange-600" />
              Stock
            </label>

            <input
              type="number"
              name="stock"
              required
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Available stock"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Image */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <FaImage className="text-blue-600" />
            Product Image
          </label>

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            JPG, JPEG, PNG or WEBP. Maximum size: 5MB.
          </p>
        </div>

        {/* Image Preview */}
        {preview && (
          <div>
            <h3 className="mb-3 font-semibold">
              Image Preview
            </h3>

            <img
              src={preview}
              alt="Product Preview"
              className="h-52 w-52 rounded-lg border object-cover"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaSave />

            {loading
              ? "Saving..."
              : "Save Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 rounded-lg bg-gray-500 px-6 py-3 text-white hover:bg-gray-600"
          >
            <FaArrowLeft />
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}

