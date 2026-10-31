import { useState } from "react";
import HotDeals from "./HotDeals.jsx";
import DealsBanner from "./DealsBanner";
import BestTimeToBook from "./BestTimeToBook";
import PopularSearches from "./PopularSearches";
import DownloadApp from "./DownloadApp";
import PopularLinks from "./PopularLinks";
import Footer from "./Footer";




/* ---------- small inline icons ---------- */
const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const GlobeIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </Icon>
);
const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.2 18.2c1.4-2 3.3-3 5.8-3s4.4 1 5.8 3" />
  </Icon>
);
const MenuIcon = () => (
  <Icon>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);
const SearchIcon = () => (
  <Icon className="h-7 w-7">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </Icon>
);
const CalendarIcon = () => (
  <Icon className="h-6 w-6">
    <rect x="3" y="5" width="18" height="15" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
    <circle cx="7.5" cy="14.5" r=".6" fill="currentColor" />
  </Icon>
);
const GuestsIcon = () => (
  <Icon className="h-6 w-6">
    <circle cx="9" cy="9" r="3" />
    <path d="M3 19c.6-3 2.6-4.5 6-4.5s5.4 1.5 6 4.5" />
    <path d="M16 6.2a3 3 0 0 1 0 5.6M18 14.8c1.7.6 2.7 2 3 4.2" />
  </Icon>
);
const CloseIcon = () => (
  <Icon className="h-5 w-5">
    <path d="M6 6l12 12M18 6 6 18" strokeWidth="2.4" />
  </Icon>
);
const ReplayIcon = () => (
  <Icon className="h-5 w-5">
    <path d="M4 12a8 8 0 1 0 3-6.2" />
    <path d="M4 4v4.5h4.5" />
  </Icon>
);

/* ---------- logo ---------- */
const Logo = () => (
  <a href="/" aria-label="trivago home" className="select-none text-[38px] font-extrabold leading-none tracking-tight mx-30">
    <span className="bg-gradient-to-r from-tv-red to-tv-orange bg-clip-text  text-transparent">tri</span>
    <span className="text-tv-blue ">vago</span>
  </a>
);

/* ---------- partner sites row ---------- */
const partners = [
  { name: "agoda", className: "text-sm font-semibold lowercase tracking-wide text-neutral-500" },
  { name: "Hotels.com", className: "text-lg font-bold text-neutral-700" },
  { name: "Booking.com", className: "text-xl font-bold tracking-tight text-neutral-700" },
  { name: "makemytrip", className: "text-[11px] font-semibold text-neutral-400" },
  { name: "ALL", className: "font-serif text-2xl font-semibold text-neutral-700" },
  { name: "Trip.com", className: "text-xl font-bold text-neutral-600" },
  { name: "OYO", className: "text-2xl font-black text-neutral-800" },
];

/* ---------- header ---------- */
function Header() {
  const btn =
    "flex h-11 items-center gap-2 rounded-lg border border-neutral-800 bg-white px-4 text-[15px] font-semibold " +
    "transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tv-blue";
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between px-4 sm:px-8 xl:px-0 xl:max-w-[1600px]">
        <Logo />
        <nav className="flex items-center gap-3 mr-30 ">
          <button className={btn}>
            <GlobeIcon />
            <span>EN · ₹</span>
          </button>
          <button className={`${btn} hidden sm:flex`}>
            <UserIcon />
            <span>Sign in</span>
          </button>
          <button className={btn}>
            <MenuIcon />
            <span className="hidden sm:inline">Menu</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ---------- search card ---------- */
function SearchCard() {
  const [destination, setDestination] = useState("Panaji");

  const field =
    "flex items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-tv-blue";

  return (
    <section className="bg-gradient-to-b from-neutral-100 to-neutral-50/30 pb-14  pt-[58px]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 xl:px-0">
        <div className="rounded-2xl bg-white w-320 px-5 mx-30 pb-9 pt-10 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:px-11">
          <h1 className="text-3xl font-bold tracking-tight sm:text-[34px]">
            Save up to 55% on your next hotel stay
          </h1>
          <p className="mt-2 text-xl text-neutral-800">We compare hotel prices from over 100 sites</p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-9 grid overflow-hidden rounded-2xl border border-neutral-300 bg-white
                       lg:grid-cols-[1fr_262px_auto_auto]"
          >
            {/* Destination */}
            <label className="flex items-center gap-4 px-5 py-3 focus-within:bg-neutral-50">
              <SearchIcon />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm text-neutral-600">Destination</span>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to?"
                  className="w-full bg-transparent text-base font-semibold outline-none placeholder:font-normal"
                />
              </span>
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination("")}
                  aria-label="Clear destination"
                  className="rounded-full p-1 hover:bg-neutral-200"
                >
                  <CloseIcon />
                </button>
              )}
            </label>

            {/* Dates */}
            <button
              type="button"
              className={`${field} border-t border-neutral-300 lg:border-l lg:border-t-0`}
            >
              <CalendarIcon />
              <span className="flex flex-col">
                <span className="text-sm text-neutral-600">Check-in/out</span>
                <span className="font-semibold">7 Nov - 8 Nov</span>
              </span>
            </button>

            {/* Guests */}
            <button
              type="button"
              className={`${field} border-t border-neutral-300 lg:pr-2 lg:border-l lg:border-t-0`}
            >
              <GuestsIcon />
              <span className="flex flex-col">
                <span className="text-sm text-neutral-600">Guests and rooms</span>
                <span className="font-semibold">2 Guests, 1 Room</span>
              </span>
            </button>

            {/* Submit */}
            <div className="flex items-center border-t border-neutral-300 p-2 lg:border-t-0">
              <button
                type="submit"
                className="h-[46px] w-full rounded-lg bg-tv-blue px-10 text-lg font-bold text-white transition-colors
                           hover:bg-tv-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tv-blue lg:w-auto"
              >
                Search
              </button>
            </div>
          </form>

          {/* Partners */}
          <ul className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-2">
            {partners.map((p) => (
              <li key={p.name} className={p.className}>
                {p.name}
              </li>
            ))}
            <li className="text-sm text-neutral-500">+100 more</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- promo banner ---------- */
function PromoBanner() {
  return (
    <section className="mx-auto mt-12 max-w-[1260px] px-4 pb-16 sm:px-8 xl:px-0 bg-white">
      <div className="relative flex h-[340px] overflow-hidden rounded-3xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
        {/* colour stripes */}
        <div className="w-14 bg-tv-red sm:w-[65px]" />
        <div className="w-14 bg-tv-orange sm:w-[65px]" />

        {/* copy */}
        <div className="flex flex-1 items-center pl-8 sm:pl-14">
          <h2 className="max-w-xs text-3xl font-bold leading-tight tracking-tight">
            Your shortcut to finding a great deal
          </h2>
        </div>

        {/* phone mock-up */}
        <div className="relative hidden w-[480px] md:block">
          <div className="absolute left-1/2 top-6 h-full w-[280px] -translate-x-1/2 rounded-t-[36px] border-[10px] border-neutral-200 bg-white">
            <p className="mt-6 text-center text-xl font-extrabold text-red-200">trivago</p>
            <div className="mt-4 h-[110px] bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 opacity-70" />
            <p className="mt-3 px-3 text-lg font-semibold text-neutral-300">
              Hotel Divitis <span className="tracking-tight">★★★</span>
            </p>
            <button className="absolute left-1/2 top-[132px] w-[205px] -translate-x-1/2 rounded-lg bg-neutral-900 py-2 text-[15px] font-semibold text-white shadow-lg">
              Start searching
            </button>
          </div>

          {/* floating deal tags */}
          <span className="absolute right-6 top-10 rotate-12 rounded-md bg-red-100 px-2 py-1 text-red-300">%</span>
          <span className="absolute bottom-16 right-10 -rotate-12 rounded-md bg-green-100 px-2 py-1 text-green-300">%</span>
          <span className="absolute bottom-24 left-2 rotate-[-10deg] rounded-md bg-blue-100 px-2 py-1 text-blue-300">%</span>
        </div>

        {/* right blue panel */}
        <div className="w-24 bg-tv-blue sm:w-[130px]" />

        {/* replay */}
        <button
          aria-label="Replay animation"
          className="absolute bottom-6 right-24 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-700 text-white
                     hover:bg-neutral-800 sm:right-[110px]"
        >
          <ReplayIcon />
        </button>
      </div>
    </section>
  );
}

/* ---------- page ---------- */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <SearchCard />
        <PromoBanner />
         <HotDeals />
           <DealsBanner />
           <BestTimeToBook/>
           <PopularSearches/>
           <DownloadApp/>
           <PopularLinks/>
           <Footer/>
      </main>
    </div>
  );
}