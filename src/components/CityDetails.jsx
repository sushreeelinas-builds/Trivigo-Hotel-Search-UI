import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MapPin, ChevronRight, Hotel as HotelIcon, Wallet } from "lucide-react";
import SiteHeader from "./SiteHeader";
import {
  cities,
  cityImage,
  findCity,
  MONTHS,
  monthRange,
  searchUrl,
  slugify,
  toISO,
} from "../data/cities";
import { getCityHotels, getLabel } from "../data/hotels";

const rupees = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

export default function CityDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const city = findCity(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!city) return <Navigate to="/" replace />;

  const hotels = getCityHotels(city.name);
  const topHotels = [...hotels].sort((a, b) => b.score - a.score).slice(0, 4);
  const nearby = city.nearby.map((name) => findCity(name)).filter(Boolean);

  const search = ({ city: name, checkIn, checkOut, adults, children, rooms }) => {
    try {
      localStorage.setItem(
        "hotelSearchData",
        JSON.stringify({ destination: name, checkIn: toISO(checkIn), checkOut: toISO(checkOut), adults, children, rooms })
      );
    } catch {
    }
    navigate(searchUrl({ city: name, checkIn, checkOut, adults, children, rooms }));
  };

  const goHotels = () => navigate(searchUrl({ city: city.name }));

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader initial={{ city: city.name }} onSearch={search} />

      <section className="relative">
        <img
          src={cityImage(city)}
          alt={`${city.name} skyline`}
          className="h-[320px] w-full bg-neutral-200 object-cover sm:h-[400px]"
          onError={(e) => (e.currentTarget.style.background = "#d1d5db")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1250px] px-4 pb-8 text-white lg:px-8">
          <p className="text-sm font-semibold">
            {city.region}, {city.country}
          </p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Hotels in {city.name}</h1>
          <p className="mt-2 max-w-2xl text-lg">{city.tagline}</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1250px] space-y-12 px-4 py-10 lg:px-8">
        {/* QUICK FACTS */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border p-5">
            <HotelIcon className="text-sky-600" />
            <div>
              <p className="text-2xl font-bold">{city.hotels}</p>
              <p className="text-neutral-600">hotels to compare</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border p-5">
            <Wallet className="text-sky-600" />
            <div>
              <p className="text-2xl font-bold">{rupees(city.avg)}</p>
              <p className="text-neutral-600">average price per night</p>
            </div>
          </div>
          <button
            type="button"
            onClick={goHotels}
            className="flex items-center justify-between rounded-2xl bg-sky-600 p-5 text-left text-white hover:bg-sky-700"
          >
            <span>
              <span className="block text-2xl font-bold">See all hotels</span>
              <span className="block">Compare prices from 184 sites</span>
            </span>
            <ChevronRight />
          </button>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-bold">Top-rated stays in {city.name}</h2>
            <button type="button" onClick={goHotels} className="font-bold text-sky-700 hover:underline">
              View all {hotels.length} stays
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topHotels.map((hotel) => (
              <article key={hotel.id} className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  onClick={() => navigate(`/hotel/${hotel.id}`, { state: { hotel } })}
                  onError={(e) => (e.currentTarget.style.background = "#e5e7eb")}
                  className="h-44 w-full cursor-pointer bg-neutral-200 object-cover"
                />
                <div className="p-4">
                  <h3
                    onClick={() => navigate(`/hotel/${hotel.id}`, { state: { hotel } })}
                    className="cursor-pointer truncate font-bold hover:text-sky-700 hover:underline"
                    title={hotel.name}
                  >
                    {hotel.name}
                  </h3>
                  <p className="mt-1 text-sm text-orange-500">{"★".repeat(hotel.stars)}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <span className="rounded bg-green-700 px-1.5 py-0.5 font-bold text-white">{hotel.score}</span>
                    {getLabel(hotel.score)}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">{hotel.distance} to City centre</p>
                  <p className="mt-3">
                    <span className="text-sm">From </span>
                    <span className="text-xl font-extrabold">{hotel.price}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Best time to visit {city.name}</h2>
          <p className="mt-1 text-neutral-600">
            Typical nightly prices for 3-star hotels. Pick a month to find the cheapest dates.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MONTHS.map((month) => {
              const { low, high } = monthRange(city.name, month);
              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => navigate(searchUrl({ city: city.name, month }))}
                  className="flex items-center justify-between rounded-xl border border-neutral-300 px-4 py-3 text-left hover:border-sky-500 hover:bg-sky-50"
                >
                  <span>
                    <span className="block font-bold">{month}</span>
                    <span className="block text-sm text-neutral-600">
                      {rupees(low)} - {rupees(high)}
                    </span>
                  </span>
                  <ChevronRight size={18} />
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Things to see in {city.name}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {city.places.map((place) => (
              <div key={place} className="flex items-center gap-3 rounded-xl bg-neutral-50 p-4">
                <MapPin className="shrink-0 text-pink-600" />
                <span className="font-semibold">{place}</span>
              </div>
            ))}
          </div>
        </section>

        {nearby.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold">Other places to explore</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {nearby.map((place) => (
                <button
                  key={place.name}
                  type="button"
                  onClick={() => navigate(`/destination/${slugify(place.name)}`)}
                  className="group overflow-hidden rounded-2xl text-left shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                >
                  <img
                    src={cityImage(place)}
                    alt={place.name}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.background = "#e5e7eb")}
                    className="h-40 w-full bg-neutral-200 object-cover transition group-hover:scale-105"
                  />
                  <div className="p-4">
                    <p className="text-lg font-bold">{place.name}</p>
                    <p className="text-sm text-neutral-600">
                      {place.hotels} hotels · {rupees(place.avg)} avg.
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <p className="text-sm text-neutral-500">
          Looking somewhere else? Try{" "}
          {cities
            .filter((c) => c.name !== city.name)
            .slice(0, 5)
            .map((c, i, arr) => (
              <span key={c.name}>
                <button
                  type="button"
                  onClick={() => navigate(`/destination/${slugify(c.name)}`)}
                  className="font-semibold text-sky-700 hover:underline"
                >
                  {c.name}
                </button>
                {i < arr.length - 1 ? ", " : "."}
              </span>
            ))}
        </p>
      </main>
    </div>
  );
}
