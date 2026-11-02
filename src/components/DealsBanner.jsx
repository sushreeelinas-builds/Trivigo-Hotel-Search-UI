import { useNavigate } from "react-router-dom";
import { Percent, ChevronRight } from "lucide-react";
import { searchUrl, findCity, fromISO, TODAY } from "../data/cities";

export default function DealsBanner() {
  const navigate = useNavigate();

  const findDeals = () => {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem("hotelSearchData") || "{}");
    } catch {
      saved = {};
    }

    const city = findCity(saved.destination)?.name || "Jaipur";
    const checkInDate = fromISO(saved.checkIn);
    const hasDates = checkInDate && checkInDate >= TODAY && saved.checkOut;

    const url = searchUrl({
      city,
      checkIn: hasDates ? saved.checkIn : undefined,
      checkOut: hasDates ? saved.checkOut : undefined,
      adults: saved.adults || 2,
      children: saved.children || 0,
      rooms: saved.rooms || 1,
    });

    navigate(`${url}&deals=1`);
  };

  return (
    <section className="px-4  lg:px-12 ">
      <div className="relative flex w-320 mx-18 h-15 items-center justify-between gap-2 overflow-hidden rounded-2xl bg-[#76d8f5] px-2 py-4 sm:px-8">

        <div className="pointer-events-none absolute -left-1 top-3 -rotate-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-black bg-rose-500 text-black shadow-sm">
            <Percent size={32} strokeWidth={3} />
          </div>
        </div>

        <div className="pointer-events-none absolute left-[44%] -top-5 rotate-[-12deg]">
          <div className="flex h-10 w-9 items-center justify-center rounded-sm border-2 border-black bg-rose-500 text-black">
            <Percent size={24} strokeWidth={3} />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[-24px] left-[58%] rotate-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-black bg-rose-500 text-black">
            <Percent size={25} strokeWidth={3} />
          </div>
        </div>

        <div className="relative z-10 ml-12 text-sm text-slate-900 sm:text-base md:ml-12">
          <p>
            <span className="font-bold">Searching for a deal?</span>{" "}
            <span>We'll help you save on your next stay!</span>
          </p>
        </div>

        <button
          type="button"
          onClick={findDeals}
          className="relative z-10 flex shrink-0 items-center gap-2 rounded-xl border border-slate-900 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100 sm:px-6"
        >
          Find deals
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </section>
  );
}