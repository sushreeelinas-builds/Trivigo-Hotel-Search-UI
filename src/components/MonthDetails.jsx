
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import LanguageCurrencyModal from "./LanguageCurrencyModal";
import SignInModal from "./SignInModal";


import {
  Search,
  Heart,
  Share2,
  MapPin,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Info,
  Sparkles,
  Globe,
  UserCircle,
  Menu,
} from "lucide-react";

import HotelGalleryModal from "./HotelGalleryModal";
import PriceCalendarModal from "./PriceCalendarModal";
import MenuModal from "./MenuModal";

const hotelData = {
  Jaipur: [
    {
      name: "The LaLit Jaipur",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      rating: "8.4",
      ratingText: "Very good",
      reviews: "17,088 ratings",
      stars: 5,
      distance: "8.2 km to City centre",
      description: "Traditional Rajasthani Haveli Architecture, Authentic Indian Cuisine At Baluchi",
      price: "₹9,527",
      sites: 8,
    },
    {
      name: "Rambagh Palace",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900",
      rating: "9.6",
      ratingText: "Excellent",
      reviews: "17,361 ratings",
      stars: 5,
      distance: "2.6 km to City centre",
      description: "Holistic treatments at Jiva Spa, Central Jaipur palace grounds location",
      price: "₹52,720",
      sites: 5,
    },
    {
      name: "Umaid Bhawan - A Heritage Style Boutique",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900",
      rating: "8.8",
      ratingText: "Excellent",
      reviews: "11,818 ratings",
      stars: 4,
      distance: "1.9 km to City centre",
      description: "Authentic Rajasthani heritage architecture design, Rooftop restaurant with live entertainment",
      price: "₹5,790",
      sites: 9,
    },
    {
      name: "ibis Jaipur City Centre",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
      rating: "8.2",
      ratingText: "Very good",
      reviews: "8,520 ratings",
      stars: 4,
      distance: "3.5 km to City centre",
      description: "Modern accommodation, comfortable rooms and convenient city access",
      price: "₹4,250",
      sites: 9,
      popular: true,
    },
  ],

  Udaipur: [
    {
      name: "The Oberoi Udaivilas",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      rating: "9.6",
      ratingText: "Excellent",
      reviews: "12,450 ratings",
      stars: 5,
      distance: "3.2 km to City centre",
      description: "Luxury lakeside resort with beautiful gardens and traditional architecture",
      price: "₹28,500",
      sites: 8,
    },
    {
      name: "Taj Lake Palace",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      rating: "9.4",
      ratingText: "Excellent",
      reviews: "9,850 ratings",
      stars: 5,
      distance: "1.5 km to City centre",
      description: "Beautiful heritage hotel with lake views and luxury hospitality",
      price: "₹35,000",
      sites: 7,
    },
    {
      name: "Trident Udaipur",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      rating: "9.0",
      ratingText: "Excellent",
      reviews: "7,200 ratings",
      stars: 5,
      distance: "4.1 km to City centre",
      description: "Peaceful lakeside property with gardens and premium facilities",
      price: "₹8,500",
      sites: 9,
    },
  ],

  Mumbai: [
    {
      name: "The Taj Mahal Palace",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      rating: "9.4",
      ratingText: "Excellent",
      reviews: "18,500 ratings",
      stars: 5,
      distance: "2.1 km to City centre",
      description: "Iconic luxury hotel overlooking the Gateway of India",
      price: "₹18,500",
      sites: 8,
    },
    {
      name: "Trident Nariman Point",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      rating: "9.1",
      ratingText: "Excellent",
      reviews: "12,400 ratings",
      stars: 5,
      distance: "1.8 km to City centre",
      description: "Luxury accommodation with spectacular Arabian Sea views",
      price: "₹12,500",
      sites: 7,
    },
  ],

  Delhi: [
    {
      name: "The Leela Palace New Delhi",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      rating: "9.5",
      ratingText: "Excellent",
      reviews: "15,200 ratings",
      stars: 5,
      distance: "5.2 km to City centre",
      description: "Luxury hotel with elegant interiors and premium dining",
      price: "₹15,500",
      sites: 9,
    },
    {
      name: "Taj Palace New Delhi",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
      rating: "9.2",
      ratingText: "Excellent",
      reviews: "11,300 ratings",
      stars: 5,
      distance: "4.5 km to City centre",
      description: "Premium hotel offering comfortable rooms and excellent hospitality",
      price: "₹12,800",
      sites: 8,
    },
  ],

  Goa: [
    {
      name: "Taj Exotica Resort & Spa",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      rating: "9.4",
      ratingText: "Excellent",
      reviews: "8,500 ratings",
      stars: 5,
      distance: "1.2 km to Benaulim Beach",
      description: "Luxury beach resort with tropical gardens and beautiful sea views",
      price: "₹18,500",
      sites: 8,
    },
    {
      name: "Grand Hyatt Goa",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      rating: "9.1",
      ratingText: "Excellent",
      reviews: "6,300 ratings",
      stars: 5,
      distance: "5 km to City centre",
      description: "Premium waterfront accommodation with restaurants and spa",
      price: "₹14,500",
      sites: 7,
    },
  ],
};

const defaultHotels = [
  {
    name: "Premium City Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
    rating: "8.8",
    ratingText: "Excellent",
    reviews: "4,520 ratings",
    stars: 4,
    distance: "2.5 km to City centre",
    description: "Comfortable accommodation with modern facilities and convenient location",
    price: "₹3,500",
    sites: 7,
  },
  {
    name: "Grand Heritage Resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
    rating: "9.2",
    ratingText: "Excellent",
    reviews: "6,200 ratings",
    stars: 5,
    distance: "3.8 km to City centre",
    description: "Beautiful property with premium rooms, restaurant and relaxing atmosphere",
    price: "₹6,500",
    sites: 8,
  },
  {
    name: "Comfort Inn & Suites",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
    rating: "8.5",
    ratingText: "Very good",
    reviews: "3,850 ratings",
    stars: 4,
    distance: "1.9 km to City centre",
    description: "Modern rooms, convenient amenities and excellent city connectivity",
    price: "₹2,800",
    sites: 6,
  },
];

const filters = [
  "Hotels",
  "Rating: 8.0+",
  "Near city centre",
  "Breakfast included",
  "Resort",
  "Pool",
  "Serviced apartment",
  "Air conditioning",
];

const formatDate = (date) => {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const getMonthDates = (monthName) => {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const now = new Date();
  const monthIndex = months.indexOf(monthName);
  let year = now.getFullYear();

  if (monthIndex < now.getMonth()) year++;

  let start = new Date(year, monthIndex, 1);

  if (year === now.getFullYear() && monthIndex === now.getMonth()) {
    start = new Date(now);
  }

  const end = new Date(start);
  end.setDate(start.getDate() + 3);

  return {
    checkIn: [
      start.getFullYear(),
      String(start.getMonth() + 1).padStart(2, "0"),
      String(start.getDate()).padStart(2, "0"),
    ].join("-"),
    checkOut: [
      end.getFullYear(),
      String(end.getMonth() + 1).padStart(2, "0"),
      String(end.getDate()).padStart(2, "0"),
    ].join("-"),
  };
};

export default function MonthDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { city, month } = useParams();

  const details = location.state || {};

  const destination =
    details.destination || decodeURIComponent(city || "Jaipur");

  const selectedMonth =
    details.month ||
    (month ? month.charAt(0).toUpperCase() + month.slice(1) : "November");

  const monthDates = getMonthDates(selectedMonth);

  const [destinationInput, setDestinationInput] = useState(destination);
  const [checkIn, setCheckIn] = useState(monthDates.checkIn);
  const [checkOut, setCheckOut] = useState(monthDates.checkOut);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const [sortBy, setSortBy] = useState("Recommended");
  const [activeFilters, setActiveFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [galleryHotel, setGalleryHotel] = useState(null);
  const [priceHotel, setPriceHotel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const hotels = hotelData[destination] || defaultHotels;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("trivagoFavorites") || "[]");
    setFavorites(saved);
  }, []);

  const makeHotelObject = (hotel) => {
    const id = `${destination}-${hotel.name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    return {
      ...hotel,
      id,
      hotelName: hotel.name,
      location: `${destination}, India`,
      score: hotel.rating,
      image: hotel.image,
      price: hotel.price,
    };
  };

  const toggleFavorite = (hotel) => {
    const item = makeHotelObject(hotel);

    setFavorites((prev) => {
      const exists = prev.some((saved) => saved.id === item.id);

      const updated = exists
        ? prev.filter((saved) => saved.id !== item.id)
        : [...prev, item];

      localStorage.setItem("trivagoFavorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (hotel) => {
    const id = makeHotelObject(hotel).id;
    return favorites.some((item) => item.id === id);
  };

  const handleSearch = () => {
    if (!destinationInput.trim()) {
      alert("Please enter a destination");
      return;
    }

    const params = new URLSearchParams({
      destination: destinationInput,
      checkIn,
      checkOut,
      guests: String(guests),
      rooms: String(rooms),
    });

    navigate(`/place-result?${params.toString()}`);
  };

  const applyPriceSearch = (values) => {
    setCheckIn(values.checkIn);
    setCheckOut(values.checkOut);
    setGuests(values.guests);
    setRooms(values.rooms);

    const params = new URLSearchParams({
      destination,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guests: String(values.guests),
      rooms: String(values.rooms),
      hotel: priceHotel.name,
    });

    setPriceHotel(null);
    navigate(`/place-result?${params.toString()}`);
  };

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === "Price: low to high") {
      return Number(a.price.replace(/[₹,]/g, "")) -
        Number(b.price.replace(/[₹,]/g, ""));
    }

    if (sortBy === "Rating") {
      return Number(b.rating) - Number(a.rating);
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-white text-[#191919]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="flex min-h-[85px] flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-6">

          <button
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold text-sky-600"
          >
            <span className="text-pink-600">tri</span>vago
          </button>

          <div className="flex min-w-[280px] flex-1 items-center rounded-2xl border shadow-sm lg:mx-8 lg:max-w-[850px]">

            <div className="min-w-0 flex-1 px-3 py-2">
              <label className="block text-xs text-gray-500">Destination</label>
              <input
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="w-full bg-transparent text-sm font-bold outline-none"
              />
            </div>

            <div className="h-14 w-px bg-gray-200" />

            <button
              onClick={() => setPriceHotel(hotels[0])}
              className="hidden min-w-[180px] px-3 py-2 text-left sm:block"
            >
              <span className="block text-xs text-gray-500">Check-in/out</span>
              <span className="text-sm font-bold">
                {formatDate(checkIn)} - {formatDate(checkOut)}
              </span>
            </button>

            <div className="hidden h-14 w-px bg-gray-200 sm:block" />

            <button
              onClick={() => setPriceHotel(hotels[0])}
              className="hidden min-w-[160px] px-3 py-2 text-left md:block"
            >
              <span className="block text-xs text-gray-500">Guests and rooms</span>
              <span className="text-sm font-bold">
                {guests} Guests, {rooms} Room
              </span>
            </button>

            <button
              onClick={handleSearch}
              className="m-2 flex h-10 w-14 items-center justify-center rounded-xl bg-[#007fc5] text-white hover:bg-[#006da9]"
            >
              <Search size={23} />
            </button>
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageCurrencyModal />
                      <SignInModal />

            <MenuModal />
          </div>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="sticky top-[85px] z-40 border-b bg-white">
        <div className="flex items-center gap-2 overflow-x-auto px-3 py-4">

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 font-bold"
          >
            <SlidersHorizontal size={17} /> Filters
          </button>

          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-full border py-2.5 pl-4 pr-9 font-bold"
            >
              <option>Recommended</option>
              <option>Price: low to high</option>
              <option>Rating</option>
            </select>
            <ChevronDown size={17} className="pointer-events-none absolute right-3 top-3" />
          </div>

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold ${
                activeFilters.includes(filter)
                  ? "border-sky-500 bg-sky-50 text-sky-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="border-t bg-gray-50 px-5 py-4">
            <p className="mb-3 font-bold">Choose your filters</p>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <label key={filter} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={activeFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                  />
                  {filter}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* HOTEL RESULTS */}
      <main className="mx-auto max-w-[1120px] px-4 py-7 sm:px-6">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Hotels in {destination}
              <span className="text-gray-600"> ({destination}, India)</span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Travel month: {selectedMonth} · {formatDate(checkIn)} - {formatDate(checkOut)}
              {" "}· {guests} Guests · {rooms} Room
            </p>
          </div>

          <button className="flex items-center gap-1 text-xs text-gray-500">
            How payments to us affect ranking <Info size={15} />
          </button>
        </div>

        <div className="space-y-3">
          {sortedHotels.map((hotel) => (
            <article
              key={hotel.name}
              className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.13)] transition hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)] md:grid-cols-[248px_minmax(0,1fr)_350px]"
            >

              {/* CLICK IMAGE TO OPEN GALLERY */}
              <div className="group relative h-[190px] overflow-hidden rounded-xl md:h-[168px]">
                <button
                  onClick={() => setGalleryHotel(hotel)}
                  className="h-full w-full"
                  title={`View photos of ${hotel.name}`}
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </button>

                {hotel.popular && (
                  <span className="pointer-events-none absolute left-0 top-0 rounded-br-lg bg-[#007fc5] px-2 py-1 text-xs font-bold text-white">
                    Popular choice
                  </span>
                )}

                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 p-1.5 text-white">
                  <button
                    title="Share"
                    onClick={async () => {
                      const item = makeHotelObject(hotel);
                      if (navigator.share) {
                        await navigator.share({
                          title: item.name,
                          text: `Check out ${item.name} in ${destination}`,
                        });
                      } else {
                        await navigator.clipboard.writeText(item.name);
                        alert("Hotel name copied!");
                      }
                    }}
                    className="rounded-full p-1 hover:bg-white/20"
                  >
                    <Share2 size={17} />
                  </button>

                  <button
                    title="Add to favorites"
                    onClick={() => toggleFavorite(hotel)}
                    className="rounded-full p-1 hover:bg-white/20"
                  >
                    <Heart
                      size={20}
                      fill={isFavorite(hotel) ? "#ec2451" : "none"}
                      color={isFavorite(hotel) ? "#ec2451" : "white"}
                    />
                  </button>
                </div>
              </div>

              {/* HOTEL INFORMATION */}
              <div className="flex min-w-0 flex-col justify-between py-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-xl font-bold">
                      {hotel.name}
                    </h2>
                    <span className="whitespace-nowrap text-orange-500">
                      {"★".repeat(hotel.stars)}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">
                    <span className="rounded-lg bg-green-700 px-2 py-0.5 font-bold text-white">
                      {hotel.rating}
                    </span>
                    <strong>{hotel.ratingText}</strong>
                    <span className="text-gray-600">({hotel.reviews})</span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm">
                    <MapPin size={17} className="shrink-0 text-gray-500" />
                    {hotel.distance}
                  </div>

                  <div className="mt-5 flex items-start gap-2 text-sm leading-5">
                    <Sparkles size={16} className="mt-0.5 shrink-0 text-gray-500" />
                    <p>{hotel.description}</p>
                  </div>
                </div>
              </div>

              {/* PRICE PANEL */}
              <div className="flex min-h-[168px] flex-col justify-between rounded-xl bg-[#e4f4ff] p-3">
                <p className="text-sm">
                  See prices from <strong>{hotel.sites} sites</strong>
                </p>

                <div className="flex items-end justify-between gap-2">
                  <div>
                    <span className="text-sm">From </span>
                    <span className="text-xl font-extrabold">{hotel.price}</span>
                  </div>

                  {/* CLICK TO OPEN CALENDAR */}
                  <button
                    onClick={() => setPriceHotel(hotel)}
                    className="flex shrink-0 items-center gap-1 rounded-xl bg-[#007fc5] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#006ba8]"
                  >
                    See prices <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
          Hotel prices displayed are sample project data for demonstration.
          Actual availability and prices may vary depending on selected dates.
        </div>
      </main>

      {/* PHOTO GALLERY MODAL */}
      {galleryHotel && (
        <HotelGalleryModal
          hotel={galleryHotel}
          onClose={() => setGalleryHotel(null)}
          isFavorite={isFavorite(galleryHotel)}
          onFavorite={() => toggleFavorite(galleryHotel)}
        />
      )}

      {/* PRICE AND CALENDAR MODAL */}
      {priceHotel && (
        <PriceCalendarModal
          hotel={priceHotel}
          destination={destination}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialGuests={guests}
          initialRooms={rooms}
          onClose={() => setPriceHotel(null)}
          onApply={applyPriceSearch}
        />
      )}
    </div>
  );
}
