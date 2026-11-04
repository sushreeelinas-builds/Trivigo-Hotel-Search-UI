import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, MapPin, Hotel, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import SignInModal from "./SignInModal";
import MenuModal from "./MenuModal";
import { cities, findCity, TODAY } from "../data/cities";
import { allHotels } from "../data/hotels";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const shortDate = (date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

function monthDays(month) {
  const year = month.getFullYear();
  const index = month.getMonth();
  const lead = (new Date(year, index, 1).getDay() + 6) % 7;
  const total = new Date(year, index + 1, 0).getDate();
  return [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => new Date(year, index, i + 1))];
}

function CalendarPanel({ checkIn, checkOut, onPick, startMonth }) {
  const [month, setMonth] = useState(new Date(startMonth.getFullYear(), startMonth.getMonth(), 1));
  const [hover, setHover] = useState(null);

  const move = (n) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
  const canGoBack =
    month.getFullYear() > TODAY.getFullYear() ||
    (month.getFullYear() === TODAY.getFullYear() && month.getMonth() > TODAY.getMonth());

  const renderMonth = (m) => (
    <div className="w-[260px]">
      <p className="mb-3 text-center font-bold">
        {m.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
      </p>
      <div className="grid grid-cols-7 text-center text-xs text-neutral-500">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-sm">
        {monthDays(m).map((date, i) => {
          if (!date) return <span key={i} />;
          const disabled = date < TODAY;
          const isStart = sameDay(date, checkIn);
          const isEnd = sameDay(date, checkOut);
          const end = checkOut || (checkIn && hover && hover > checkIn ? hover : null);
          const inRange = checkIn && end && date > checkIn && date < end;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onPick(date)}
              onMouseEnter={() => setHover(date)}
              className={`m-0.5 h-9 rounded-lg transition ${
                isStart || isEnd
                  ? "bg-sky-600 font-bold text-white"
                  : inRange
                  ? "bg-sky-100"
                  : disabled
                  ? "cursor-not-allowed text-neutral-300"
                  : "hover:bg-neutral-100"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );

  const next = new Date(month.getFullYear(), month.getMonth() + 1, 1);

  return (
    <div className="relative flex gap-8 p-5" onMouseLeave={() => setHover(null)}>
      <button
        type="button"
        onClick={() => move(-1)}
        disabled={!canGoBack}
        aria-label="Previous month"
        className="absolute left-3 top-4 rounded-full p-1 hover:bg-neutral-100 disabled:opacity-30"
      >
        <ChevronLeft size={20} />
      </button>
      {renderMonth(month)}
      <div className="hidden sm:block">{renderMonth(next)}</div>
      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Next month"
        className="absolute right-3 top-4 rounded-full p-1 hover:bg-neutral-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}


function CounterRow({ label, hint, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-semibold">{label}</p>
        {hint && <p className="text-xs text-neutral-500">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-30"
        >
          <Minus size={16} />
        </button>
        <span className="w-5 text-center font-bold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-30"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default function SiteHeader({ initial, onSearch, children }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [query, setQuery] = useState(initial.city || "");
  const [checkIn, setCheckIn] = useState(initial.checkIn || null);
  const [checkOut, setCheckOut] = useState(initial.checkOut || null);
  const [adults, setAdults] = useState(initial.adults ?? 2);
  const [kids, setKids] = useState(initial.children ?? 0);
  const [rooms, setRooms] = useState(initial.rooms ?? 1);
  const [panel, setPanel] = useState("");

  let recent = [];
  if (panel === "dest") {
    try {
      recent = JSON.parse(localStorage.getItem("trivagoRecentSearches") || "[]");
    } catch {
      recent = [];
    }
  }

  const q = query.trim().toLowerCase();

  const cityMatches = (
    q
      ? cities.filter((c) => `${c.name} ${c.region} ${c.country}`.toLowerCase().includes(q))
      : cities.filter((c) => recent.includes(c.name)).concat(cities.filter((c) => !recent.includes(c.name)))
  ).slice(0, 6);

  const hotelMatches = q.length >= 2 ? allHotels.filter((h) => h.name.toLowerCase().includes(q)).slice(0, 3) : [];

  const dateLabel = checkIn
    ? `${shortDate(checkIn)}${checkOut ? ` - ${shortDate(checkOut)}` : ""}`
    : initial.month || "Add dates";

  const guestLabel = `${adults + kids} Guest${adults + kids > 1 ? "s" : ""}, ${rooms} Room${rooms > 1 ? "s" : ""}`;

  const pickDate = (date) => {
    if (!checkIn || checkOut || date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
    } else {
      setCheckOut(date);
      setPanel("");
    }
  };

  const runSearch = (cityName) => {
    const typed = (cityName ?? query).trim();
    if (!typed) {
      setPanel("dest");
      inputRef.current?.focus();
      return;
    }
    const exact = findCity(typed);
    const partial = exact || cityMatches[0];
    const finalCity = exact ? exact.name : partial && q ? partial.name : typed;
    setPanel("");
    onSearch({ city: finalCity, checkIn, checkOut, adults, children: kids, rooms });
  };

  const openHotel = (hotel) => {
    setPanel("");
    navigate(`/hotel/${hotel.id}`, { state: { hotel } });
  };

  const box = "border-l border-neutral-300 px-4 py-2 text-left transition hover:bg-neutral-50";

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white">
      {panel && (
        <div className="fixed inset-0 z-40" onClick={() => setPanel("")} aria-hidden="true" />
      )}

      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-4xl font-extrabold tracking-tight"
          aria-label="trivago home"
        >
          <span className="text-pink-600">tri</span>
          <span className="text-sky-600">vago</span>
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
          className="relative z-50 flex min-w-[300px] flex-1 items-stretch rounded-2xl border border-neutral-300 bg-white lg:mx-6 lg:max-w-[950px]"
        >
          <div className="relative min-w-[160px] flex-1">
            <label className="block cursor-text rounded-l-2xl px-4 py-2 hover:bg-neutral-50">
              <span className="block text-xs text-neutral-500">Destination</span>
              <span className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={query}
                  onFocus={() => setPanel("dest")}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPanel("dest");
                  }}
                  placeholder="Where to?"
                  className="w-full bg-transparent font-bold outline-none"
                  aria-label="Destination"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear destination"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                  >
                    <X size={18} />
                  </button>
                )}
              </span>
            </label>

            {panel === "dest" && (
              <div className="absolute left-0 top-full z-50 mt-2 w-[min(420px,90vw)] overflow-hidden rounded-2xl border bg-white py-2 shadow-xl">
                {cityMatches.length === 0 && hotelMatches.length === 0 && (
                  <p className="px-4 py-3 text-sm text-neutral-500">
                    No match yet. Try Jaipur, Goa or Mumbai.
                  </p>
                )}
                {cityMatches.length > 0 && (
                  <p className="px-4 pb-1 pt-2 text-xs font-semibold text-neutral-500">
                    {q ? "Cities" : "Recent and popular"}
                  </p>
                )}
                {cityMatches.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => {
                      setQuery(city.name);
                      runSearch(city.name);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-100"
                  >
                    <MapPin size={18} className="shrink-0 text-neutral-500" />
                    <span>
                      <span className="block font-semibold">{city.name}</span>
                      <span className="block text-xs text-neutral-500">
                        {city.region}, {city.country}
                      </span>
                    </span>
                  </button>
                ))}
                {hotelMatches.length > 0 && (
                  <p className="px-4 pb-1 pt-3 text-xs font-semibold text-neutral-500">Hotels</p>
                )}
                {hotelMatches.map((hotel) => (
                  <button
                    key={hotel.id}
                    type="button"
                    onClick={() => openHotel(hotel)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-100"
                  >
                    <Hotel size={18} className="shrink-0 text-neutral-500" />
                    <span>
                      <span className="block font-semibold">{hotel.name}</span>
                      <span className="block text-xs text-neutral-500">{hotel.location}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setPanel(panel === "dates" ? "" : "dates")}
              className={`h-full min-w-[170px] ${box}`}
            >
              <span className="block text-xs text-neutral-500">Check-in/out</span>
              <span className="block text-sm font-bold">{dateLabel}</span>
            </button>

            {panel === "dates" && (
              <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-2xl border bg-white shadow-xl">
                <CalendarPanel
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onPick={pickDate}
                  startMonth={checkIn || initialMonthStart(initial)}
                />
                <div className="flex items-center justify-between border-t px-5 py-3 text-sm">
                  <span className="text-neutral-600">
                    {checkIn && checkOut
                      ? `${Math.round((checkOut - checkIn) / 86400000)} night(s)`
                      : checkIn
                      ? "Now choose a check-out date"
                      : "Choose a check-in date"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckIn(null);
                      setCheckOut(null);
                    }}
                    className="font-semibold text-sky-700 hover:underline"
                  >
                    Clear dates
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setPanel(panel === "guests" ? "" : "guests")}
              className={`h-full min-w-[170px] ${box}`}
            >
              <span className="block text-xs text-neutral-500">Guests and rooms</span>
              <span className="block text-sm font-bold">{guestLabel}</span>
            </button>

            {panel === "guests" && (
              <div className="absolute right-0 top-full z-50 mt-2 w-[320px] rounded-2xl border bg-white px-5 py-3 shadow-xl">
                <CounterRow label="Adults" hint="18+ years" value={adults} min={1} max={20} onChange={setAdults} />
                <CounterRow label="Children" hint="0-17 years" value={kids} min={0} max={10} onChange={setKids} />
                <CounterRow label="Rooms" value={rooms} min={1} max={10} onChange={setRooms} />
                <button
                  type="button"
                  onClick={() => setPanel("")}
                  className="mt-2 w-full rounded-xl bg-sky-600 py-2.5 font-bold text-white hover:bg-sky-700"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            aria-label="Search"
            className="m-2 flex w-14 items-center justify-center rounded-xl bg-sky-600 text-white transition hover:bg-sky-700"
          >
            <Search size={24} />
          </button>
        </form>

        <div className="flex items-center gap-2">
          <SignInModal />
          <MenuModal />
        </div>
      </div>

      {children}
    </header>
  );
}

function initialMonthStart(initial) {
  if (initial.monthDate) return initial.monthDate;
  return TODAY;
}
