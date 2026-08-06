
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaAlignLeft,
  FaTag,
  FaDollarSign,
  FaWarehouse,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { createProduct, getCategories } from "../api/productApi";

export default function AddProduct() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
  });


  const [categories, setCategories] = useState([]);

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





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      const productData = {

        name: formData.name,

        description: formData.description,

        brand: formData.brand,

        price: Number(formData.price),

        stock: Number(formData.stock),

        category: formData.category,

      };



      const response = await createProduct(productData);


      console.log(response.data);


      alert("Product Added Successfully");


      navigate("/products");


    } catch (error) {

      console.log(error.response?.data || error);

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

            <FaBoxOpen className="text-blue-600"/>

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

            <FaAlignLeft className="text-blue-600"/>

            Description

          </label>



          <textarea

            name="description"

            rows="4"

            value={formData.description}

            onChange={handleChange}

            placeholder="Product description"

            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"

          />


        </div>






        {/* Brand */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">

            <FaTag className="text-blue-600"/>

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


          <div>


            <label className="mb-2 flex items-center gap-2 font-medium">

              <FaDollarSign className="text-green-600"/>

              Price

            </label>



            <input

              type="number"

              name="price"

              required

              value={formData.price}

              onChange={handleChange}

              placeholder="Enter price"

              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"

            />


          </div>





          <div>


            <label className="mb-2 flex items-center gap-2 font-medium">

              <FaWarehouse className="text-orange-600"/>

              Stock

            </label>



            <input

              type="number"

              name="stock"

              required

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


            {
              categories.map((category)=>(

                <option
                  key={category._id}
                  value={category._id}
                >

                  {category.name}

                </option>

              ))
            }


          </select>


        </div>






        {/* Buttons */}


        <div className="flex gap-4">


          <button

            type="submit"

            disabled={loading}

            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"

          >

            <FaSave/>

            {loading ? "Saving..." : "Save Product"}

          </button>





          <button

            type="button"

            onClick={()=>navigate("/products")}

            className="flex items-center gap-2 rounded-lg bg-gray-500 px-6 py-3 text-white hover:bg-gray-600"

          >

            <FaArrowLeft/>

            Cancel

          </button>



        </div>



      </form>


    </div>

  );

}