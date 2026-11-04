import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import HotelResults from "./components/HotelResults";
import HotelDetails from "./components/HotelDetails";
import CityDetails from "./components/CityDetails";
import Favorites from "./components/Favorites";
import RecentlyViewed from "./components/RecentlyViewed";
import MyBookings from "./components/MyBookings";

import ProtectRoute from "./routes/ProtectRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelResults />} />
        <Route path="/hoteliers" element={<HotelResults />} />
        <Route path="/hotel/:id"  element={<HotelDetails />}/>
        <Route path="/destination/:slug" element={<CityDetails />}/>
        <Route path="/recent-viewed" element={<RecentlyViewed />}/>
        
        <Route element={<ProtectRoute />}>
         <Route path="/my-bookings" element={<MyBookings />}/>
         <Route path="/favorites" element={<Favorites />}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />}/>

      </Routes>
    </BrowserRouter>
  );
}