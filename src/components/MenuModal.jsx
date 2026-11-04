
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Favorites",
      icon: "♡",
      path: "/favorites",
    },
    {
      name: "Recently Viewed",
      icon: "◷",
      path: "/recent-viewed",
    },
    {
      name: "My Bookings",
      icon: "▤",
      path: "/my-bookings",
    },
  ];

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="mr-0 sm:mr-3 md:mr-6 lg:mr-12
        flex items-center gap-1.5 sm:gap-2
        rounded-full border border-gray-300
        px-3 py-2 sm:px-4 sm:py-2.5
        text-xs sm:text-sm md:text-base
        font-semibold text-gray-900
        transition-all duration-200
        hover:bg-gray-50 active:scale-95"
      >
        <span className="text-lg sm:text-xl">☰</span>
        <span>Menu</span>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Outside Click */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-12 sm:top-14 z-50
            w-[min(260px,calc(100vw-24px))]
            rounded-xl sm:rounded-2xl
            border border-gray-200 bg-white
            p-2 sm:p-3 shadow-xl"
          >
            <h3
              className="border-b border-gray-200
              px-3 py-3 text-sm sm:text-base
              font-bold text-gray-900"
            >
              Your Menu
            </h3>

            {menuItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate(item.path);
                }}
                className="flex w-full items-center gap-3
                rounded-lg px-3 py-3
                text-left text-sm sm:text-base
                font-medium text-gray-700
                transition-all duration-200
                hover:bg-gray-100 hover:text-blue-700
                active:scale-[0.98]"
              >
                <span className="text-xl sm:text-2xl">
                  {item.icon}
                </span>

                {item.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
