import Hero from "../Components/Dashboard/Hero";
import Sidebar from "../Components/UI/Sidebar";
import StateCard from "../Components/Dashboard/StateCards"
import Products from "../Components/Dashboard/Products"

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Hero />
        <StateCard />
        <Products />
      </div>
    </div>
  );
}