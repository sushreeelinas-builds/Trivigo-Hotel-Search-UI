
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const deals = [
  {
    id: 1,
    name: "Bambolim Beach Resort",
    location: "Panaji, India",
    score: 7.7,
    label: "Good",
    reviews: "5.4k",
    badge: { type: "lower", text: "2,630 lower than other sites" },
    provider: "Agoda",
    price: "₹4,647",
    dates: "18 Dec - 21 Dec",
    perk: "Breakfast included",
    image: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1020,q_auto,w_2000/hotelier-images/67/6c/571db4da935f70bb41a5be3ea10cb589aff4536a4b7eaa347ce4bbdd2f54.jpeg",
  },
  {
    id: 2,
    name: "Stendhal Hotel",
    location: "Rome, Italy",
    score: 8.9,
    label: "Excellent",
    reviews: "3.2k",
    badge: { type: "lower", text: "10% lower than other sites" },
    provider: "Hotel Site",
    price: "₹26,338",
    dates: "6 Nov - 9 Nov",
    perk: "Breakfast included",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTa6bIMtF9GzJew8WYqZTEYDLQOePeAFhkFH05uLwOrXE_MtPLRkwVQ7A&s=10",
  },
  {
    id: 3,
    name: "Vivanta Goa, Panaji",
    location: "Panaji, India",
    score: 9.1,
    label: "Excellent",
    reviews: "11k",
    badge: { type: "dropped", text: "Dropped ₹2,448" },
    provider: "ZenHotels.com",
    price: "₹14,844",
    dates: "9 Nov - 13 Nov",
    perk: "Breakfast included",
    image: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1020,q_auto,w_2000/hotelier-images/a0/9f/b7f7a3214cc1cf30ad306c20caefc7971cb4972c1f9d685bc931283f336a.jpeg",
  },
  {
    id: 4,
    name: "The Green Hotel",
    location: "Mysore, India",
    score: 8.1,
    label: "Very Good",
    reviews: "3.9k",
    badge: { type: "dropped", text: "Dropped ₹1,024" },
    provider: "Goibibo.com",
    price: "₹3,595",
    dates: "31 Oct - 1 Nov",
    perk: "Free cancellation",
    image: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1020,q_auto,w_2000/partner-images/46/91/40770d12241dfaa76d0f4c22a98b576421d8db4fbb1191c4dffe1f9d52e7.jpeg",
  },
  {
    id: 5,
    name: "Grand Mercure Mysore",
    location: "Mysore, India",
    score: 8.8,
    label: "Excellent",
    reviews: "26k",
    badge: { type: "lower", text: "11% less than other sites" },
    provider: "Mercure",
    price: "₹8,610",
    dates: "4 Nov - 5 Nov",
    perk: "Free cancellation",
    image: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1020,q_auto,w_2000/hotelier-images/48/9f/eca1ffac80953edb755b574a4a42eef604e10dec2b67ced2fa5de0652ee0.jpeg",
  },
  {
    id: 6,
    name: "Taj Fort Aguada Resort",
    location: "Goa, India",
    score: 9.2,
    label: "Excellent",
    reviews: "8.3k",
    badge: { type: "dropped", text: "Dropped ₹3,120" },
    provider: "MakeMyTrip",
    price: "₹18,250",
    dates: "14 Nov - 16 Nov",
    perk: "Free cancellation",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/de/65/35/taj-fort-aguada-resort.jpg?w=900&h=-1&s=1",
  },
];

const ArrowRight = ({ className = "h-5 w-5", stroke = 2.4 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 5 7 7-7 7" />
  </svg>
);

const TrendDown = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="m3 6 6 6 4-4 8 8" />
    <path d="M15 16h6v-6" />
  </svg>
);

function DealCard({ deal, onClick }) {
  const isDrop = deal.badge.type === "dropped";

  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="link"
      tabIndex={0}
      className="flex w-[290px] h-[390px] shrink-0 snap-start cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-[180px] w-full shrink-0 overflow-hidden bg-neutral-100">
        <img
          src={deal.image}
          alt={deal.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pt-1 ">
        <h3 className="truncate text-[19px] font-bold tracking-tight">
          {deal.name}
        </h3>

        <p className="mt- text-sm text-black">{deal.location}</p>

        <p className="mt-1 flex items-center gap-2 text-sm">
          <span className="rounded bg-green-700 px-2  font-bold text-white">
            {deal.score.toFixed(1)}
          </span>
          <span className="font-semibold">{deal.label}</span>
          <span className="">({deal.reviews})</span>
        </p>

        <p className="mt-1 inline-flex w-fit items-center gap-1 rounded-md bg-[#b5143c] px-2 py-1 text-xs font-bold text-white">
          {isDrop && <TrendDown />}
          {deal.badge.text}
        </p>

        <p className="mt-1 text-sm text-black">{deal.provider}</p>

        <p className="mt- flex items-baseline gap-1.5">
          <span className="text-xl font-bold">{deal.price}</span>
          <span className="text-sm text-black">per night</span>
        </p>

        <div className="mt-auto flex items-end justify-between ">
          <div className="text-xs mb-5 leading-5 text-black">
            <p>{deal.dates}</p>
            <p>{deal.perk}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            aria-label={`View deal for ${deal.name}`}
            className="flex h-9 w-9 shrink-0 mb-6 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HotDeals() {
  const scroller = useRef(null);
  const navigate = useNavigate();

  const next = () => {
    scroller.current?.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  };

  const openHotel = (hotel) => {
    const city = String(hotel.location || "").split(",")[0].trim();
    navigate(`/hotels?city=${encodeURIComponent(city)}`, {
      state: { hotel },
    });
  };

  return (
    <section
      className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-8 xl:px-0"
      aria-labelledby="hot-deals-title"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2
          id="hot-deals-title"
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          Hot hotel deals right now
        </h2>

        <button
          onClick={() => openHotel(deals[0])}
          className="flex items-center gap-2 text-sm sm:text-lg font-bold text-tv-blue hover:underline"
        >
          See more deals
          <ArrowRight />
        </button>
      </div>

      <div className="relative">
        <div
          ref={scroller}
          className="flex snap-x gap-6 overflow-x-auto scroll-smooth px-1 pb-6 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onClick={() => openHotel(deal)}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next deals"
          className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-neutral-100 md:flex"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
