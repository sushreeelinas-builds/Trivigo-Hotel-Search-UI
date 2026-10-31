
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("Cities");
  const [startIndex, setStartIndex] = useState(0);

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
    <section className="w-full bg-white py-10 px-4  sm:px-8 lg:px-16">
      <div className="max-w-[1500px] mx-auto w-[1260px]">

        {/* Heading */}
        <h2 className="text-2xl sm:text-[28px] font-bold text-black mb-3">
          Popular searches
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap- border-b border-gray-200 mb-4">
          {["Cities", "Destinations"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setStartIndex(0);
              }}
              className={`px-3 py-2 text-base font-semibold transition-all
                ${
                  activeTab === tab
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Carousel */}
        <div className="relative">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-70 gap-5">

            {visibleCards.map((city, index) => (
              <div
                key={`${city.name}-${index}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.13)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="h-[180px] overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="px-2 py-1">
                  <h3 className="text-[20px] font-bold text-gray-950 mb-">
                    {city.name}
                  </h3>

                  <p className="text-[13px] text-gray-700 mb-">
                    <span className="font-bold text-black text-lg">
                      {city.hotels}
                    </span>{" "}
                    Hotels
                  </p>

                  <p className="text-[15px] text-gray-700">
                    <span className="font-bold text-black text-lg">
                      {city.price}
                    </span>{" "}
                    Avg.
                  </p>
                </div>
              </div>
            ))}

          </div>

          {/* Previous Button */}
          <button
            onClick={previousSlide}
            aria-label="Previous cities"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white shadow-lg rounded-lg w-10 h-10 hidden xl:flex items-center justify-center hover:bg-gray-100 transition"
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

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next cities"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white shadow-lg rounded-lg w-10 h-10 hidden xl:flex items-center justify-center hover:bg-gray-100 transition"
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

        </div>

        {/* Membership Banner */}
        <div className="mt-12 bg-[#ffca28] rounded-2xl px-2 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            {/* Money Icon */}
            <div className="w-10 h-10 min-w-10 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-sm">
              <span className="text-2xl font-bold">$</span>
            </div>

            <p className="text-center sm:text-left text-base sm:text-lg text-black">
              <span className="font-bold">
                Want access to member prices and perks?
              </span>{" "}
              Continue as a member
            </p>
          </div>

          {/* Sign In Button */}
          <button className="bg-white border border-black rounded-xl px-6 py-3 font-bold text-black flex items-center gap-3 hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap">
            Sign in
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}
