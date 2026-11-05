
import { useNavigate } from "react-router-dom";
import { Percent, ChevronRight } from "lucide-react";
import {
  searchUrl,
  findCity,
  fromISO,
  TODAY,
} from "../data/cities";

export default function DealsBanner() {
  const navigate = useNavigate();

  const findDeals = () => {
    let saved;

    try {
      saved = JSON.parse(
        localStorage.getItem("hotelSearchData") || "{}"
      );
    } catch {
      saved = {};
    }

    const city =
      findCity(saved.destination)?.name || "Jaipur";

    const checkInDate = fromISO(saved.checkIn);

    const hasDates =
      checkInDate &&
      checkInDate >= TODAY &&
      saved.checkOut;

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
    <section className="w-full overflow-hidden px-4 py-1 sm:px-6 lg:px-10 xl:px-29">

      <div className="relative mx-auto  flex min-h-[110px] w-full max-w-[1500px] flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#76d8f5] px-4 py-5 sm:min-h-[100px] sm:flex-row sm:px-6 md:px-8 lg:px-10">

        <div className="pointer-events-none absolute -left-2 top-3 -rotate-12 sm:left-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-black bg-rose-500 text-black shadow-sm sm:h-12 sm:w-12">
            <Percent size={28} strokeWidth={3} />
          </div>
        </div>

        <div className="pointer-events-none absolute -top-5 left-[48%] hidden rotate-[-12deg] sm:block">
          <div className="flex h-10 w-9 items-center justify-center rounded-sm border-2 border-black bg-rose-500 text-black">
            <Percent size={24} strokeWidth={3} />
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-6 right-[25%] rotate-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-black bg-rose-500 text-black">
            <Percent size={25} strokeWidth={3} />
          </div>
        </div>

        <div className="relative z-10 w-full pl-9 text-center text-sm text-slate-900 sm:ml-8 sm:w-auto sm:pl-0 sm:text-left sm:text-base md:text-lg">

          <p>
            <span className="font-bold">
              Searching for a deal?
            </span>{" "}

            <span>
              We'll help you save on your next stay!
            </span>
          </p>

        </div>

        <button
          type="button"
          onClick={findDeals}
          className="relative z-10 flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-slate-900 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-all duration-300 hover:bg-slate-100 hover:shadow-md sm:w-auto sm:px-6 sm:py-3 md:text-base"
        >
          Find deals

          <ChevronRight
            size={20}
            strokeWidth={3}
          />

        </button>

      </div>

    </section>
  );
}
