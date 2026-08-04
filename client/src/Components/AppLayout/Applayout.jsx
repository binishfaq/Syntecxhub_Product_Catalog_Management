import Navbar from "../UI/Navbar"
import Footer from "../UI/Footer"
import {Outlet} from "react-router-dom"
const Applayout = () => {
  return (
    <div>
    
        <Navbar/>
        <main className='min-h-screen'>
                 <Outlet />
        </main>
   
        <Footer />
      
    </div>
  )
}

export default Applayout
