import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Attractions from "./pages/Attractions"
import Hotels from "./pages/Hotels";
import Feed from "./pages/Feed";
import UserProfile from "./pages/UserProfile";
import Restaurants from "./pages/Restaurants";
export default function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/hotels" element={<Hotels />}></Route>
        <Route path="/places/:place" element={<Feed />}></Route>
        <Route path="/restaurents" element={<Restaurants />} ></Route>
        <Route path="userProfile" element={<UserProfile />} ></Route>
      </Routes>
    </div>
  )
}