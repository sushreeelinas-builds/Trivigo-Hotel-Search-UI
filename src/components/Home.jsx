
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUrl } from "../data/cities";

import HotDeals from "./HotDeals.jsx";
import DealsBanner from "./DealsBanner";
import BestTimeToBook from "./BestTimeToBook";
import PopularSearches from "./PopularSearches";
import DownloadApp from "./DownloadApp";
import PopularLinks from "./PopularLinks";
import Footer from "./Footer";

import LanguageCurrencyModal from "./LanguageCurrencyModal";
import SignInModal from "./SignInModal";
import MenuModal from "./MenuModal";

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
  <Icon>
    <path d="M6 6l12 12M18 6 6 18" strokeWidth="2.4" />
  </Icon>
);

const ReplayIcon = () => (
  <Icon>
    <path d="M4 12a8 8 0 1 0 3-6.2" />
    <path d="M4 4v4.5h4.5" />
  </Icon>
);

const Logo = () => (
  <a
    href="/"
    aria-label="trivago home"
    className="select-none text-[36px] font-extrabold leading-none tracking-tight"
  >
    <span className="bg-gradient-to-r from-tv-red to-tv-orange bg-clip-text text-transparent">
      tri
    </span>
    <span className="text-tv-blue">vago</span>
  </a>
);

const partners = [
  {
    name: "agoda",
    className: "text-sm font-semibold lowercase tracking-wide text-neutral-500",
  },
  {
    name: "Hotels.com",
    className: "text-lg font-bold text-neutral-700",
  },
  {
    name: "Booking.com",
    className: "text-xl font-bold tracking-tight text-neutral-700",
  },
  {
    name: "makemytrip",
    className: "text-[11px] font-semibold text-neutral-400",
  },
  {
    name: "ALL",
    className: "font-serif text-2xl font-semibold text-neutral-700",
  },
  {
    name: "Trip.com",
    className: "text-xl font-bold text-neutral-600",
  },
  {
    name: "OYO",
    className: "text-2xl font-black text-neutral-800",
  },
];


function Header() {
  return (
    <header className="relative z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-[65px] max-w-[1410px] items-center justify-between px-4 sm:px-8">
        <Logo />

        <nav className="flex items-center gap-2 sm:gap-3">
          <LanguageCurrencyModal />
          <SignInModal />
          <MenuModal />
        </nav>
      </div>
    </header>
  );
}

function SearchCard() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);

  const [checkIn, setCheckIn] = useState(new Date(2026, 10, 1));
  const [checkOut, setCheckOut] = useState(new Date(2026, 10, 3));

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(2026, 10, 1)
  );

  const [showGuests, setShowGuests] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [petFriendly, setPetFriendly] = useState(false);

  const recentDestinations = [
    {
      name: "Hotel Parle International",
      type: "Hotel",
      location: "Mumbai, India",
    },
    {
      name: "Udaipur",
      type: "City",
      location: "Rajasthan, India",
    },
    {
      name: "Mussoorie",
      type: "City",
      location: "Uttarakhand, India",
    },
    {
      name: "Mumbai",
      type: "City",
      location: "Maharashtra, India",
    },
    {
      name: "Jaipur",
      type: "City",
      location: "Rajasthan, India",
    },
    {
      name: "Panaji",
      type: "City",
      location: "Goa, India",
    },
  ];

  const filteredDestinations = recentDestinations.filter((item) =>
    `${item.name} ${item.location}`
      .toLowerCase()
      .includes(destination.toLowerCase())
  );

  const formatDate = (date) => {
    if (!date) return "Add date";

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const toLocalDate = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const sameDay = (a, b) => {
    return (
      a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const isBetween = (date) => {
    return checkIn && checkOut && date > checkIn && date < checkOut;
  };

  const changeDate = (date) => {
    if (!checkIn || checkOut || date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
    } else {
      setCheckOut(date);
    }
  };

  const changeMonth = (amount) => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + amount,
        1
      )
    );
  };

  const getCalendarDays = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const firstDay = new Date(year, monthIndex, 1);
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    const startingDay = (firstDay.getDay() + 6) % 7;

    return [
      ...Array(startingDay).fill(null),
      ...Array.from(
        { length: totalDays },
        (_, i) => new Date(year, monthIndex, i + 1)
      ),
    ];
  };

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const selectQuickDate = (type) => {
    const today = new Date(2026, 10, 1);

    let start = new Date(today);
    let end = new Date(today);

    if (type === "tomorrow") {
      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 2);
    } else if (type === "weekend") {
      start.setDate(start.getDate() + 6);
      end.setDate(start.getDate() + 2);
    } else if (type === "nextWeekend") {
      start.setDate(start.getDate() + 13);
      end.setDate(start.getDate() + 2);
    } else {
      end.setDate(end.getDate() + 2);
    }

    setCheckIn(start);
    setCheckOut(end);

    setCalendarMonth(
      new Date(start.getFullYear(), start.getMonth(), 1)
    );
  };

  const updateCount = (setter, value, minimum) => {
    setter((previous) => Math.max(minimum, previous + value));
  };

  const totalGuests = adults + children;

  const guestLabel = `${totalGuests} Guests, ${rooms} Room${rooms > 1 ? "s" : ""}`;

  const handleSearch = (e) => {
    e.preventDefault();

    if (!destination.trim()) {
      setShowDestinations(true);
      return;
    }

    if (!checkIn || !checkOut) {
      setShowCalendar(true);
      return;
    }

    const searchData = {
      destination: destination.trim(),
      checkIn: toLocalDate(checkIn),
      checkOut: toLocalDate(checkOut),
      adults,
      children,
      rooms,
      petFriendly,
    };

    localStorage.setItem(
      "hotelSearchData",
      JSON.stringify(searchData)
    );

    setShowCalendar(false);
    setShowGuests(false);
    setShowDestinations(false);

    navigate(
      searchUrl({
        city: searchData.destination,
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        adults,
        children,
        rooms,
      }),
      { state: searchData }
    );
  };

  const field =
    "flex items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-neutral-50";

  return (
    <section className="bg-gradient-to-b from-neutral-100 to-neutral-50/30 pb-14 pt-[50px]">

      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">

        <div className="relative z-20 mx-auto w-full max-w-[1410px] rounded-2xl bg-white px-5 pb-9 pt-9 shadow-[0_6px_24px_rgba(0,0,0,0.08)] sm:px-10">

          <h1 className="text-2xl font-bold tracking-tight sm:text-[34px]">
            Save up to 55% on your next hotel stay
          </h1>

          <p className="mt-2 text-lg text-neutral-800 sm:text-xl">
            We compare hotel prices from over 100 sites
          </p>

          <form
            onSubmit={handleSearch}
            className="relative mt-9 grid overflow-visible rounded-2xl border border-neutral-300 bg-white lg:grid-cols-[minmax(250px,1fr)_260px_280px_auto]"
          >
            <div className="relative min-w-0">

              <label
                className={`flex min-h-[74px] cursor-text items-center gap-4 rounded-l-2xl px-5 py-3 ${
                  showDestinations
                    ? "ring-2 ring-inset ring-tv-blue"
                    : ""
                }`}
              >

                <SearchIcon />

                <span className="flex min-w-0 flex-1 flex-col">

                  <span className="text-sm text-neutral-500">
                    Destination
                  </span>

                  <input
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setShowDestinations(true);
                    }}
                    onFocus={() => {
                      setShowDestinations(true);
                      setShowCalendar(false);
                      setShowGuests(false);
                    }}
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

              {showDestinations && (
                <div className="absolute left-0 top-[82px] z-50 max-h-[390px] w-full min-w-[310px] overflow-y-auto rounded-2xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.28)]">

                  <div className="bg-neutral-100 px-6 py-4 text-sm font-bold">
                    {destination
                      ? "Suggested destinations"
                      : "Places you recently searched"}
                  </div>

                  {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => {
                          setDestination(item.name);
                          setShowDestinations(false);
                        }}
                        className="flex w-full items-center gap-5 px-6 py-3 text-left hover:bg-neutral-100"
                      >

                        <span className="text-xl text-tv-blue">
                          {item.type === "Hotel" ? "▦" : "♧"}
                        </span>

                        <span>
                          <span className="block font-medium">
                            {item.name}
                          </span>

                          <span className="block text-sm text-neutral-500">
                            {item.type} · {item.location}
                          </span>
                        </span>

                      </button>
                    ))
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowDestinations(false)}
                      className="w-full px-6 py-5 text-left hover:bg-neutral-100"
                    >
                      Search for "{destination}"
                    </button>
                  )}

                </div>
              )}

            </div>


            <div className="relative border-t border-neutral-300 lg:border-l lg:border-t-0">

              <button
                type="button"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setShowDestinations(false);
                  setShowGuests(false);
                }}
                className={`${field} min-h-[74px] w-full ${
                  showCalendar
                    ? "ring-2 ring-inset ring-tv-blue"
                    : ""
                }`}
              >

                <CalendarIcon />

                <span className="flex flex-col">

                  <span className="text-sm text-neutral-500">
                    Check-in/out
                  </span>

                  <span className="font-bold">
                    {formatDate(checkIn)} - {formatDate(checkOut)}
                  </span>

                </span>

              </button>


              {showCalendar && (
                <div className="absolute left-1/2 top-[82px] z-50 w-[min(800px,calc(100vw-32px))] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.3)] sm:p-7">


                  <div className="mb-5 flex items-center justify-between">

                    <button
                      type="button"
                      onClick={() => changeMonth(-1)}
                      className="rounded-full p-2 text-2xl hover:bg-neutral-100"
                    >
                      ‹
                    </button>

                    <div className="grid flex-1 grid-cols-2 text-center font-bold">

                      <span>
                        {calendarMonth.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>

                      <span>
                        {new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() + 1,
                          1
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>

                    </div>

                    <button
                      type="button"
                      onClick={() => changeMonth(1)}
                      className="rounded-full p-2 text-2xl hover:bg-neutral-100"
                    >
                      ›
                    </button>

                  </div>


                  <div className="grid grid-cols-2 gap-3 sm:gap-6">

                    {[0, 1].map((offset) => {

                      const month = new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() + offset,
                        1
                      );

                      const days = getCalendarDays(month);

                      return (
                        <div key={offset} className="min-w-0">

                          <div className="mb-3 grid grid-cols-7 rounded-xl bg-neutral-100 py-3 text-center text-xs font-semibold sm:text-sm">

                            {weekdays.map((day) => (
                              <span key={day}>{day}</span>
                            ))}

                          </div>

                          <div className="grid grid-cols-7 gap-y-1 text-center">

                            {days.map((date, index) => {

                              if (!date) {
                                return (
                                  <span key={`empty-${index}`} />
                                );
                              }

                              const selected =
                                sameDay(date, checkIn) ||
                                sameDay(date, checkOut);

                              const between = isBetween(date);

                              return (
                                <button
                                  type="button"
                                  key={date.toISOString()}
                                  onClick={() => changeDate(date)}
                                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all sm:h-10 sm:w-10 ${
                                    selected
                                      ? "bg-tv-blue font-bold text-white"
                                      : between
                                      ? "bg-blue-100 text-tv-blue"
                                      : "hover:bg-neutral-200"
                                  }`}
                                >
                                  {date.getDate()}
                                </button>
                              );

                            })}

                          </div>

                        </div>
                      );

                    })}

                  </div>

                  <div className="my-5 border-t border-neutral-200" />


                  <div className="flex flex-wrap gap-2">

                    {[
                      { label: "Tonight", value: "today" },
                      { label: "Tomorrow night", value: "tomorrow" },
                      { label: "This weekend", value: "weekend" },
                      { label: "Next weekend", value: "nextWeekend" },
                    ].map((item) => (

                      <button
                        type="button"
                        key={item.value}
                        onClick={() => selectQuickDate(item.value)}
                        className="rounded-full border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-tv-blue hover:text-tv-blue sm:px-4 sm:text-sm"
                      >
                        <span className="mr-1">▣</span>
                        {item.label}
                      </button>

                    ))}

                  </div>


                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-sm text-neutral-500">
                      {formatDate(checkIn)} - {formatDate(checkOut)}
                    </span>

                    <button
                      type="button"
                      disabled={!checkIn || !checkOut}
                      onClick={() => setShowCalendar(false)}
                      className="rounded-lg bg-tv-blue px-8 py-3 font-bold text-white hover:bg-tv-blue-dark disabled:opacity-50"
                    >
                      Apply
                    </button>

                  </div>

                </div>
              )}

            </div>


            <div className="relative border-t border-neutral-300 lg:border-l lg:border-t-0">

              <button
                type="button"
                onClick={() => {
                  setShowGuests(!showGuests);
                  setShowCalendar(false);
                  setShowDestinations(false);
                }}
                className={`${field} min-h-[74px] w-full ${
                  showGuests
                    ? "ring-2 ring-inset ring-tv-blue"
                    : ""
                }`}
              >

                <GuestsIcon />

                <span className="flex flex-col">

                  <span className="text-sm text-neutral-500">
                    Guests and rooms
                  </span>

                  <span className="font-bold">
                    {guestLabel}
                  </span>

                </span>

              </button>


              {showGuests && (
                <div className="absolute right-0 top-[82px] z-50 w-[min(440px,calc(100vw-32px))] rounded-2xl bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)] sm:p-8">


                  {[
                    {
                      label: "Adults",
                      value: adults,
                      setter: setAdults,
                      min: 1,
                    },
                    {
                      label: "Children",
                      value: children,
                      setter: setChildren,
                      min: 0,
                    },
                    {
                      label: "Rooms",
                      value: rooms,
                      setter: setRooms,
                      min: 1,
                    },
                  ].map((item) => (

                    <div
                      key={item.label}
                      className="mb-6 flex items-center justify-between gap-3"
                    >

                      <span className="font-bold">
                        {item.label}
                      </span>

                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          disabled={item.value <= item.min}
                          onClick={() =>
                            updateCount(item.setter, -1, item.min)
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-tv-blue text-2xl text-tv-blue hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          −
                        </button>

                        <span className="w-10 text-center text-lg">
                          {item.value}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCount(item.setter, 1, item.min)
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-tv-blue text-2xl text-tv-blue hover:bg-blue-50"
                        >
                          +
                        </button>

                      </div>

                    </div>

                  ))}


                  <div className="border-t border-neutral-200 pt-6">

                    <label className="flex cursor-pointer items-center justify-between gap-3">

                      <span>

                        <span className="block font-bold">
                          Pet-friendly
                        </span>

                        <span className="text-sm text-neutral-600">
                          Only show stays that allow pets
                        </span>

                      </span>

                      <input
                        type="checkbox"
                        checked={petFriendly}
                        onChange={(e) =>
                          setPetFriendly(e.target.checked)
                        }
                        className="h-5 w-5 accent-tv-blue"
                      />

                    </label>

                  </div>


                  <div className="mt-7 flex items-center justify-between">

                    <button
                      type="button"
                      onClick={() => {
                        setAdults(2);
                        setChildren(0);
                        setRooms(1);
                        setPetFriendly(false);
                      }}
                      className="font-bold text-neutral-400 hover:text-neutral-700"
                    >
                      RESET
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowGuests(false)}
                      className="rounded-lg bg-tv-blue px-10 py-3 font-bold text-white hover:bg-tv-blue-dark"
                    >
                      Apply
                    </button>

                  </div>

                </div>
              )}

            </div>


            <div className="flex items-center border-t border-neutral-300 p-2 lg:border-t-0">

              <button
                type="submit"
                className="h-[54px] w-full rounded-lg bg-tv-blue px-9 text-lg font-bold text-white transition-colors hover:bg-tv-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tv-blue"
              >
                Search
              </button>

            </div>

          </form>


          <ul className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-2">

            {partners.map((p) => (
              <li key={p.name} className={p.className}>
                {p.name}
              </li>
            ))}

            <li className="text-sm text-neutral-500">
              +100 more
            </li>

          </ul>

        </div>
      </div>
    </section>
  );
}


function PromoBanner() {
  return (
    <section className="mx-auto mt-12 max-w-[1260px] px-4 pb-16 sm:px-8 xl:px-0">

      <div className="relative flex h-[340px] overflow-hidden rounded-3xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.08)]">


        <div className="w-14 bg-tv-red sm:w-[65px]" />
        <div className="w-14 bg-tv-orange sm:w-[65px]" />


        <div className="flex flex-1 items-center pl-8 sm:pl-14">

          <h2 className="max-w-xs text-3xl font-bold leading-tight tracking-tight">
            Your shortcut to finding a great deal
          </h2>

        </div>


        <div className="relative hidden w-[480px] md:block">

          <div className="absolute left-1/2 top-6 h-full w-[280px] -translate-x-1/2 rounded-t-[36px] border-[10px] border-neutral-200 bg-white">

            <p className="mt-6 text-center text-xl font-extrabold text-red-200">
              trivago
            </p>

            <div className="mt-4 h-[110px] bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 opacity-70" />

            <p className="mt-3 px-3 text-lg font-semibold text-neutral-300">
              Hotel Divitis <span className="tracking-tight">★★★</span>
            </p>

            <button
              type="button"
              className="absolute left-1/2 top-[132px] w-[205px] -translate-x-1/2 rounded-lg bg-neutral-900 py-2 text-[15px] font-semibold text-white shadow-lg"
            >
              Start searching
            </button>

          </div>


          <span className="absolute right-6 top-10 rotate-12 rounded-md bg-red-100 px-2 py-1 text-red-300">
            %
          </span>

          <span className="absolute bottom-16 right-10 -rotate-12 rounded-md bg-green-100 px-2 py-1 text-green-300">
            %
          </span>

          <span className="absolute bottom-24 left-2 rotate-[-10deg] rounded-md bg-blue-100 px-2 py-1 text-blue-300">
            %
          </span>

        </div>


        <div className="w-24 bg-tv-blue sm:w-[130px]" />


        <button
          type="button"
          aria-label="Replay animation"
          className="absolute bottom-6 right-24 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-700 text-white hover:bg-neutral-800 sm:right-[110px]"
        >
          <ReplayIcon />
        </button>

      </div>

    </section>
  );
}


export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      <main>

        <SearchCard />

        <PromoBanner />

        <HotDeals />

        <DealsBanner />

        <BestTimeToBook />

        <PopularSearches />

        <DownloadApp />

        <PopularLinks />

        <Footer />

      </main>

    </div>
  );
}
