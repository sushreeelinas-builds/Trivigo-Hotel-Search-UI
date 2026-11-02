import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecentlyViewed() {
  const navigate = useNavigate();
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("trivagoRecent") || "[]");
    } catch {
      return [];
    }
  });

  const clearAll = () => {
    localStorage.removeItem("trivagoRecent");
    setRecent([]);
  };

  const side = "flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-neutral-50";

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="hidden min-h-screen w-[315px] shrink-0 border-r border-gray-100 pt-12 md:block">
        <button type="button" onClick={() => navigate("/")} className="mb-14 flex items-center gap-4 px-6">
          <span className="text-3xl font-light">‹</span>
          <span className="text-[16px]">Back</span>
        </button>

        <button type="button" onClick={() => navigate("/favorites")} className={side}>
          <span className="text-[28px]">♡</span>
          <span className="text-[17px]">Favourites</span>
        </button>

        <div className="my-2 rounded-r-xl bg-[#e5f4ff] px-5 py-5">
          <div className="flex items-center gap-4">
            <span className="text-[25px] text-[#0071c2]">↶</span>
            <span className="text-[17px] font-semibold text-[#006db6]">Recently viewed</span>
          </div>
        </div>

        <button type="button" onClick={() => navigate("/my-bookings")} className={side}>
          <span className="text-[25px]">▢</span>
          <span className="text-[17px]">Bookings</span>
        </button>
      </aside>

      <main className="flex-1 px-6 pt-8 md:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-4xl font-bold text-[#111827]">Recently viewed</h1>
          {recent.length > 0 && (
            <button type="button" onClick={clearAll} className="font-bold text-sky-700 underline">
              Clear history
            </button>
          )}
        </div>

        {recent.length === 0 ? (
          <>
            <p className="mt-8 text-xl text-[#111827]">
              Explore stays and we’ll save them here so you can easily continue your search later.
            </p>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/hotels?city=Jaipur")}
                className="rounded-xl bg-[#0071c2] px-10 py-4 text-lg font-bold text-white transition hover:bg-[#005b9f]"
              >
                Search stays
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8 grid gap-5 pb-10 sm:grid-cols-2 xl:grid-cols-3">
            {recent.map((hotel) => (
              <article key={hotel.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  onError={(e) => (e.currentTarget.style.background = "#e5e7eb")}
                  className="h-44 w-full bg-neutral-200 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold">{hotel.name}</h2>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                  <p className="mt-2 font-bold text-sky-700">{hotel.price} / night</p>
                  <button
                    type="button"
                    onClick={() => navigate(`/hotel/${hotel.id}`, { state: { hotel } })}
                    className="mt-3 w-full rounded-lg bg-sky-600 py-2 font-bold text-white hover:bg-sky-700"
                  >
                    View hotel
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
