
import { useEffect, useMemo, useState } from "react";
import {
  X,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Waves,
  Clock,
  Phone,
  Globe,
  ShieldCheck,
  CheckCircle,
  CalendarDays,
  ExternalLink,
  ThumbsUp,
  Camera,
  Info,
  MessageSquare,
  CreditCard,
} from "lucide-react";

const categories = [
  "All photos",
  "Rooms",
  "Bathroom",
  "Building & Facilities",
  "Dining",
  "Gym",
  "Surroundings",
];

const defaultReviews = [
  {
    name: "Rahul Sharma",
    date: "October 2026",
    rating: 9.2,
    title: "Excellent hotel and great experience",
    comment:
      "Very comfortable rooms, friendly staff and excellent service. The location was also convenient.",
  },
  {
    name: "Priya Das",
    date: "September 2026",
    rating: 8.8,
    title: "Beautiful property",
    comment:
      "The hotel was clean and beautiful. Breakfast was good and the rooms were spacious.",
  },
  {
    name: "Amit Kumar",
    date: "August 2026",
    rating: 9.5,
    title: "Wonderful stay",
    comment:
      "Amazing hospitality, comfortable beds and a peaceful atmosphere. Would definitely recommend.",
  },
];

const defaultAmenities = [
  { name: "Free Wi-Fi", icon: Wifi },
  { name: "Free Parking", icon: Car },
  { name: "Swimming Pool", icon: Waves },
  { name: "Restaurant", icon: Utensils },
  { name: "Breakfast", icon: Coffee },
  { name: "Fitness Centre", icon: Dumbbell },
];

const defaultProviders = [
  { name: "Booking.com", price: 0 },
  { name: "Agoda", price: 0 },
  { name: "MakeMyTrip", price: 0 },
  { name: "Goibibo", price: 0 },
];

export default function HotelGalleryModal({
  hotel,
  onClose,
  isFavorite = false,
  onFavorite,
}) {
  const [activeTab, setActiveTab] = useState("Photos");
  const [activeCategory, setActiveCategory] = useState("All photos");
  const [view, setView] = useState("Gallery");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [checkIn, setCheckIn] = useState(
    hotel?.checkIn || "2026-11-07"
  );

  const [checkOut, setCheckOut] = useState(
    hotel?.checkOut || "2026-11-10"
  );

  const [activeReviewFilter, setActiveReviewFilter] =
    useState("All");

  const photos = useMemo(() => {
    if (!hotel) return [];

    const base = hotel.image || "";

    const hotelPhotos = [
      { url: base, category: "Rooms" },
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1100",
        category: "Building & Facilities",
      },
      {
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1100",
        category: "Rooms",
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1100",
        category: "Bathroom",
      },
      {
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1100",
        category: "Building & Facilities",
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1100",
        category: "Rooms",
      },
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1100",
        category: "Dining",
      },
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1100",
        category: "Surroundings",
      },
      {
        url: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1100",
        category: "Gym",
      },
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1100",
        category: "Rooms",
      },
    ];

    return hotelPhotos.filter((photo) => photo.url);
  }, [hotel]);

  const filteredPhotos =
    activeCategory === "All photos"
      ? photos
      : photos.filter(
          (photo) => photo.category === activeCategory
        );

  const hotelPrice = Number(
    String(hotel?.price || "5000").replace(/[^\d.]/g, "")
  ) || 5000;

  const providers = (
    Array.isArray(hotel?.priceSites) && hotel.priceSites.length
      ? hotel.priceSites
      : defaultProviders.map((provider, index) => ({
          ...provider,
          price: Math.round(
            hotelPrice * (1 + index * 0.055)
          ),
        }))
  ).map((provider) => ({
    ...provider,
    price:
      Number(
        String(provider.price || hotelPrice).replace(/[^\d.]/g, "")
      ) || hotelPrice,
  }));

  const reviews = Array.isArray(hotel?.reviewsList)
    ? hotel.reviewsList
    : defaultReviews;

  const amenities = Array.isArray(hotel?.amenities)
    ? hotel.amenities.map((item) =>
        typeof item === "string"
          ? { name: item, icon: CheckCircle }
          : item
      )
    : defaultAmenities;

  const overallRating = Number(
    hotel?.score || hotel?.rating || 8.8
  );

  const reviewCount = Number(
    hotel?.reviewCount || hotel?.ratingsCount || 1250
  );

  const reviewLabel =
    overallRating >= 9
      ? "Excellent"
      : overallRating >= 8
      ? "Very good"
      : overallRating >= 7
      ? "Good"
      : "Average";

  const filteredReviews =
    activeReviewFilter === "All"
      ? reviews
      : reviews.filter((review) => {
          if (activeReviewFilter === "Excellent")
            return Number(review.rating) >= 9;

          if (activeReviewFilter === "Very good")
            return (
              Number(review.rating) >= 8 &&
              Number(review.rating) < 9
            );

          return Number(review.rating) < 8;
        });

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        if (selectedIndex !== null) {
          setSelectedIndex(null);
        } else {
          onClose();
        }
      }

      if (
        selectedIndex !== null &&
        filteredPhotos.length > 0
      ) {
        if (event.key === "ArrowRight") {
          setSelectedIndex(
            (prev) => (prev + 1) % filteredPhotos.length
          );
        }

        if (event.key === "ArrowLeft") {
          setSelectedIndex(
            (prev) =>
              (prev - 1 + filteredPhotos.length) %
              filteredPhotos.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filteredPhotos.length, onClose]);

  if (!hotel) return null;

  const shareHotel = async () => {
    const shareData = {
      title: hotel.name,
      text: `Check out ${hotel.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Hotel link copied!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Sharing failed:", error);
      }
    }
  };

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  const tabs = [
    { name: "Prices", icon: CreditCard },
    { name: "Photos", icon: Camera },
    { name: "Reviews", icon: MessageSquare },
    { name: "Info", icon: Info },
  ];

  const handleBooking = (provider) => {
    const bookingDetails = {
      id: Date.now(),
      hotelName: hotel.name,
      location: hotel.location || hotel.city || "",
      image: hotel.image,
      price: provider.price,
      provider: provider.name,
      checkIn,
      checkOut,
      status: "Pending",
    };

    localStorage.setItem(
      "trivagoSelectedHotel",
      JSON.stringify(hotel)
    );

    localStorage.setItem(
      "trivagoBookingSelection",
      JSON.stringify(bookingDetails)
    );

    alert(
      `${provider.name} selected!\nPrice: ${formatPrice(provider.price)}`
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-0 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-full w-full max-w-[1500px] flex-col overflow-hidden bg-white sm:h-[94vh] sm:rounded-xl">

        <header className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <h2 className="truncate text-lg font-extrabold sm:text-2xl">
              {hotel.name}
            </h2>

            <button
              onClick={shareHotel}
              title="Share hotel"
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <Share2 size={20} />
            </button>

            <button
              onClick={onFavorite}
              title="Favorite"
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <Heart
                size={22}
                fill={isFavorite ? "#ec2451" : "none"}
                color={isFavorite ? "#ec2451" : "currentColor"}
              />
            </button>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg border p-2 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </header>

        <div className="flex shrink-0 flex-wrap items-center gap-3 border-b px-5 py-3 text-sm">

          <span className="flex items-center gap-1 text-gray-600">
            <MapPin size={16} />
            {hotel.location || hotel.city || "India"}
          </span>

          <span className="flex items-center gap-1">
            <span className="rounded bg-green-700 px-2 py-1 font-bold text-white">
              {overallRating}
            </span>

            <strong>{reviewLabel}</strong>
            <span className="text-gray-500">
              ({reviewCount.toLocaleString("en-IN")} ratings)
            </span>
          </span>

          <span className="text-orange-500">
            {"★".repeat(
              Math.max(0, Math.min(5, Number(hotel.stars || 4)))
            )}
          </span>

        </div>
        <div className="flex shrink-0 gap-6 overflow-x-auto border-b px-5">

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  setSelectedIndex(null);
                }}
                className={`flex shrink-0 items-center gap-2 border-b-[3px] py-4 font-bold transition ${
                  activeTab === tab.name
                    ? "border-sky-600 text-sky-700"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            );
          })}

        </div>

        <main className="min-h-0 flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">


          {activeTab === "Prices" && (
            <div className="mx-auto max-w-5xl space-y-6">

              <div>
                <h2 className="text-2xl font-extrabold">
                  Compare hotel prices
                </h2>

                <p className="mt-1 text-gray-500">
                  Find the best available deal for {hotel.name}.
                </p>
              </div>

              <div className="grid gap-4 rounded-xl border bg-white p-5 shadow-sm sm:grid-cols-3">

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold">
                    <CalendarDays size={17} />
                    Check-in
                  </label>

                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full rounded-lg border p-3 outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold">
                    <CalendarDays size={17} />
                    Check-out
                  </label>

                  <input
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-lg border p-3 outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Guests and rooms
                  </label>

                  <div className="rounded-lg border p-3 text-sm font-semibold">
                    2 Guests · 1 Room
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-sky-100 p-5">

                <div>
                  <p className="font-semibold text-gray-600">
                    Starting price
                  </p>

                  <h3 className="mt-1 text-3xl font-extrabold">
                    {formatPrice(
                      Math.min(...providers.map((p) => p.price))
                    )}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Price per night (sample prices)
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-sm font-bold">
                    {providers.length} booking sites
                  </p>
                  <p className="text-xs text-gray-500">
                    Compare available offers
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border bg-white">

                <div className="border-b p-5">
                  <h3 className="text-xl font-extrabold">
                    Available prices
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Compare different booking providers.
                  </p>
                </div>

                {providers
                  .slice()
                  .sort((a, b) => a.price - b.price)
                  .map((provider, index) => (
                    <div
                      key={provider.name}
                      className="flex flex-wrap items-center justify-between gap-4 border-b p-5 last:border-0"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-xl font-extrabold text-sky-700">
                          {provider.name.charAt(0)}
                        </div>

                        <div>
                          <h4 className="font-bold">
                            {provider.name}
                          </h4>

                          {index === 0 && (
                            <span className="text-xs font-bold text-green-700">
                              Best sample price
                            </span>
                          )}

                          <p className="text-xs text-gray-500">
                            Taxes may apply
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center gap-4">

                        <div className="text-right">
                          <p className="text-xl font-extrabold">
                            {formatPrice(provider.price)}
                          </p>

                          <p className="text-xs text-gray-500">
                            Per night
                          </p>
                        </div>

                        <button
                          onClick={() => handleBooking(provider)}
                          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-3 font-bold text-white hover:bg-sky-700"
                        >
                          See Deal
                          <ExternalLink size={16} />
                        </button>

                      </div>

                    </div>
                  ))}

              </div>

              <p className="text-xs text-gray-500">
                Note: These are demonstration prices, not live offers.
                Actual availability and prices require a hotel booking API.
              </p>

            </div>
          )}

          {activeTab === "Photos" && (
            <div className="space-y-5">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div>
                  <h2 className="text-2xl font-extrabold">
                    Photos of {hotel.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Explore hotel rooms and facilities.
                  </p>
                </div>

                <div className="flex gap-2">

                  {["Gallery", "List"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setView(item)}
                      className={`rounded-full border px-5 py-2 font-semibold ${
                        view === item
                          ? "border-sky-200 bg-sky-100 text-sky-800"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">

                {categories.map((category) => {
                  const count =
                    category === "All photos"
                      ? photos.length
                      : photos.filter(
                          (p) => p.category === category
                        ).length;

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setSelectedIndex(null);
                      }}
                      className={`rounded-full border px-4 py-2 text-sm font-bold ${
                        activeCategory === category
                          ? "border-sky-200 bg-sky-100 text-sky-800"
                          : "border-gray-300 bg-white hover:bg-gray-100"
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}

              </div>

              {view === "Gallery" ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  {filteredPhotos.map((photo, index) => (
                    <button
                      key={`${photo.url}-${index}`}
                      onClick={() => setSelectedIndex(index)}
                      className="group relative h-56 overflow-hidden rounded-xl bg-gray-200 sm:h-64"
                    >
                      <img
                        src={photo.url}
                        alt={photo.category}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />

                      <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-sm font-bold text-white">
                        {photo.category}
                      </span>
                    </button>
                  ))}

                </div>
              ) : (
                <div className="space-y-3">

                  {filteredPhotos.map((photo, index) => (
                    <button
                      key={`${photo.url}-${index}`}
                      onClick={() => setSelectedIndex(index)}
                      className="flex w-full items-center gap-4 rounded-xl border bg-white p-3 text-left hover:bg-gray-50"
                    >
                      <img
                        src={photo.url}
                        alt={photo.category}
                        className="h-24 w-32 rounded-lg object-cover"
                      />

                      <div>
                        <p className="font-bold">
                          {photo.category}
                        </p>

                        <p className="text-sm text-gray-500">
                          {hotel.name}
                        </p>
                      </div>

                    </button>
                  ))}

                </div>
              )}

              {filteredPhotos.length === 0 && (
                <p className="py-16 text-center text-gray-500">
                  No photos available in this category.
                </p>
              )}

            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="mx-auto max-w-5xl space-y-6">

              <div>
                <h2 className="text-2xl font-extrabold">
                  Guest reviews
                </h2>

                <p className="mt-1 text-gray-500">
                  See what guests say about {hotel.name}.
                </p>
              </div>

              <div className="grid gap-5 rounded-xl border bg-white p-6 sm:grid-cols-2">

                <div className="flex items-center gap-5">

                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-green-700 text-white">
                    <span className="text-3xl font-extrabold">
                      {overallRating}
                    </span>

                    <span className="text-xs font-semibold">
                      {reviewLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold">
                      {reviewLabel}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Based on {reviewCount.toLocaleString("en-IN")} ratings
                    </p>

                    <div className="mt-2 text-orange-400">
                      ★★★★★
                    </div>
                  </div>
                </div>

                <div className="space-y-3">

                  {[
                    { label: "Excellent", value: 85 },
                    { label: "Very good", value: 75 },
                    { label: "Good", value: 45 },
                    { label: "Average", value: 20 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 text-sm"
                    >

                      <span className="w-24 text-gray-600">
                        {item.label}
                      </span>

                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-green-600"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="flex flex-wrap gap-2">

                {["All", "Excellent", "Very good", "Good"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveReviewFilter(filter)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold ${
                        activeReviewFilter === filter
                          ? "border-sky-200 bg-sky-100 text-sky-800"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>

              <div className="space-y-4">

                {filteredReviews.map((review, index) => (
                  <article
                    key={review.id || index}
                    className="rounded-xl border bg-white p-5 shadow-sm"
                  >

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 font-extrabold text-sky-700">
                          {review.name?.charAt(0) || "G"}
                        </div>

                        <div>
                          <h4 className="font-bold">
                            {review.name || "Guest"}
                          </h4>

                          <p className="text-xs text-gray-500">
                            {review.date || "Recent guest"}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-lg bg-green-700 px-3 py-2 font-extrabold text-white">
                        {review.rating}/10
                      </span>

                    </div>

                    <h3 className="mt-4 font-extrabold">
                      {review.title || "Great experience"}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {review.comment || review.text || ""}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <ThumbsUp size={15} />
                      Helpful review
                    </div>

                  </article>
                ))}

                {filteredReviews.length === 0 && (
                  <p className="rounded-xl bg-white p-8 text-center text-gray-500">
                    No reviews found in this category.
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-500">
                Sample reviews are displayed when actual hotel review
                data is not provided.
              </p>
            </div>
          )}

          {activeTab === "Info" && (
            <div className="mx-auto max-w-5xl space-y-6">

              <div>
                <h2 className="text-2xl font-extrabold">
                  About {hotel.name}
                </h2>

                <p className="mt-1 text-gray-500">
                  Hotel information, facilities and location.
                </p>
              </div>
              <section className="rounded-xl border bg-white p-6">

                <h3 className="text-xl font-extrabold">
                  Hotel overview
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {hotel.description ||
                    `${hotel.name} offers comfortable accommodation and convenient facilities for travellers. Explore the hotel's rooms, services and nearby attractions before planning your stay.`}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <MapPin size={17} />
                    {hotel.location || hotel.city || "India"}
                  </span>

                  <span className="flex items-center gap-2">
                    <Star size={17} className="text-orange-500" />
                    {overallRating} / 10
                  </span>
                </div>
              </section>


              <section className="rounded-xl border bg-white p-6">

                <h3 className="text-xl font-extrabold">
                  Facilities and amenities
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Facilities listed for this hotel.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">

                  {amenities.map((amenity, index) => {
                    const Icon = amenity.icon || CheckCircle;

                    return (
                      <div
                        key={amenity.name || index}
                        className="flex items-center gap-3"
                      >
                        <div className="rounded-lg bg-sky-50 p-3 text-sky-700">
                          <Icon size={21} />
                        </div>

                        <span className="text-sm font-semibold">
                          {amenity.name}
                        </span>

                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-xl border bg-white p-6">

                <h3 className="text-xl font-extrabold">
                  Check-in and check-out
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                    <Clock size={25} className="text-sky-700" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Check-in
                      </p>

                      <p className="font-bold">
                        {hotel.checkInTime || "After 2:00 PM"}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                    <Clock size={25} className="text-sky-700" />

                    <div>
                      <p className="text-sm text-gray-500">
                        Check-out
                      </p>

                      <p className="font-bold">
                        {hotel.checkOutTime || "Before 11:00 AM"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border bg-white p-6">

                <h3 className="text-xl font-extrabold">
                  Hotel policies
                </h3>

                <div className="mt-5 space-y-4">

                  {[
                    {
                      title: "Cancellation policy",
                      desc:
                        hotel.cancellationPolicy ||
                        "Cancellation policies may vary depending on the selected booking provider.",
                    },
                    {
                      title: "Payment",
                      desc:
                        hotel.paymentPolicy ||
                        "Payment methods and charges depend on the booking provider.",
                    },
                    {
                      title: "Pets",
                      desc:
                        hotel.petPolicy ||
                        "Please contact the property to confirm its pet policy.",
                    },
                  ].map((policy) => (
                    <div
                      key={policy.title}
                      className="flex gap-3 border-b pb-4 last:border-0 last:pb-0"
                    >
                      <ShieldCheck
                        size={21}
                        className="shrink-0 text-green-600"
                      />

                      <div>
                        <h4 className="font-bold">
                          {policy.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-600">
                          {policy.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-xl border bg-white p-6">

                <h3 className="text-xl font-extrabold">
                  Contact and location
                </h3>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={20} className="text-sky-700" />
                    <span>
                      {hotel.address ||
                        hotel.location ||
                        hotel.city ||
                        "India"}
                    </span>
                  </div>

                  {hotel.phone && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone size={20} className="text-sky-700" />
                      {hotel.phone}
                    </div>
                  )}

                  {hotel.website && (
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sky-700 hover:underline"
                    >
                      <Globe size={20} />
                      Visit hotel website
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </section>
            </div>
          )}
        </main>

        {selectedIndex !== null &&
          filteredPhotos[selectedIndex] && (
            <div
              className="absolute inset-0 z-[120] flex items-center justify-center bg-black/95 p-5"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedIndex(null);
                }
              }}
            >

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute right-5 top-5 rounded-full bg-white p-3"
              >
                <X size={23} />
              </button>

              <button
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + filteredPhotos.length) %
                      filteredPhotos.length
                  )
                }
                className="absolute left-3 rounded-full bg-white p-3 sm:left-8"
              >
                <ChevronLeft size={25} />
              </button>

              <img
                src={filteredPhotos[selectedIndex].url}
                alt={hotel.name}
                className="max-h-[85%] max-w-[85%] rounded-lg object-contain"
              />

              <button
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex + 1) % filteredPhotos.length
                  )
                }
                className="absolute right-3 rounded-full bg-white p-3 sm:right-8"
              >
                <ChevronRight size={25} />
              </button>

              <p className="absolute bottom-5 text-sm text-white">
                {selectedIndex + 1} / {filteredPhotos.length}
              </p>

            </div>
          )}

      </div>
    </div>
  );
}
