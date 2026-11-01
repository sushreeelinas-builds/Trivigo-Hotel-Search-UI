
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cities = [
  {
    name: "Udaipur",
    hotels: "2,942",
    price: "₹7,312",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=700",
  },
  {
    name: "Mumbai",
    hotels: "5,648",
    price: "₹7,692",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700",
  },
  {
    name: "Jaipur",
    hotels: "5,593",
    price: "₹5,615",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=700",
  },
  {
    name: "Mussoorie",
    hotels: "1,549",
    price: "₹6,552",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=700",
  },
  {
    name: "Bengaluru",
    hotels: "8,559",
    price: "₹5,097",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=700",
  },
  {
    name: "Goa",
    hotels: "4,230",
    price: "₹4,850",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700",
  },
];

const destinations = [
  {
    name: "Manali",
    hotels: "2,120",
    price: "₹4,250",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700",
  },
  {
    name: "Kerala",
    hotels: "3,450",
    price: "₹5,200",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=700",
  },
  {
    name: "Agra",
    hotels: "1,890",
    price: "₹3,900",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700",
  },
  {
    name: "Shimla",
    hotels: "1,540",
    price: "₹4,600",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700",
  },
  {
    name: "Rishikesh",
    hotels: "1,250",
    price: "₹3,500",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700",
  },
];

export default function PopularSearches() {
  const [activeTab, setActiveTab] = useState("Cities");
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const data = activeTab === "Cities" ? cities : destinations;

  const openDestination = (place) => {
    const month = new Date().toLocaleString("en-US", {
      month: "long",
    });

    navigate(
      `/month-details/${encodeURIComponent(place.name)}/${month.toLowerCase()}`,
      {
        state: {
          destination: place.name,
          month,
          image: place.image,
          hotels: place.hotels,
          averagePrice: place.price,
        },
      }
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <section className="w-full max-w-[1550px]  bg-white px-4 py-10 sm:px-8 lg:px-30 ">
      <div className="mx-auto max-w-[1600px]">

        <h2 className="mb-3 text-2xl font-bold sm:text-[28px]">
          Popular searches
        </h2>

        <div className="mb-5 flex gap-5 border-b">
          {["Cities", "Destinations"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setStartIndex(0);
              }}
              className={`border-b-2 px-3 py-2 font-semibold ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibleCards.map((place) => (
              <button
                key={place.name}
                onClick={() => openDestination(place)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-[0_6px_20px_rgba(0,0,0,0.13)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-[180px] overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-xl font-bold">{place.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    <strong className="text-lg text-black">
                      {place.hotels}
                    </strong>{" "}
                    Hotels
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong className="text-lg text-black">
                      {place.price}
                    </strong>{" "}
                    Avg.
                  </p>
                  <p className="mt-2 text-xs font-bold text-sky-700">
                    Explore hotels →
                  </p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={previousSlide}
            aria-label="Previous"
            className="absolute -left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow-lg xl:flex"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute -right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow-lg xl:flex"
          >
            ❯
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#ffca28] px-6 py-4 sm:flex-row">
          <p className="text-center text-lg text-black sm:text-left">
            <strong>Want access to member prices and perks?</strong>{" "}
            Continue as a member
          </p>

          <button className="rounded-xl border border-black bg-white px-6 py-3 font-bold hover:bg-black hover:text-white">
            Sign in →
          </button>
        </div>
      </div>
    </section>
  );
}
