
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { bestTimeDestinations as destinations, searchUrl } from "../data/cities";


export default function BestTimeToBook() {
  const [activeCity, setActiveCity] = useState("Udaipur");
  const navigate = useNavigate();

  const city =
    destinations.find((destination) => destination.name === activeCity) ||
    destinations[0];

  return (
    <section className="w-full bg-white px-4 py-10 text-black sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-7 text-2xl font-bold tracking-tight sm:text-3xl">
          Discover the best time to book your next stay
        </h2>

        <div className="rounded-2xl bg-white p-4 shadow-[0_5px_25px_rgba(0,0,0,0.14)] sm:p-6">
          <div className="mb-5 flex gap-2 overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {destinations.map((destination) => (
              <button
                key={destination.name}
                type="button"
                onClick={() => {
                  setActiveCity(destination.name);
                }}
                className={`shrink-0 border-b-2 px-4 py-3 text-sm font-bold transition sm:text-base ${
                  activeCity === destination.name
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-black hover:text-sky-600"
                }`}
              >
                {destination.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.25fr)]">
            <div className="flex flex-col">
              <img
                src={city.image}
                alt={`${city.name} travel destination`}
                className="h-[300px] w-full rounded-xl object-cover sm:h-[380px] md:h-[425px]"
                onError={(event) => {
                  event.currentTarget.style.backgroundColor = "#e5e7eb";
                }}
              />

              <p className="mt-5 text-sm font-medium leading-6 text-gray-500">
                Prices are based on the average price range for 3-star hotels
                per night.
              </p>
            </div>

            <div className="max-h-[425px] space-y-2 overflow-y-auto pr-1">
              {city.prices.map(([month, lowPrice, highPrice]) => (
                <div key={month}>
                  <button
                    type="button"
                    onClick={() => navigate(searchUrl({ city: city.name, month }))}
                    aria-label={`See ${city.name} hotels for ${month}`}
                    className="flex min-h-[51px] w-full items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-left transition hover:border-sky-500 hover:bg-sky-50"
                  >
                    <span className="text-sm font-bold sm:text-base">{month}</span>

                    <span className="flex items-center gap-2 whitespace-nowrap text-sm font-bold sm:gap-3 sm:text-base">
                      <span>
                        {lowPrice} - {highPrice}
                      </span>
                      <ChevronRight size={21} strokeWidth={2.5} className="shrink-0" />
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
