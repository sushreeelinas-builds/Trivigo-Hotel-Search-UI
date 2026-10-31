import { useRef } from "react";

/* Add your own photos: put files in /public/hotels and set image: "/hotels/bloom.jpg".
   Cards without an image show a neutral placeholder. */
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
    location: "Mysore, Australia",
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}
       strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m9 5 7 7-7 7" />
  </svg>
);

const TrendDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
       strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="m3 6 6 6 4-4 8 8" />
    <path d="M15 16h6v-6" />
  </svg>
);

const ImagePlaceholder = () => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-100 via-neutral-100 to-amber-100 text-neutral-400">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
         strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12" aria-hidden="true">
      <path d="M3 20V8l9-4 9 4v12M3 20h18M9 20v-5h6v5M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  </div>
);

function DealCard({ deal }) {
  const isDrop = deal.badge.type === "dropped";
  return (
    <article className="flex w-[100px]  shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] sm:w-[290px] h-[400px]">
      <div className="h-[800px] w-full w-[50px] overflow-hidden bg-neutral-100">
        {deal.image ? (
          <img src={deal.image} alt={deal.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col px-[15px]  pt-2">
        <h3 className="truncate text-[18px] font-bold tracking-tight">{deal.name}</h3>
        <p className="mt-1.1 text-[14px]  text-black">{deal.location}</p>

        <p className="mt-2 flex items-center text-[13px]">
          <span className="rounded-full bg-green-700 px-2 py-0. text-[13px] font-bold text-white">
            {deal.score.toFixed(1)}
          </span>
          <span className="font-semibold ">{deal.label}</span>
          <span className=" text-black">({deal.reviews})</span>
        </p>

        <p
          className={`mt-2 inline-flex w-fit items-center gap- rounded-md bg-[#b5143c] px-1.5 py-0. text-[12px] font-bold text-white ${
            isDrop ? "" : ""
          }`}
        >
          {isDrop && <TrendDown />}
          {deal.badge.text}
        </p>

        <p className="mt-2 text-[12px]  text-black">{deal.provider}</p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold leading-none tracking-tight">{deal.price}</span>
          <span className="text-[13px]  text-black">per night</span>
        </p>

        <div className="mt- flex items-end justify-between gap-3">
          <div className="text-[12px] leading-6 text-black">
            <p>{deal.dates}</p>
            <p>{deal.perk}</p>
          </div>
          <button
            aria-label={`View deal for ${deal.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-white mb-2
                       transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tv-blue"
          >
            <ArrowRight className="h-4 w-4" stroke={3} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HotDeals() {
  const scroller = useRef(null);
  const next = () => scroller.current?.scrollBy({ left: 360, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-[1280px]   px-4 pb-10 sm:px-8 xl:px-0" aria-labelledby="hot-deals-title">
      <div className="mb-6 flex items-center justify-between ">
        <h2 id="hot-deals-title" className="text-3xl font-bold tracking-tight">
          Hot hotel deals right now
        </h2>
        <a href="#" className="flex items-center gap-2 text-lg font-bold text-tv-blue hover:underline">
          See more deals
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>

      <div className="relative">
        <div
          ref={scroller}
          className="flex snap-x gap-6 overflow-x-auto scroll-smooth px-1 pb-6 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {deals.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next deals"
          className="absolute right-2 top-[290px] hidden h-11 w-11 items-center justify-center rounded-lg bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                     hover:bg-neutral-100 md:flex"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}