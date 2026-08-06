import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getCategories, deleteCategory } from "../api/CartegoryApi";

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchCategories = async () => {
  try {
    const response = await getCategories();

    console.log(response.data);

    setCategories(response.data.category || []);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCategories();
  }, []);


  const handleDelete = async (id) => {

    if(!window.confirm("Delete this category?"))
      return;

    try {

      await deleteCategory(id);

      setCategories((prev)=>
        prev.filter((category)=>category._id !== id)
      );

    } catch(error){
      console.log(error);
    }

  };


  if(loading){
    return (
      <h2 className="p-5 text-xl font-bold">
        Loading Categories...
      </h2>
    )
  }


  return (

<div className="p-6">

{/* Header */}

<div className="mb-6 flex items-center justify-between">

<div>
<h1 className="text-3xl font-bold">
Categories
</h1>

<p className="mt-2 text-slate-500">
Manage all product categories
</p>

</div>


<Link
to="/categories/add"
className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white"
>

<FaPlus/>

Add Category

</Link>

</div>



{/* Table */}

<div className="overflow-hidden rounded-xl bg-white shadow">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="px-6 py-4 text-left">
Name
</th>

<th className="px-6 py-4 text-left">
Description
</th>

<th className="px-6 py-4 text-center">
Actions
</th>

</tr>

</thead>



<tbody>


{
categories.map((category)=>(

<tr
key={category._id}
className="border-b hover:bg-slate-50"
>


<td className="px-6 py-4 font-semibold">
{category.name}
</td>


<td className="px-6 py-4">
{category.description}
</td>



<td className="px-6 py-4">

<div className="flex justify-center gap-3">


<button
className="rounded-lg bg-yellow-500 p-2 text-white"
>

<FaEdit/>

</button>



<button
onClick={()=>handleDelete(category._id)}
className="rounded-lg bg-red-600 p-2 text-white"
>

<FaTrash/>

</button>


</div>

</td>


</tr>

))
}



{
categories.length===0 &&

<tr>

<td
colSpan="3"
className="py-8 text-center text-gray-500"
>

No Categories Found

</td>

</tr>

}



</tbody>

</table>

</div>


</div>

);

}