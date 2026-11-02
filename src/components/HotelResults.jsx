import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Heart,
  Share2,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  CalendarDays,
} from "lucide-react";
import SiteHeader from "./SiteHeader";
import HotelGalleryModal from "./HotelGalleryModal";
import {
  cities,
  findCity,
  monthFactor,
  monthStart,
  MONTHS,
  TODAY,
  fromISO,
  toISO,
  searchUrl,
} from "../data/cities";
import {
  getCityHotels,
  normalizeHotel,
  formatPrice,
  parseDistance,
  getLabel,
} from "../data/hotels";

const MAX_PRICE = 100000;
const PAGE_SIZE = 8;

const EMPTY_FILTERS = {
  sort: "recommended",
  maxPrice: MAX_PRICE,
  types: [],
  minScore: 0,
  stars: [],
  facilities: [],
  breakfast: false,
  pool: false,
  ac: false,
  halfBoard: false,
  nearCentre: false,
  hotDeal: false,
  maxDistance: 0,
};

const SORT_OPTIONS = [
  ["recommended", "Recommended"],
  ["price-low", "Price: low to high"],
  ["price-high", "Price: high to low"],
  ["rating", "Guest rating"],
  ["distance", "Distance to city centre"],
];

const FACILITY_OPTIONS = [
  "Free WiFi",
  "Swimming pool",
  "Free parking",
  "Restaurant",
  "Air conditioning",
  "Breakfast included",
  "Fitness centre",
  "Room service",
];

const TYPE_OPTIONS = ["Hotel", "Resort", "Serviced apartment"];

const round5 = (n) => Math.round(n / 5) * 5;

const parseCount = (text) => {
  const value = String(text || "").toLowerCase().replace(/,/g, "");
  const number = parseFloat(value);
  if (Number.isNaN(number)) return 0;
  return Math.round(value.includes("k") ? number * 1000 : number);
};
const rupees = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function applyFilters(list, f) {
  return list.filter((h) => {
    const km = parseDistance(h.distance);
    if (h.shown > f.maxPrice) return false;
    if (f.types.length && !f.types.includes(h.type)) return false;
    if (h.score < f.minScore) return false;
    if (f.stars.length && !f.stars.includes(h.stars)) return false;
    if (f.breakfast && !h.breakfast) return false;
    if (f.pool && !h.pool) return false;
    if (f.ac && !h.facilities.includes("Air conditioning")) return false;
    if (f.halfBoard && !h.halfBoard) return false;
    if (f.nearCentre && km > 3) return false;
    if (f.hotDeal && !h.hotDeal) return false;
    if (f.maxDistance && km > f.maxDistance) return false;
    return f.facilities.every(
      (x) =>
        h.facilities.includes(x) ||
        (x === "Breakfast included" && h.breakfast) ||
        (x === "Swimming pool" && h.pool)
    );
  });
}

function sortList(list, sort) {
  const out = [...list];
  if (sort === "price-low") out.sort((a, b) => a.shown - b.shown);
  if (sort === "price-high") out.sort((a, b) => b.shown - a.shown);
  if (sort === "rating") out.sort((a, b) => b.score - a.score);
  if (sort === "distance") out.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
  return out;
}

const countActive = (f) =>
  (f.sort !== "recommended" ? 1 : 0) +
  (f.maxPrice < MAX_PRICE ? 1 : 0) +
  f.types.length +
  (f.minScore ? 1 : 0) +
  f.stars.length +
  f.facilities.length +
  ["breakfast", "pool", "ac", "halfBoard", "nearCentre", "hotDeal"].filter((k) => f[k]).length +
  (f.maxDistance ? 1 : 0);


function seededNoise(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function DatePriceChart({ cityName, basePrice, month, initialStart, onApply }) {
  const [open, setOpen] = useState(true);
  const [start, setStart] = useState(initialStart);
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [hint, setHint] = useState("");

  const days = useMemo(
    () => Array.from({ length: 23 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)),
    [start]
  );

  const priceOf = (d) => {
    const weekday = d.getDay();
    const weekend = weekday === 5 || weekday === 6 ? 1.3 : weekday === 0 ? 1.1 : 1;
    const noise = 0.85 + seededNoise(d.getTime() / 86400000) * 0.4;
    return round5(basePrice * monthFactor(cityName, MONTHS[d.getMonth()]) * weekend * noise);
  };

  const prices = days.map(priceOf);
  const max = Math.max(...prices);
  const cheapest = Math.min(...prices);

  const shift = (n) => {
    const next = new Date(start.getFullYear(), start.getMonth(), start.getDate() + n);
    setStart(next < TODAY ? TODAY : next);
  };

  const pick = (d) => {
    if (d < TODAY) return;
    setHint("");
    if (!inDate || outDate || d <= inDate) {
      setInDate(d);
      setOutDate(null);
    } else {
      setOutDate(d);
    }
  };

  const fmt = (d) => (d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "");

  return (
    <section className="rounded-2xl bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
          <CalendarDays />
        </span>
        <span className="flex-1">
          <span className="block text-xl font-bold">Find the best dates to go</span>
          <span className="block text-neutral-600">
            Based on lowest prices on trivago from the last 7 days
          </span>
        </span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="flex">
            <div className="flex w-16 shrink-0 flex-col justify-between pb-14 pt-1 text-xs text-neutral-600">
              <span>{rupees(max)}</span>
              <span>{rupees(Math.round(max / 2))}</span>
              <span>₹0</span>
            </div>

            <div className="flex flex-1 items-end gap-2">
              <button
                type="button"
                onClick={() => shift(-7)}
                aria-label="Earlier dates"
                className="mb-1 self-center rounded-full p-1 hover:bg-neutral-100"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="grid flex-1 grid-cols-[repeat(23,minmax(0,1fr))] gap-1">
                {days.map((d, i) => {
                  const selected =
                    (inDate && d.getTime() === inDate.getTime()) || (outDate && d.getTime() === outDate.getTime());
                  const inRange = inDate && outDate && d > inDate && d < outDate;
                  const past = d < TODAY;
                  const low = prices[i] === cheapest;
                  const height = Math.max(6, Math.round((prices[i] / max) * 110));
                  const monthLabel =
                    i === 0 || d.getDate() === 1 ? d.toLocaleDateString("en-GB", { month: "long" }) : "";
                  return (
                    <button
                      key={d.getTime()}
                      type="button"
                      disabled={past}
                      onClick={() => pick(d)}
                      title={`${d.toDateString()} · from ${rupees(prices[i])}`}
                      className="group flex flex-col items-center text-xs disabled:opacity-40"
                    >
                      <span className="flex h-[120px] w-full items-end">
                        <span
                          style={{ height }}
                          className={`w-full rounded-t ${
                            selected
                              ? "bg-sky-600"
                              : inRange
                              ? "bg-sky-300"
                              : low
                              ? "bg-green-500"
                              : "bg-sky-200 group-hover:bg-sky-400"
                          }`}
                        />
                      </span>
                      <span className="mt-1 text-neutral-500">
                        {d.toLocaleDateString("en-GB", { weekday: "short" }).slice(0, 2)}
                      </span>
                      <span className={selected ? "font-bold text-sky-700" : "font-semibold"}>
                        {String(d.getDate()).padStart(2, "0")}
                      </span>
                      <span className="h-4 whitespace-nowrap text-[11px] text-neutral-600">{monthLabel}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => shift(7)}
                aria-label="Later dates"
                className="mb-1 self-center rounded-full p-1 hover:bg-neutral-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            Green bar = cheapest day in view ({rupees(cheapest)}). Pick a check-in day, then a check-out day.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-neutral-50 p-4">
            <div className="flex flex-wrap gap-6 text-lg">
              <span className="flex items-center gap-2">
                <CalendarDays size={20} /> {inDate ? fmt(inDate) : "Check-in"}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays size={20} /> {outDate ? fmt(outDate) : "Check-out"}
              </span>
              {!inDate && <span className="text-sm text-neutral-500">Showing {month}</span>}
            </div>
            <div className="flex items-center gap-3">
              {hint && <span className="text-sm text-red-600">{hint}</span>}
              <button
                type="button"
                onClick={() => {
                  if (!inDate || !outDate) {
                    setHint("Choose check-in and check-out first");
                    return;
                  }
                  onApply(inDate, outDate);
                }}
                className="flex items-center gap-2 rounded-xl border border-black px-5 py-2.5 font-bold hover:bg-black hover:text-white"
              >
                Select dates <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FiltersModal({ filters, hotels, onApply, onClose }) {
  const [draft, setDraft] = useState(filters);
  const count = applyFilters(hotels, draft).length;

  const toggleIn = (key, value) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((x) => x !== value) : [...d[key], value],
    }));

  const pill = (on) =>
    `rounded-full border px-4 py-2 text-sm font-semibold ${
      on ? "border-sky-600 bg-sky-50 text-sky-700" : "border-neutral-300"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">All filters</h2>
          <button type="button" onClick={onClose} aria-label="Close filters">
            <X />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-5">
          <fieldset>
            <legend className="mb-2 font-bold">Property type</legend>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((t) => (
                <button type="button" key={t} onClick={() => toggleIn("types", t)} className={pill(draft.types.includes(t))}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-bold">Star rating</legend>
            <div className="flex gap-2">
              {[3, 4, 5].map((s) => (
                <button type="button" key={s} onClick={() => toggleIn("stars", s)} className={pill(draft.stars.includes(s))}>
                  {s} ★
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-bold">Guest rating</legend>
            <div className="flex flex-wrap gap-2">
              {[
                [0, "Any"],
                [7, "7.0+"],
                [8, "8.0+"],
                [9, "9.0+"],
              ].map(([v, label]) => (
                <button type="button" key={v} onClick={() => setDraft((d) => ({ ...d, minScore: v }))} className={pill(draft.minScore === v)}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-bold">Facilities</legend>
            <div className="grid grid-cols-2 gap-2">
              {FACILITY_OPTIONS.map((x) => (
                <label key={x} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={draft.facilities.includes(x)}
                    onChange={() => toggleIn("facilities", x)}
                    className="h-4 w-4 accent-sky-600"
                  />
                  {x}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-bold">Maximum price per night: {rupees(draft.maxPrice)}</legend>
            <input
              type="range"
              min="1000"
              max={MAX_PRICE}
              step="1000"
              value={draft.maxPrice}
              onChange={(e) => setDraft((d) => ({ ...d, maxPrice: Number(e.target.value) }))}
              className="w-full accent-sky-600"
            />
          </fieldset>
        </div>

        <div className="flex items-center justify-between border-t p-5">
          <button type="button" onClick={() => setDraft({ ...EMPTY_FILTERS, sort: draft.sort })} className="font-bold underline">
            Clear all
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="rounded-xl bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
          >
            Show {count} hotel{count === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>
  );
}


function HotelCard({ hotel, isFavorite, onFavorite, onShare, onOpen, onGallery }) {
  return (
    <article
      id={`hotel-${hotel.id}`}
      className="grid gap-2 rounded-2xl bg-white p-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition md:grid-cols-[278px_minmax(0,1fr)_minmax(260px,400px)]"
    >
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          onClick={onGallery}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onGallery()}
          role="button"
          tabIndex={0}
          title="View photos"
          onError={(e) => (e.currentTarget.style.background = "#e5e7eb")}
          className="h-52 w-full cursor-pointer rounded-xl object-cover md:h-full md:min-h-[188px]"
        />
        {hotel.popular && (
          <span className="absolute left-0 top-0 rounded-br-lg rounded-tl-xl bg-sky-600 px-2 py-0.5 text-xs font-bold text-white">
            Popular choice
          </span>
        )}
        <div className="absolute right-3 top-3 flex items-center gap-3 rounded-full bg-black/60 px-3 py-2 text-white">
          <button type="button" onClick={onShare} aria-label="Share hotel">
            <Share2 size={18} />
          </button>
          <button type="button" onClick={onFavorite} aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}>
            <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
          </button>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-center px-2 py-2">
        <div className="flex flex-wrap items-center gap-x-2">
          <h2
            onClick={onOpen}
            className="cursor-pointer truncate text-xl font-bold hover:text-sky-700 hover:underline"
            title={hotel.name}
          >
            {hotel.name}
          </h2>
          <span className="text-sm tracking-wider text-orange-500" aria-label={`${hotel.stars} stars`}>
            {"★".repeat(hotel.stars)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-green-700 px-2 py-0.5 text-sm font-bold text-white">{hotel.score}</span>
          <span className="font-semibold">{getLabel(hotel.score)}</span>
          <span className="text-neutral-600">({hotel.reviews} ratings)</span>
        </div>

        <p className="mt-3 flex items-center gap-2 text-neutral-700">
          <MapPin size={17} /> {hotel.distance} to City centre
        </p>
        <p className="mt-2 flex items-start gap-2 text-neutral-700">
          <Sparkles size={17} className="mt-1 shrink-0" /> <span>{hotel.description}</span>
        </p>
      </div>

      <div className="flex min-h-[150px] flex-col justify-between rounded-xl bg-sky-50 p-4">
        <p>
          See prices from <strong>{hotel.sites} sites</strong>
        </p>
        <div className="flex items-end justify-between gap-3">
          <p>
            <span className="text-sm">From </span>
            <span className="text-2xl font-extrabold">{rupees(hotel.shown)}</span>
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-1 rounded-lg bg-sky-600 px-5 py-2.5 font-bold text-white hover:bg-sky-700"
          >
            See prices <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HotelResults() {
  const { state } = useLocation();
  const [params] = useSearchParams();
  const key = [
    params.get("city") || state?.destination || state?.hotel?.location || "",
    params.get("month") || "",
    params.get("checkIn") ? "dated" : "",
  ].join("|");
  return <ResultsPage key={key} />;
}

function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();

  const hasCityParam = Boolean(params.get("city"));
  const cityParam = params.get("city") || state?.destination || state?.hotel?.location?.split(",")[0].trim() || "";
  const checkIn = fromISO(params.get("checkIn") || (hasCityParam ? "" : state?.checkIn));
  const checkOut = fromISO(params.get("checkOut") || (hasCityParam ? "" : state?.checkOut));
  const month = params.get("month") || "";
  const adults = Number(params.get("adults") || state?.adults || 2);
  const kids = Number(params.get("children") || state?.children || 0);
  const rooms = Number(params.get("rooms") || state?.rooms || 1);

  const cityObj = findCity(cityParam);
  const cityName = cityObj?.name || cityParam;
  const monthMode = Boolean(month) && !checkIn;
  const activeMonth = monthMode ? month : checkIn ? MONTHS[checkIn.getMonth()] : "";

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [panel, setPanel] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [galleryHotel, setGalleryHotel] = useState(null);
  const [toast, setToast] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("trivagoFavorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("trivagoFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const pickedHotel = state?.hotel;
  const priced = (() => {
    const factor = monthFactor(cityName, activeMonth);
    let list = getCityHotels(cityName);
    if (pickedHotel && pickedHotel.location?.split(",")[0].trim().toLowerCase() === cityName.toLowerCase()) {
      list = [normalizeHotel(pickedHotel), ...list.filter((h) => h.name !== pickedHotel.name)];
    }
    return list.map((h) => ({ ...h, shown: round5(formatPrice(h.price) * factor) }));
  })();

  const filtered = sortList(applyFilters(priced, filters), filters.sort);
  const shownHotels = filtered.slice(0, visible);
  const cheapest = priced.length ? Math.min(...priced.map((h) => formatPrice(h.price))) : 3000;

  const activeCount = countActive(filters);
  const setF = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const toggleList = (key, value) =>
    setF({ [key]: filters[key].includes(value) ? filters[key].filter((x) => x !== value) : [...filters[key], value] });

  const search = ({ city, checkIn: ci, checkOut: co, adults: a, children: c, rooms: r }) => {
    const found = findCity(city);
    const name = found?.name || city;
    try {
      const recent = JSON.parse(localStorage.getItem("trivagoRecentSearches") || "[]");
      localStorage.setItem("trivagoRecentSearches", JSON.stringify([name, ...recent.filter((x) => x !== name)].slice(0, 6)));
      localStorage.setItem(
        "hotelSearchData",
        JSON.stringify({ destination: name, checkIn: toISO(ci), checkOut: toISO(co), adults: a, children: c, rooms: r })
      );
    } catch {
    }
    navigate(searchUrl({ city: name, checkIn: ci, checkOut: co, month: ci ? "" : month, adults: a, children: c, rooms: r }));
  };

  const openHotel = (hotel) => {
    try {
      const recent = JSON.parse(localStorage.getItem("trivagoRecent") || "[]");
      localStorage.setItem("trivagoRecent", JSON.stringify([hotel, ...recent.filter((h) => h.id !== hotel.id)].slice(0, 12)));
    } catch {
    }
    const { shown, ...rest } = hotel;
    navigate(`/hotel/${hotel.id}`, {
      state: {
        hotel: { ...rest, price: rupees(shown) },
        checkIn: checkIn ? toISO(checkIn) : undefined,
        checkOut: checkOut ? toISO(checkOut) : undefined,
        guests: adults + kids,
        rooms,
      },
    });
  };

  const toggleFavorite = (hotel) => {
    const { shown, ...rest } = hotel;
    setFavorites((prev) =>
      prev.some((h) => h.id === hotel.id) ? prev.filter((h) => h.id !== hotel.id) : [...prev, { ...rest, price: rupees(shown) }]
    );
  };

  const share = async (hotel) => {
    const url = `${window.location.origin}/hotel/${hotel.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: hotel.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setToast("Link copied to clipboard");
      }
    } catch {
      setToast("Could not share this hotel");
    }
  };

  const applyDates = (ci, co) =>
    navigate(searchUrl({ city: cityName, checkIn: ci, checkOut: co, adults, children: kids, rooms }));

  const initialHeader = {
    city: cityName,
    checkIn,
    checkOut,
    month: monthMode ? month : "",
    monthDate: monthMode ? monthStart(month) : null,
    adults,
    children: kids,
    rooms,
  };

  const chipClass = (on) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      on ? "border-sky-600 bg-sky-50 text-sky-700" : "border-neutral-300 bg-white hover:border-neutral-600"
    }`;

  const panelChip = (name, active) => (
    <button
      key={name}
      type="button"
      onClick={() => setPanel(panel === name ? "" : name)}
      aria-expanded={panel === name}
      className={`${chipClass(active || panel === name)} flex items-center gap-2`}
    >
      {name} <ChevronDown size={16} className={panel === name ? "rotate-180" : ""} />
    </button>
  );

  const toggleChip = (label, on, onClick) => (
    <button key={label} type="button" aria-pressed={on} onClick={onClick} className={chipClass(on)}>
      {label}
    </button>
  );

  const chartStart = (() => {
    if (!monthMode) return TODAY;
    const first = monthStart(month);
    const s = new Date(first.getFullYear(), first.getMonth(), first.getDate() - 18);
    return s < TODAY ? TODAY : s;
  })();


  return (
    <div className="min-h-screen bg-[#f6f6f6] text-neutral-900">
      <SiteHeader
        key={`${cityName}|${month}|${params.get("checkIn")}|${params.get("checkOut")}|${adults}|${kids}|${rooms}`}
        initial={initialHeader}
        onSearch={search}
      >
        <div className="mx-auto flex max-w-[1800px] items-center gap-2 px-4 pb-3 lg:px-8">
          <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-neutral-800 px-4 py-2 text-sm font-semibold"
            >
              <SlidersHorizontal size={18} /> Filters{activeCount > 0 && ` (${activeCount})`}
            </button>

            {panelChip("Sort by", filters.sort !== "recommended")}
            {panelChip("Price", filters.maxPrice < MAX_PRICE)}
            {panelChip("Location", filters.maxDistance > 0)}

            {toggleChip("Hot deals", filters.hotDeal, () => setF({ hotDeal: !filters.hotDeal }))}
            {toggleChip("Hotels", filters.types.includes("Hotel"), () => toggleList("types", "Hotel"))}
            {toggleChip("Rating: 8.0+", filters.minScore >= 8, () => setF({ minScore: filters.minScore >= 8 ? 0 : 8 }))}
            {toggleChip("Near city centre", filters.nearCentre, () => setF({ nearCentre: !filters.nearCentre }))}
            {toggleChip("Breakfast included", filters.breakfast, () => setF({ breakfast: !filters.breakfast }))}
            {toggleChip("Resort", filters.types.includes("Resort"), () => toggleList("types", "Resort"))}
            {toggleChip("Pool", filters.pool, () => setF({ pool: !filters.pool }))}
            {toggleChip("Serviced apartment", filters.types.includes("Serviced apartment"), () =>
              toggleList("types", "Serviced apartment")
            )}
            {toggleChip("Air conditioning", filters.ac, () => setF({ ac: !filters.ac }))}
            {toggleChip("Half board", filters.halfBoard, () => setF({ halfBoard: !filters.halfBoard }))}
          </div>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="hidden shrink-0 text-sm font-bold text-sky-700 underline sm:block"
            >
              Clear all
            </button>
          )}

        </div>

        {panel && (
          <div className="mx-auto max-w-[1800px] px-4 pb-4 lg:px-8">
            <div className="w-full max-w-sm rounded-xl border bg-white p-4 shadow-lg">
              {panel === "Sort by" && (
                <div role="radiogroup" aria-label="Sort hotels" className="space-y-1">
                  {SORT_OPTIONS.map(([value, label]) => (
                    <label key={value} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-neutral-100">
                      <input
                        type="radio"
                        name="sort"
                        checked={filters.sort === value}
                        onChange={() => {
                          setF({ sort: value });
                          setPanel("");
                        }}
                        className="accent-sky-600"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              )}

              {panel === "Price" && (
                <div>
                  <label className="font-semibold">Maximum price per night: {rupees(filters.maxPrice)}</label>
                  <input
                    type="range"
                    min="1000"
                    max={MAX_PRICE}
                    step="1000"
                    value={filters.maxPrice}
                    onChange={(e) => setF({ maxPrice: Number(e.target.value) })}
                    className="mt-3 w-full accent-sky-600"
                  />
                  <button type="button" onClick={() => setF({ maxPrice: MAX_PRICE })} className="mt-2 text-sm font-bold text-sky-700 underline">
                    Reset price
                  </button>
                </div>
              )}

              {panel === "Location" && (
                <div role="radiogroup" aria-label="Distance to city centre" className="space-y-1">
                  <p className="mb-1 font-semibold">Distance to city centre</p>
                  {[
                    [0, "Any distance"],
                    [2, "Within 2 km"],
                    [5, "Within 5 km"],
                    [10, "Within 10 km"],
                  ].map(([km, label]) => (
                    <label key={km} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-neutral-100">
                      <input
                        type="radio"
                        name="distance"
                        checked={filters.maxDistance === km}
                        onChange={() => {
                          setF({ maxDistance: km });
                          setPanel("");
                        }}
                        className="accent-sky-600"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </SiteHeader>

      <main className="mx-auto max-w-[1250px] px-4 py-6 lg:px-8">
        {!cityName || (!cityObj && priced.length === 0) ? (
          <NotFound query={cityName} onPick={(name) => navigate(searchUrl({ city: name, adults, children: kids, rooms }))} />
        ) : (
          <div>
            <div className="space-y-4">
              {monthMode ? (
                <div>
                  <p className="text-lg">
                    We found <strong>{cityObj?.hotels || priced.length}</strong> hotels from 184 sites
                  </p>
                  <h1 className="text-2xl font-bold">More stays you may like in {cityName}</h1>
                </div>
              ) : (
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h1 className="text-2xl font-bold">
                    Hotels in {cityName}
                    {cityObj ? ` (${cityObj.region}, ${cityObj.country})` : ""}
                  </h1>
                  <p className="text-sm text-neutral-500">
                    {filtered.length} of {priced.length} stays
                  </p>
                </div>
              )}

              {monthMode && (
                <DatePriceChart
                  key={`${cityName}-${month}`}
                  cityName={cityName}
                  basePrice={cheapest}
                  month={month}
                  initialStart={chartStart}
                  onApply={applyDates}
                />
              )}

              {shownHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                                  isFavorite={favorites.some((h) => h.id === hotel.id)}
                  onFavorite={() => toggleFavorite(hotel)}
                  onShare={() => share(hotel)}
                  onOpen={() => openHotel(hotel)}
                  onGallery={() => setGalleryHotel(hotel)}
                />
              ))}

              {filtered.length === 0 && (
                <div className="rounded-2xl bg-white p-10 text-center">
                  <h2 className="text-xl font-bold">No hotels match your filters</h2>
                  <p className="mt-2 text-neutral-600">Try removing a filter to see more stays in {cityName}.</p>
                  <button
                    type="button"
                    onClick={() => setFilters(EMPTY_FILTERS)}
                    className="mt-4 rounded-xl bg-sky-600 px-6 py-3 font-bold text-white hover:bg-sky-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {filtered.length > visible && (
                <button
                  type="button"
                  onClick={() => setVisible(visible + PAGE_SIZE)}
                  className="mx-auto block rounded-xl border border-neutral-800 bg-white px-6 py-3 font-bold hover:bg-neutral-100"
                >
                  Show more hotels ({filtered.length - visible} left)
                </button>
              )}

              {cityObj && (
                <div className="pt-4">
                  <h2 className="mb-3 text-lg font-bold">Explore nearby destinations</h2>
                  <div className="flex flex-wrap gap-2">
                    {cityObj.nearby.filter((n) => findCity(n)).map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() =>
                          navigate(
                            searchUrl({ city: name, checkIn, checkOut, month: checkIn ? "" : month, adults, children: kids, rooms })
                          )
                        }
                        className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold hover:border-neutral-700"
                      >
                        {name}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => navigate(`/destination/${cityObj.name.toLowerCase()}`)}
                      className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      About {cityObj.name}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <FiltersModal
          filters={filters}
          hotels={priced}
          onClose={() => setShowModal(false)}
          onApply={(draft) => {
            setFilters(draft);
            setShowModal(false);
            setVisible(PAGE_SIZE);
          }}
        />
      )}

      {galleryHotel && (
        <HotelGalleryModal
          hotel={{
            ...galleryHotel,
            price: rupees(galleryHotel.shown),
            checkIn: checkIn ? toISO(checkIn) : undefined,
            checkOut: checkOut ? toISO(checkOut) : undefined,
            reviewCount: parseCount(galleryHotel.reviews),
            amenities: galleryHotel.facilities,
          }}
          isFavorite={favorites.some((h) => h.id === galleryHotel.id)}
          onFavorite={() => toggleFavorite(galleryHotel)}
          onClose={() => setGalleryHotel(null)}
        />
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function NotFound({ query, onPick }) {
  return (
    <div className="rounded-2xl bg-white p-10 text-center">
      <h1 className="text-2xl font-bold">
        {query ? `We couldn't find hotels in “${query}”` : "Where would you like to stay?"}
      </h1>
      <p className="mt-2 text-neutral-600">Check the spelling or pick one of these popular destinations.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {cities.slice(0, 12).map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => onPick(c.name)}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold hover:border-neutral-700"
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}