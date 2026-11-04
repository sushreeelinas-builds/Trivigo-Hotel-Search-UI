
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../data/cities";
import SignInModal from "./SignInModal";

const cities = [
  {
    name: "Udaipur",
    hotels: "2,942",
    price: "₹7,312",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=700",
  },
  {
    name: "Mumbai",
    hotels: "5,648",
    price: "₹7,692",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700",
  },
  {
    name: "Jaipur",
    hotels: "5,593",
    price: "₹5,615",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=700",
  },
  {
    name: "Mussoorie",
    hotels: "1,549",
    price: "₹6,552",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=700",
  },
  {
    name: "Bengaluru",
    hotels: "8,559",
    price: "₹5,097",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=700",
  },
  {
    name: "Goa",
    hotels: "4,230",
    price: "₹4,850",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700",
  },
];

const destinations = [
  {
    name: "Manali",
    hotels: "2,120",
    price: "₹4,250",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700",
  },
  {
    name: "Kerala",
    hotels: "3,450",
    price: "₹5,200",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=700",
  },
  {
    name: "Agra",
    hotels: "1,890",
    price: "₹3,900",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700",
  },
  {
    name: "Shimla",
    hotels: "1,540",
    price: "₹4,600",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700",
  },
  {
    name: "Rishikesh",
    hotels: "1,250",
    price: "₹3,500",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700",
  },
];

export default function PopularSearches() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Cities");
  const [startIndex, setStartIndex] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);

  const data = activeTab === "Cities" ? cities : destinations;

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % data.length);
  };

  const previousSlide = () => {
    setStartIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const visibleCards = Array.from(
    { length: Math.min(5, data.length) },
    (_, index) => data[(startIndex + index) % data.length]
  );

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 xl:px-16">

      <div className="mx-auto w-full max-w-[1280px]">

        {/* Heading */}
        <h2 className="mb-4 text-2xl font-bold text-black sm:text-[28px]">
          Popular searches
        </h2>

        {/* Tabs */}
        <div className="mb-6 flex items-center gap-6 border-b border-gray-200">

          {["Cities", "Destinations"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setStartIndex(0);
              }}
              className={`relative px-2 py-3 text-sm font-semibold transition-all sm:text-base ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* Cards Section */}
        <div className="relative">

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {visibleCards.map((city, index) => (

              <div
                key={`${city.name}-${index}`}
                role="link"
                tabIndex={0}
                aria-label={`Explore ${city.name}`}
                onClick={() =>
                  navigate(`/destination/${slugify(city.name)}`)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/destination/${slugify(city.name)}`);
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="h-48 overflow-hidden sm:h-44 lg:h-40 xl:h-[180px]">

                  <img
                    src={city.image}
                    alt={city.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                </div>

                {/* Details */}
                <div className="px-3 py-3">

                  <h3 className="mb-2 text-lg font-bold text-gray-950 sm:text-xl">
                    {city.name}
                  </h3>

                  <p className="mb-1 text-sm text-gray-700">
                    <span className="text-lg font-bold text-black">
                      {city.hotels}
                    </span>{" "}
                    Hotels
                  </p>

                  <p className="text-sm text-gray-700">
                    <span className="text-lg font-bold text-black">
                      {city.price}
                    </span>{" "}
                    Avg.
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Previous Arrow */}
          <button
            onClick={previousSlide}
            aria-label="Previous cities"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-xl bg-white shadow-lg transition hover:bg-gray-100 lg:flex"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next cities"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-xl bg-white shadow-lg transition hover:bg-gray-100 lg:flex"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Mobile Navigation */}
          <div className="mt-5 flex justify-center gap-4 lg:hidden">

            <button
              onClick={previousSlide}
              aria-label="Previous cities"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition hover:bg-gray-100"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next cities"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition hover:bg-gray-100"
            >
              →
            </button>

          </div>

        </div>

        {/* Member Banner */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-[#ffca28] px-4 py-2 sm:mt-12 sm:flex-row sm:px-6 sm:py-2">

          <div className="flex w-full items-center gap-3 sm:gap-4">

            {/* Icon */}
            <div className="flex h-11 w-11 min-w-11 items-center justify-center rounded-full border-2 border-black bg-white shadow-sm sm:h-12 sm:w-12">

              <span className="text-2xl font-bold">
                $
              </span>

            </div>

            {/* Text */}
            <p className="text-left text-sm text-black sm:text-base lg:text-lg">

              <span className="font-bold">
                Want access to member prices and perks?
              </span>

              <br className="hidden sm:block" />

              <span className="sm:ml-1">
                Continue as a member
              </span>

            </p>

          </div>

          {/* Sign In Button */}
         
          <SignInModal 
          isOpen={showSignIn}
          onClose={() => setShowSignIn(false)}
        />

        </div>

         

      </div>

    </section>
  );
}
