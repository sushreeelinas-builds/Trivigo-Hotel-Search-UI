
import { useEffect, useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import LanguageCurrencyModal from "./LanguageCurrencyModal";
import SignInModal from "./SignInModal";
import MenuModal from "./MenuModal";

const galleryImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
];

const breakfastOptions = [
  "Breakfast included",
  "Room only",
];

const highlights = [
  "Excellent location",
  "Comfortable rooms",
  "Swimming pool",
  "Free Wi-Fi",
];

const defaultFacilities = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Restaurant",
  "Air Conditioning",
  "Room Service",
  "Free Parking",
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900";

const todayISO = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatPrice = (price) => {
  return (
    Number(String(price || "0").replace(/[₹,\s]/g, "")) || 0
  );
};

const getLabel = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very good";
  if (score >= 7) return "Good";
  return "Fair";
};

const getStoredHotel = () => {
  try {
    return JSON.parse(
      localStorage.getItem("selectedHotel") || "null"
    );
  } catch {
    return null;
  }
};

const getStoredSearchDetails = () => {
  try {
    return JSON.parse(
      localStorage.getItem("hotelSearchDetails") || "{}"
    );
  } catch {
    return {};
  }
};

export default function HotelDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const hotel = useMemo(() => {
    const storedHotel = getStoredHotel();

    if (
      state?.hotel &&
      String(state.hotel.id) === String(id)
    ) {
      return state.hotel;
    }

    if (
      storedHotel &&
      String(storedHotel.id) === String(id)
    ) {
      return storedHotel;
    }

    return null;
  }, [state, id]);

  const savedSearch = useMemo(
    () => getStoredSearchDetails(),
    []
  );

  const [showBooking, setShowBooking] = useState(false);

  const [checkIn, setCheckIn] = useState(
    state?.checkIn ||
      savedSearch.checkIn ||
      todayISO()
  );

  const [checkOut, setCheckOut] = useState(
    state?.checkOut ||
      savedSearch.checkOut ||
      ""
  );

  const [guests, setGuests] = useState(
    state?.guests || savedSearch.guests || 2
  );

  const [rooms, setRooms] = useState(
    state?.rooms || savedSearch.rooms || 1
  );

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

  useEffect(() => {
    if (!hotel) return;

    try {
      const recent = JSON.parse(
        localStorage.getItem("trivagoRecent") || "[]"
      );

      const next = [
        hotel,
        ...recent.filter(
          (item) => String(item.id) !== String(hotel.id)
        ),
      ].slice(0, 12);

      localStorage.setItem(
        "trivagoRecent",
        JSON.stringify(next)
      );
    } catch {
    }
  }, [hotel]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const pricePerNight = formatPrice(hotel?.price);

  const validDates =
    Boolean(checkIn && checkOut) &&
    new Date(checkOut) > new Date(checkIn);

  const nights = validDates
    ? Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const total = pricePerNight * nights * rooms;
  const isFavorite = favorites.some(
    (item) => String(item.id) === String(hotel?.id)
  );

  const toggleFavorite = () => {
    if (!hotel) return;

    setFavorites((previous) =>
      previous.some(
        (item) => String(item.id) === String(hotel.id)
      )
        ? previous.filter(
            (item) => String(item.id) !== String(hotel.id)
          )
        : [...previous, hotel]
    );
  };

  const gallery = useMemo(() => {
    if (!hotel) return galleryImages;

    const images = [
      hotel.image || FALLBACK_IMAGE,
      ...galleryImages.filter(
        (image) => image !== hotel.image
      ),
    ];

    return images.slice(0, 4);
  }, [hotel]);

  const confirmBooking = () => {
    if (!validDates) {
      alert(
        "Please choose a check-out date after your check-in date."
      );
      return;
    }

    if (guests < 1 || rooms < 1) {
      alert("Please enter valid guests and rooms.");
      return;
    }

    const booking = {
      id: Date.now(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location,
      image: hotel.image || FALLBACK_IMAGE,
      price: hotel.price,
      totalPrice: total,
      checkIn,
      checkOut,
      guests,
      rooms,
      nights,
      status: "Confirmed",
      bookedAt: new Date().toLocaleDateString("en-IN"),
    };

    let previous = [];

    try {
      previous = JSON.parse(
        localStorage.getItem("trivagoBookings") || "[]"
      );

      if (!Array.isArray(previous)) {
        previous = [];
      }
    } catch {
      previous = [];
    }

    localStorage.setItem(
      "trivagoBookings",
      JSON.stringify([booking, ...previous])
    );

    setShowBooking(false);
    alert("Demo booking saved successfully!");
    navigate("/my-bookings");
  };

  if (!hotel) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-6xl">🏨</div>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Hotel not found
        </h2>

        <p className="mt-2 text-center text-gray-500">
          This hotel is no longer available. Go back to the
          search results.
        </p>

        <button
          onClick={() => navigate("/hotel-results")}
          className="mt-5 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Back to Results
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-3 text-sm font-semibold text-blue-700 hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-900">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">

          <button
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold tracking-tight"
          >
            <span className="text-pink-600">tri</span>
            <span className="text-blue-600">vago</span>
          </button>

          <div className="flex items-center gap-2">
            <LanguageCurrencyModal />
            <SignInModal />
            <MenuModal />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Back to results
        </button>
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold">
                {hotel.name}
              </h1>

              <span className="text-orange-500">
                ★★★★★
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {hotel.location} · {hotel.distance || "5.8 km"} to City centre
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
          </div>
          <button
            onClick={toggleFavorite}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:border-gray-600"
          >
            {isFavorite ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${hotel.name} ${index + 1}`}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className={`w-full rounded-xl object-cover ${
                index === 0
                  ? "col-span-2 h-56 md:h-72"
                  : "h-36 md:h-72"
              }`}
            />
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>

            <p className="leading-relaxed text-gray-700">
              {hotel.description ||
                "Enjoy a comfortable stay with excellent hospitality, modern rooms and convenient facilities."}
            </p>
            <h2 className="mt-8 text-xl font-bold">
              Property highlights
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <p
                  key={item}
                  className="rounded-lg bg-white p-3 text-sm shadow-sm"
                >
                  ✓ {item}
                </p>
              ))}
            </div>
            <h2 className="mt-8 text-xl font-bold">
              Breakfast options
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {breakfastOptions.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-orange-50 px-4 py-2 text-sm text-orange-800"
                >
                  {item}
                </span>
              ))}
            </div>
            <h2 className="mt-8 text-xl font-bold">
              Room facilities and services
            </h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {(hotel.facilities || defaultFacilities).map(
                (item) => (
                  <p
                    key={item}
                    className="rounded-lg border bg-white p-3 text-sm"
                  >
                    ✓ {item}
                  </p>
                )
              )}
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">

            <p className="text-sm text-gray-500">
              Price per night · {hotel.provider || "Hotel Site"}
            </p>

            <p className="text-3xl font-extrabold">
              ₹{pricePerNight.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {nights} night{nights !== 1 ? "s" : ""},{" "}
              {rooms} room{rooms > 1 ? "s" : ""}
            </p>

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total price</span>

                <span className="font-bold text-gray-900">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowBooking(true)}
              className="mt-5 w-full rounded-xl bg-green-700 py-3 font-bold text-white transition hover:bg-green-800"
            >
              Book Now
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              No payment required for this demo.
            </p>
          </aside>
        </div>
      </main>

      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-5 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Complete Your Booking
              </h2>

              <button
                onClick={() => setShowBooking(false)}
                className="text-3xl text-gray-500 hover:text-black"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-5 flex gap-4">
              <img
                src={hotel.image || FALLBACK_IMAGE}
                alt={hotel.name}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="h-24 w-28 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-bold">
                  {hotel.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {hotel.location}
                </p>

                <p className="mt-1 font-bold text-blue-700">
                  ₹{pricePerNight.toLocaleString("en-IN")} / night
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

              <label className="text-sm font-semibold">
                Check-in

                <input
                  type="date"
                  min={todayISO()}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-2 w-full rounded-lg border p-3"
                />
              </label>

              <label className="text-sm font-semibold">
                Check-out

                <input
                  type="date"
                  min={checkIn || todayISO()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-2 w-full rounded-lg border p-3"
                />
              </label>

              <label className="text-sm font-semibold">
                Guests

                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) =>
                    setGuests(
                      Math.max(1, Number(e.target.value) || 1)
                    )
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                />
              </label>

              <label className="text-sm font-semibold">
                Rooms

                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rooms}
                  onChange={(e) =>
                    setRooms(
                      Math.max(1, Number(e.target.value) || 1)
                    )
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                />
              </label>
            </div>

            {!validDates && (
              <p className="mt-3 text-sm text-red-600">
                Check-out must be after check-in.
              </p>
            )}

            <div className="mt-6 rounded-xl bg-gray-50 p-4">

              <div className="flex justify-between text-sm text-gray-600">
                <span>Price per night</span>
                <span>
                  ₹{pricePerNight.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>Number of nights</span>
                <span>{nights}</span>
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>Rooms</span>
                <span>{rooms}</span>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total price</span>

                <span>
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              onClick={confirmBooking}
              disabled={!validDates}
              className="mt-6 w-full rounded-xl bg-green-700 py-3 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirm Booking
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Demo booking only. No real hotel reservation or payment is made.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
