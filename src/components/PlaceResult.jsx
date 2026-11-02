
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Users,
  BedDouble,
  Hotel,
  Search,
  ChevronRight,
} from "lucide-react";
import { destinations } from "./BestTimeToBook";

export default function PlaceResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const destination =
    searchParams.get("destination") || "Jaipur";

  const month =
    searchParams.get("month") || "November";

  const checkIn =
    searchParams.get("checkIn") || "";

  const checkOut =
    searchParams.get("checkOut") || "";

  const guests =
    Number(searchParams.get("guests")) || 2;

  const rooms =
    Number(searchParams.get("rooms")) || 1;

  const lowPrice =
    searchParams.get("lowPrice") || "₹1,800";

  const highPrice =
    searchParams.get("highPrice") || "₹9,500";

  const city = destinations.find(
    (item) => item.name.toLowerCase() === destination.toLowerCase()
  );

  const image = location.state?.image || city?.image;

  const formatDate = (value) => {
    if (!value) return "Not selected";

    return new Date(`${value}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const handleContinue = () => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      alert("Please select valid travel dates.");
      return;
    }

    const params = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      guests: String(guests),
      rooms: String(rooms),
    });

    navigate(`/hotel-results?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-900">

      <header className="sticky top-0 z-40 border-b bg-white px-4 py-4 shadow-sm sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold hover:text-sky-600"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <span className="text-2xl font-extrabold text-sky-600">
            trivago
          </span>

        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-sky-600">
            YOUR HOTEL SEARCH
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Your trip details
          </h1>

          <p className="mt-2 text-gray-500">
            Review your travel details before viewing available hotels.
          </p>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border bg-white shadow-sm">

          {image && (
            <img
              src={image}
              alt={destination}
              className="h-64 w-full object-cover sm:h-80"
            />
          )}

          <div className="p-5 sm:p-7">

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={18} />
              India
            </div>

            <h2 className="mt-2 text-2xl font-bold">
              {destination}
            </h2>

            <p className="mt-1 text-gray-500">
              Travel month: {month}
            </p>

          </div>
        </div>

        <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm sm:p-7">

          <h2 className="mb-6 text-xl font-bold">
            Booking information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="mt-1 font-bold">
                  {formatDate(checkIn)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="mt-1 font-bold">
                  {formatDate(checkOut)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <Users size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="mt-1 font-bold">
                  {guests} Guests
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <BedDouble size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Rooms</p>
                <p className="mt-1 font-bold">
                  {rooms} Room{rooms > 1 ? "s" : ""}
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="mb-7 rounded-2xl border bg-white p-5 shadow-sm sm:p-7">

          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <Hotel size={23} />
            </div>

            <div>
              <h2 className="font-bold">Estimated hotel prices</h2>
              <p className="text-sm text-gray-500">
                Per night in {destination}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sky-50 p-4">
            <div>
              <p className="text-sm text-gray-500">
                Expected price range
              </p>

              <p className="mt-1 text-2xl font-bold text-sky-700">
                {lowPrice} - {highPrice}
              </p>
            </div>

            <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-gray-600">
              Per night
            </span>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            These are estimated prices from the monthly destination guide.
            Final hotel prices depend on availability and selected dates.
          </p>
        </section>

        <button
          onClick={handleContinue}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#007fc5] px-6 py-4 font-bold text-white shadow-sm transition hover:bg-[#006ba8]"
        >
          <Search size={21} />
          View available hotels
          <ChevronRight size={20} />
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Compare hotel options and prices on the next page.
        </p>

      </main>
    </div>
  );
}
