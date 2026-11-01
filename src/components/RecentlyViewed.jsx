import React from "react";

const RecentlyViewed = () => {
  return (
    <div className="min-h-screen bg-white flex">

      {/* LEFT SIDEBAR */}
      <div className="w-[315px] border-r border-gray-100 min-h-screen pt-12">

        {/* Back */}
        <div className="flex items-center gap-4 px-6 mb-14 cursor-pointer">
          <span className="text-3xl font-light">‹</span>
          <span className="text-[16px]">Back</span>
        </div>

        {/* Favourites */}
        <div className="flex items-center gap-4 px-5 py-4 mb-4 cursor-pointer">
          <span className="text-[28px]">♡</span>
          <span classNam="text-[17px]">Favourites</span>
        </div>

        {/* Recently Viewed - ACTIVE */}
        <div className="bg-[#e5f4ff] rounded-r-xl px-5 py-5 mb-4">
          <div className="flex items-center gap-4">
            <span className="text-[25px] text-[#0071c2]">↶</span>

            <span className="text-[17px] font-semibold text-[#006db6]">
              Recently viewed
            </span>
          </div>
        </div>

        {/* Bookings */}
        <div className="flex items-center gap-4 px-5 py-4 mb-4 cursor-pointer">
          <span className="text-[25px]">▢</span>
          <span className="text-[17px]">Bookings</span>
        </div>

        {/* Language */}
        <div className="flex items-center gap-4 px-5 py-4 mb-4 cursor-pointer">
          <span className="text-[25px]">◎</span>
          <span className="text-[17px]">Language and currency</span>
        </div>

        {/* Help */}
        <div className="flex items-center gap-4 px-5 py-4 cursor-pointer">
          <span className="text-[25px]">?</span>
          <span className="text-[17px]">Help and support</span>
        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="flex-1 px-7 pt-7">

        <h1 className="text-[42px] font-bold text-[#111827]">
          Recently viewed
        </h1>

        <p className="text-[20px] mt-10 text-[#111827]">
          Explore stays and we’ll save them here so you can easily continue
          your search later.
        </p>


        {/* Illustration */}
        <div className="mt-8 flex justify-center">
          <img
            src="https://cf.bstatic.com/static/img/recently-viewed/recently-viewed-illustration.png"
            alt="Recently viewed"
            className="w-[80%] max-w-[1250px] h-[390px] object-contain"
          />
        </div>


        {/* Search Button */}
        <div className="flex justify-end mt-5 pr-5">
          <button
            className="
              bg-[#0071c2]
              hover:bg-[#005b9f]
              text-white
              font-bold
              text-[18px]
              px-10
              py-4
              rounded-xl
              transition
            "
          >
            Search stays
          </button>
        </div>

      </div>

    </div>
  );
};

export default RecentlyViewed;