
import { useState } from "react";

import Hero from "../Components/Dashboard/Hero";
import Sidebar from "../Components/UI/Sidebar";
import StateCard from "../Components/Dashboard/StateCards";
import Products from "../Components/Dashboard/Products";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Dashboard Hero + Search */}
        <Hero
          search={search}
          setSearch={setSearch}
        />

        {/* Statistics */}
        <StateCard />

        {/* Products */}
        <Products search={search} />

      </div>
    </div>
  );
}

