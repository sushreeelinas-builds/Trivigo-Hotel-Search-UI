
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

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border px-4 py-2 font-semibold hover:bg-gray-50"
      >
        <span className="text-xl">☰</span>
        <span>Menu</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border bg-white p-3 shadow-xl">

            <h3 className="border-b px-3 py-3 font-bold text-gray-900">
              Your Menu
            </h3>

            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  setOpen(false);
                  navigate(item.path);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-700"
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </button>
            ))}

          </div>
        </>
      )}
    </div>
  );
}
