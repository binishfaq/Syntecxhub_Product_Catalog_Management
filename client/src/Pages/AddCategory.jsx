import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../api/CartegoryApi";
import {
  FaFolderPlus,
  FaAlignLeft,
  FaImage,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

export default function AddCategory() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await createCategory({
      name: formData.name,
      description: formData.description,
    });

    alert("Category created successfully");
    navigate("/categories");
  } catch (error) {
    console.log(error.response?.data);
  }
};
 

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">
        Add Category
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Category Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <FaFolderPlus className="text-blue-600" />
            Category Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <FaAlignLeft className="text-blue-600" />
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Category description"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            <FaSave />
            Save Category
          </button>

          <button
            type="button"
            onClick={() => navigate("/categories")}
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