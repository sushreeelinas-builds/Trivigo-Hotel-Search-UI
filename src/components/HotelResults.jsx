
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import LanguageCurrencyModal from "./LanguageCurrencyModal";
import SignInModal from "./SignInModal";
import MenuModal from "./MenuModal";

// ----------------------------------
// HOTEL DATA
// ----------------------------------

const locationHotels = {
  Panaji: [
    {
      id: 101,
      name: "Goa Marriott Resort",
      location: "Panaji, India",
      score: 9.0,
      reviews: "6.2k",
      price: "₹12,500",
      provider: "Booking.com",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description:
        "Luxury hotel with beautiful views and premium facilities.",
      type: "Hotel",
      distance: "2.5 km",
      hotDeal: true,
      breakfast: true,
      pool: true,
      facilities: [
        "Free Wi-Fi",
        "Swimming Pool",
        "Restaurant",
        "Air conditioning",
      ],
    },
    {
      id: 102,
      name: "Hotel Palacio de Goa",
      location: "Panaji, India",
      score: 8.3,
      reviews: "2.1k",
      price: "₹5,200",
      provider: "Agoda",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Comfortable hotel with convenient city access.",
      type: "Hotel",
      distance: "2 km",
      hotDeal: true,
      breakfast: true,
      pool: false,
      facilities: ["Free Wi-Fi", "Restaurant", "Air conditioning"],
    },
    {
      id: 103,
      name: "Vivanta Goa",
      location: "Panaji, India",
      score: 9.1,
      reviews: "11k",
      price: "₹14,844",
      provider: "ZenHotels.com",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      description: "Premium resort with modern rooms and a swimming pool.",
      type: "Resort",
      distance: "3 km",
      hotDeal: true,
      breakfast: true,
      pool: true,
      facilities: [
        "Free Wi-Fi",
        "Swimming Pool",
        "Restaurant",
        "Air conditioning",
      ],
    },
    {
      id: 104,
      name: "Bambolim Beach Resort",
      location: "Panaji, India",
      score: 7.7,
      reviews: "5.4k",
      price: "₹4,647",
      provider: "Agoda",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description: "Relaxing beach resort with outdoor facilities.",
      type: "Resort",
      distance: "2.8 km",
      hotDeal: true,
      breakfast: false,
      pool: true,
      facilities: ["Free Wi-Fi", "Swimming Pool", "Restaurant"],
    },
    {
      id: 105,
      name: "Goa Heritage Hotel",
      location: "Panaji, India",
      score: 8.5,
      reviews: "1.8k",
      price: "₹6,800",
      provider: "MakeMyTrip",
      image:
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
      description: "A comfortable hotel with a welcoming atmosphere.",
      type: "Hotel",
      distance: "1.5 km",
      hotDeal: true,
      breakfast: true,
      pool: false,
      facilities: ["Free Wi-Fi", "Restaurant", "Air conditioning"],
    },
  ],

  Rome: [
    {
      id: 201,
      name: "Hotel Roma Central",
      location: "Rome, Italy",
      score: 9.0,
      reviews: "4.5k",
      price: "₹9,500",
      provider: "Booking.com",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Modern hotel near popular attractions.",
      type: "Hotel",
      distance: "2 km",
      hotDeal: true,
      breakfast: true,
      pool: false,
      facilities: ["Free Wi-Fi", "Restaurant", "Air conditioning"],
    },
    {
      id: 202,
      name: "Grand Palace Rome",
      location: "Rome, Italy",
      score: 8.7,
      reviews: "3.2k",
      price: "₹11,200",
      provider: "Agoda",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      description: "Elegant accommodation with premium amenities.",
      type: "Hotel",
      distance: "4 km",
      hotDeal: true,
      breakfast: true,
      pool: true,
      facilities: ["Free Wi-Fi", "Swimming Pool", "Restaurant"],
    },
    {
      id: 203,
      name: "Roma Garden Resort",
      location: "Rome, Italy",
      score: 8.2,
      reviews: "2.8k",
      price: "₹7,800",
      provider: "Trip.com",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description: "Peaceful resort with beautiful surroundings.",
      type: "Resort",
      distance: "2.5 km",
      hotDeal: false,
      breakfast: false,
      pool: true,
      facilities: ["Free Wi-Fi", "Swimming Pool"],
    },
  ],

  Mysore: [
    {
      id: 301,
      name: "Royal Orchid Metropole",
      location: "Mysore, India",
      score: 9.0,
      reviews: "3.5k",
      price: "₹7,500",
      provider: "Booking.com",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      description: "Heritage hotel with elegant rooms and facilities.",
      type: "Hotel",
      distance: "2 km",
      hotDeal: true,
      breakfast: true,
      pool: true,
      facilities: ["Free Wi-Fi", "Swimming Pool", "Restaurant"],
    },
    {
      id: 302,
      name: "Mysore Palace View Hotel",
      location: "Mysore, India",
      score: 8.5,
      reviews: "2.2k",
      price: "₹4,800",
      provider: "Agoda",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Comfortable stay close to the city attractions.",
      type: "Hotel",
      distance: "1.5 km",
      hotDeal: true,
      breakfast: true,
      pool: false,
      facilities: ["Free Wi-Fi", "Restaurant", "Air conditioning"],
    },
    {
      id: 303,
      name: "Green Valley Resort",
      location: "Mysore, India",
      score: 8.1,
      reviews: "1.9k",
      price: "₹6,200",
      provider: "Trip.com",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description: "Relaxing resort with greenery and outdoor spaces.",
      type: "Resort",
      distance: "5 km",
      hotDeal: false,
      breakfast: false,
      pool: true,
      facilities: ["Free Wi-Fi", "Swimming Pool"],
    },
  ],

  Goa: [
    {
      id: 401,
      name: "Taj Resort Goa",
      location: "Goa, India",
      score: 9.2,
      reviews: "8.4k",
      price: "₹15,000",
      provider: "Booking.com",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      description: "Luxury resort with premium hospitality.",
      type: "Resort",
      distance: "3 km",
      hotDeal: true,
      breakfast: true,
      pool: true,
      facilities: [
        "Free Wi-Fi",
        "Swimming Pool",
        "Restaurant",
        "Air conditioning",
      ],
    },
    {
      id: 402,
      name: "Sea View Hotel Goa",
      location: "Goa, India",
      score: 8.4,
      reviews: "3.1k",
      price: "₹6,500",
      provider: "Agoda",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Comfortable hotel with beautiful sea views.",
      type: "Hotel",
      distance: "2 km",
      hotDeal: true,
      breakfast: true,
      pool: false,
      facilities: ["Free Wi-Fi", "Restaurant", "Air conditioning"],
    },
    {
      id: 403,
      name: "Palm Beach Resort",
      location: "Goa, India",
      score: 8.8,
      reviews: "4.6k",
      price: "₹9,200",
      provider: "Trip.com",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description: "Beach resort with swimming pool and modern facilities.",
      type: "Resort",
      distance: "4 km",
      hotDeal: false,
      breakfast: true,
      pool: true,
      facilities: ["Free Wi-Fi", "Swimming Pool", "Restaurant"],
    },
  ],
};

// ----------------------------------
// HELPER FUNCTIONS
// ----------------------------------

const formatPrice = (price) => {
  return Number(String(price || "0").replace(/[₹,\s]/g, "")) || 0;
};

const parseDistance = (distance) => {
  return Number.parseFloat(String(distance || "0")) || 0;
};

const getLabel = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very good";
  if (score >= 7) return "Good";
  return "Fair";
};

// This function was missing in your code.
const getCityHotels = (city) => {
  const matchedCity = Object.keys(locationHotels).find(
    (item) => item.toLowerCase() === String(city || "").trim().toLowerCase()
  );

  return matchedCity ? locationHotels[matchedCity] : [];
};

// ----------------------------------
// FILTER SETTINGS
// ----------------------------------

const MAX_PRICE = 100000;

const PANEL_FILTERS = ["Sort by", "Price", "Location"];

const TOGGLE_FILTERS = [
  "Hot deals",
  "Hotels",
  "Rating: 8.0+",
  "Near city centre",
  "Breakfast included",
  "Pool",
  "Resort",
  "Serviced apartment",
  "Air conditioning",
];

const TYPE_FILTERS = {
  Hotels: "Hotel",
  Resort: "Resort",
  "Serviced apartment": "Serviced apartment",
};

// ----------------------------------
// HOTEL RESULTS COMPONENT
// ----------------------------------

export default function HotelResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const selected = state?.hotel;

  const startCity =
    selected?.location?.split(",")[0]?.trim() || "Panaji";

  const [destination, setDestination] = useState(startCity);
  const [searchedCity, setSearchedCity] = useState(startCity);

  const [checkIn] = useState(state?.checkIn || "2026-11-22");
  const [checkOut] = useState(state?.checkOut || "2026-11-26");
  const [guests] = useState(state?.guests || 2);
  const [rooms] = useState(state?.rooms || 1);

  const [openPanel, setOpenPanel] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [expandedOffers, setExpandedOffers] = useState(null);

  const [sortBy, setSortBy] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("trivagoFavorites") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "trivagoFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // ----------------------------------
  // FILTER, SEARCH AND SORT HOTELS
  // ----------------------------------

  const hotels = useMemo(() => {
    const cityHotels = getCityHotels(searchedCity);

    const selectedCity =
      selected?.location?.split(",")[0]?.trim().toLowerCase();

    const base =
      selected &&
      selectedCity === searchedCity.trim().toLowerCase()
        ? [
            selected,
            ...cityHotels.filter(
              (hotel) => hotel.name !== selected.name
            ),
          ]
        : cityHotels;

    let result = base.filter(
      (hotel) => formatPrice(hotel.price) <= maxPrice
    );

    const types = activeFilters
      .filter((filter) => TYPE_FILTERS[filter])
      .map((filter) => TYPE_FILTERS[filter]);

    if (types.length) {
      result = result.filter((hotel) =>
        types.includes(hotel.type)
      );
    }

    if (activeFilters.includes("Rating: 8.0+")) {
      result = result.filter((hotel) => hotel.score >= 8);
    }

    if (activeFilters.includes("Hot deals")) {
      result = result.filter((hotel) => hotel.hotDeal);
    }

    if (activeFilters.includes("Breakfast included")) {
      result = result.filter((hotel) => hotel.breakfast);
    }

    if (activeFilters.includes("Pool")) {
      result = result.filter((hotel) => hotel.pool);
    }

    if (activeFilters.includes("Air conditioning")) {
      result = result.filter((hotel) =>
        hotel.facilities?.includes("Air conditioning")
      );
    }

    if (activeFilters.includes("Near city centre")) {
      result = result.filter(
        (hotel) => parseDistance(hotel.distance) <= 3
      );
    }

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) => formatPrice(a.price) - formatPrice(b.price)
      );
    }

    if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) => formatPrice(b.price) - formatPrice(a.price)
      );
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => (b.score || 0) - (a.score || 0)
      );
    }

    return result;
  }, [selected, searchedCity, maxPrice, activeFilters, sortBy]);

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
    )
  );

  const activeCount =
    activeFilters.length +
    (sortBy !== "recommended" ? 1 : 0) +
    (maxPrice < MAX_PRICE ? 1 : 0);

  const isActive = (filter) => {
    if (filter === "Sort by") {
      return sortBy !== "recommended" || openPanel === filter;
    }

    if (filter === "Price") {
      return maxPrice < MAX_PRICE || openPanel === filter;
    }

    if (filter === "Location") {
      return openPanel === filter;
    }

    return activeFilters.includes(filter);
  };

  const handleFilter = (filter) => {
    if (PANEL_FILTERS.includes(filter)) {
      setOpenPanel(openPanel === filter ? "" : filter);
      return;
    }

    setOpenPanel("");

    setActiveFilters((previous) =>
      previous.includes(filter)
        ? previous.filter((item) => item !== filter)
        : [...previous, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSortBy("recommended");
    setMaxPrice(MAX_PRICE);
    setOpenPanel("");
  };

  // ----------------------------------
  // FAVORITES
  // ----------------------------------

  const toggleFavorite = (hotel) => {
    setFavorites((previous) =>
      previous.some((item) => item.id === hotel.id)
        ? previous.filter((item) => item.id !== hotel.id)
        : [...previous, hotel]
    );
  };

  // ----------------------------------
  // SEARCH HOTELS
  // ----------------------------------

  const searchHotels = () => {
    if (!destination.trim()) {
      alert("Please enter a destination.");
      return;
    }

    const match = Object.keys(locationHotels).find(
      (city) =>
        city.toLowerCase() === destination.trim().toLowerCase()
    );

    setOpenPanel("");

    if (match) {
      setDestination(match);
      setSearchedCity(match);
    } else {
      setSearchedCity(destination.trim());
    }
  };

  // ----------------------------------
  // NAVIGATE TO HOTEL DETAILS
  // ----------------------------------

  const goToDetails = (hotel) => {
    localStorage.setItem(
      "selectedHotel",
      JSON.stringify(hotel)
    );

    localStorage.setItem(
      "hotelSearchDetails",
      JSON.stringify({
        checkIn,
        checkOut,
        guests,
        rooms,
      })
    );

    navigate(`/hotel/${hotel.id}`, {
      state: {
        hotel,
        checkIn,
        checkOut,
        guests,
        rooms,
      },
    });
  };

  // ----------------------------------
  // UI
  // ----------------------------------

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">

          <button
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold tracking-tight"
          >
            <span className="text-pink-600">tri</span>
            <span className="text-blue-600">vago</span>
          </button>

          {/* SEARCH BAR */}
          <div className="flex min-w-[300px] flex-1 flex-wrap items-center rounded-2xl border border-gray-300 bg-white shadow-sm lg:mx-10 lg:max-w-4xl">

            <div className="min-w-[140px] flex-1 px-4 py-2">
              <p className="text-xs text-gray-500">Destination</p>

              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && searchHotels()
                }
                placeholder="Enter city"
                className="w-full bg-transparent font-bold outline-none"
              />
            </div>

            <div className="hidden min-w-[170px] border-l border-gray-300 px-4 py-2 sm:block">
              <p className="text-xs text-gray-500">
                Check-in / Check-out
              </p>

              <p className="text-sm font-bold">
                {new Date(checkIn).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}{" "}
                -{" "}
                {new Date(checkOut).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
            </div>

            <div className="hidden border-l border-gray-300 px-4 py-2 sm:block">
              <p className="text-xs text-gray-500">
                Guests and rooms
              </p>

              <p className="text-sm font-bold">
                {guests} Guests, {rooms} Room
                {rooms > 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={searchHotels}
              className="m-2 rounded-xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
              aria-label="Search"
            >
              <span className="text-xl">⌕</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <LanguageCurrencyModal />
            <SignInModal />
            <MenuModal />
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-gray-100 px-4 py-3 lg:px-8">

          <button
            onClick={clearFilters}
            disabled={activeCount === 0}
            className="shrink-0 rounded-xl border border-gray-800 px-4 py-2 text-sm font-semibold disabled:cursor-default disabled:opacity-60"
          >
            ☷{" "}
            {activeCount > 0
              ? `Clear filters (${activeCount})`
              : "Filters"}
          </button>

          {[...PANEL_FILTERS, ...TOGGLE_FILTERS].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                aria-pressed={isActive(filter)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive(filter)
                    ? "border-blue-700 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white hover:border-gray-600"
                }`}
              >
                {filter}
                {PANEL_FILTERS.includes(filter) && " ﹀"}
              </button>
            )
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-3 py-5 lg:px-5">

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-gray-700">
            We found <strong>{hotels.length}</strong> hotels in{" "}
            <strong>{searchedCity}</strong>
          </p>

          <p className="text-xs text-gray-500">
            Compare prices from different booking providers
          </p>
        </div>

        {/* PRICE PANEL */}
        {openPanel === "Price" && (
          <div className="mb-4 max-w-sm rounded-xl border bg-white p-4 shadow-sm">
            <label className="font-semibold">
              Maximum price: ₹
              {maxPrice.toLocaleString("en-IN")}
            </label>

            <input
              type="range"
              min="1000"
              max={MAX_PRICE}
              step="1000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="mt-3 w-full accent-blue-700"
            />
          </div>
        )}

        {/* SORT PANEL */}
        {openPanel === "Sort by" && (
          <div className="mb-4 max-w-sm rounded-xl border bg-white p-4 shadow-sm">
            <label className="mb-2 block text-sm font-semibold">
              Sort hotels
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Guest rating</option>
            </select>
          </div>
        )}

        {/* LOCATION PANEL */}
        {openPanel === "Location" && (
          <div className="mb-4 max-w-sm rounded-xl border bg-white p-4 shadow-sm">
            <p className="mb-3 font-semibold">
              Choose destination
            </p>

            <select
              value={
                Object.keys(locationHotels).includes(searchedCity)
                  ? searchedCity
                  : ""
              }
              onChange={(e) => {
                setDestination(e.target.value);
                setSearchedCity(e.target.value);
                setOpenPanel("");
              }}
              className="w-full rounded-lg border p-3"
            >
              <option value="" disabled>
                Select a city
              </option>

              {Object.keys(locationHotels).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* HOTEL LIST */}
        <div className="space-y-3">
          {hotels.map((hotel, index) => {
            const isFavorite = favorites.some(
              (item) => item.id === hotel.id
            );

            const basePrice = formatPrice(hotel.price);

            const offerPrices = [
              {
                name: hotel.provider || "Hotel Site",
                price: basePrice,
              },
              {
                name: "ZenHotels.com",
                price: Math.round(basePrice * 1.12),
              },
              {
                name: "Trip.com",
                price: Math.round(basePrice * 1.08),
              },
              {
                name: "Agoda",
                price: Math.round(basePrice * 1.15),
              },
            ];

            return (
              <article
                key={hotel.id || index}
                className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition hover:shadow-md md:grid-cols-[255px_minmax(180px,1fr)_350px]"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={
                      hotel.image ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900"
                    }
                    alt={hotel.name || "Hotel"}
                    onClick={() => goToDetails(hotel)}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900";
                    }}
                    className="h-56 w-full cursor-pointer rounded-xl object-cover md:h-full md:min-h-[200px]"
                  />

                  <button
                    onClick={() => toggleFavorite(hotel)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/80 text-xl text-white shadow"
                    aria-label="Toggle favorite"
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>

                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {index + 1} / {hotels.length}
                  </span>
                </div>

                {/* HOTEL INFORMATION */}
                <div className="flex flex-col justify-center px-3 py-4 md:px-4">

                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      onClick={() => goToDetails(hotel)}
                      className="cursor-pointer text-xl font-bold text-gray-900 hover:text-blue-700 hover:underline"
                    >
                      {hotel.name}
                    </h2>

                    <span className="text-orange-500">
                      ★★★★★
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    {hotel.location}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-md bg-green-700 px-2.5 py-1 text-sm font-bold text-white">
                      {hotel.score ?? "N/A"}
                    </span>

                    <span className="text-sm font-semibold">
                      {getLabel(hotel.score || 0)}
                    </span>

                    <span className="text-sm text-gray-500">
                      ({hotel.reviews || "1.2k"} ratings)
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">
                    ♧ &nbsp;{hotel.distance || "5.8 km"} to City centre
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    ✧ &nbsp;
                    {hotel.description ||
                      "Comfortable rooms, excellent service and convenient location for guests."}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(hotel.facilities || [
                      "Free Wi-Fi",
                      "Restaurant",
                    ])
                      .slice(0, 3)
                      .map((facility) => (
                        <span
                          key={facility}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                        >
                          {facility}
                        </span>
                      ))}
                  </div>

                  <button
                    onClick={() => goToDetails(hotel)}
                    className="mt-4 w-fit text-sm font-bold text-blue-700 hover:underline"
                  >
                    View hotel details →
                  </button>
                </div>

                {/* PRICE PROVIDERS */}
                <div className="flex flex-col justify-center gap-2 px-1 py-3 md:px-0">

                  <div className="rounded-xl border border-green-300 bg-green-50 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-gray-900">
                        {offerPrices[0].name}
                      </p>

                      <span className="rounded bg-green-200 px-2 py-1 text-xs font-bold text-green-900">
                        Lowest price
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-2xl font-extrabold text-gray-900">
                          ₹
                          {offerPrices[0].price.toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-gray-600">
                          ₹
                          {(
                            offerPrices[0].price * nights
                          ).toLocaleString("en-IN")}{" "}
                          total
                        </p>
                      </div>

                      <button
                        onClick={() => goToDetails(hotel)}
                        className="rounded-lg bg-green-700 px-5 py-2.5 font-bold text-white transition hover:bg-green-800"
                      >
                        View Deal ›
                      </button>
                    </div>
                  </div>

                  {/* OTHER OFFERS */}
                  <div className="rounded-xl border border-gray-200 bg-white">
                    <button
                      onClick={() =>
                        setExpandedOffers(
                          expandedOffers === hotel.id
                            ? null
                            : hotel.id
                        )
                      }
                      className="flex w-full items-center justify-between p-3 text-left"
                    >
                      <div>
                        <p className="text-sm font-bold">
                          ₹
                          {offerPrices[1].price.toLocaleString("en-IN")}{" "}
                          <span className="font-normal text-gray-600">
                            {offerPrices[1].name}
                          </span>
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          ₹
                          {offerPrices[2].price.toLocaleString("en-IN")}{" "}
                          <span className="font-normal text-gray-600">
                            {offerPrices[2].name}
                          </span>
                        </p>
                      </div>

                      <span className="text-xl">
                        {expandedOffers === hotel.id ? "⌃" : "⌄"}
                      </span>
                    </button>

                    {expandedOffers === hotel.id && (
                      <div className="space-y-3 border-t px-3 py-3">
                        {offerPrices.slice(1).map((offer) => (
                          <div
                            key={offer.name}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="font-medium text-gray-700">
                              {offer.name}
                            </span>

                            <span className="font-bold">
                              ₹
                              {offer.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {hotels.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center">
            <h2 className="text-xl font-bold">
              No hotels found
            </h2>

            <p className="mt-2 text-gray-500">
              No hotels match your search in {searchedCity}.
              Clear your filters or try another destination.
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={clearFilters}
                className="rounded-lg border border-blue-700 px-5 py-2 font-semibold text-blue-700"
              >
                Clear filters
              </button>

              <button
                onClick={() => {
                  clearFilters();
                  setDestination("Panaji");
                  setSearchedCity("Panaji");
                }}
                className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white"
              >
                Search Panaji
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
