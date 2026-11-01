
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import HotelResults from "./components/HotelResults";
import PlaceResult from "./components/PlaceResult";
import MonthDetails from "./components/MonthDetails";
import Favorites from "./components/Favorites";
import MyBookings from "./components/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/hotel-results" element={<HotelResults />} />

        <Route
          path="/month-details/:city/:month"
          element={<MonthDetails />}
        />

        <Route path="/place-result" element={<PlaceResult />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
