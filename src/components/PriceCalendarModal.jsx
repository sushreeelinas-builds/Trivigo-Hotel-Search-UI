
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, CalendarDays, Minus, Plus } from "lucide-react";

const formatDate = (date) => {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const toISO = (date) => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

function CalendarMonth({ month, checkIn, checkOut, onSelect }) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;

  const days = Array.from({ length: offset + totalDays }, (_, i) =>
    i < offset ? null : new Date(year, monthIndex, i - offset + 1)
  );

  return (
    <div className="min-w-0 flex-1">
      <h3 className="mb-5 text-center text-lg font-bold">
        {month.toLocaleString("en-US", { month: "long", year: "numeric" })}
      </h3>

      <div className="mb-3 grid grid-cols-7 text-center text-sm text-gray-500">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <span key={day} className="py-2 font-semibold">{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {days.map((date, index) => {
          if (!date) return <span key={`empty-${index}`} />;

          const value = toISO(date);
          const isStart = value === checkIn;
          const isEnd = value === checkOut;
          const inRange = checkIn && checkOut && value > checkIn && value < checkOut;
          const today = toISO(new Date());

          return (
            <button
              key={value}
              disabled={value < today}
              onClick={() => onSelect(value)}
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm transition
                ${isStart || isEnd ? "bg-black font-bold text-white" : ""}
                ${inRange ? "rounded-none bg-sky-100 text-sky-900" : ""}
                ${value < today ? "cursor-not-allowed text-gray-300" : "hover:bg-sky-100"}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PriceCalendarModal({
  hotel,
  destination,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  initialRooms = 1,
  onClose,
  onApply,
}) {
  const [checkIn, setCheckIn] = useState(initialCheckIn || "");
  const [checkOut, setCheckOut] = useState(initialCheckOut || "");
  const [guests, setGuests] = useState(initialGuests);
  const [rooms, setRooms] = useState(initialRooms);
  const [month, setMonth] = useState(() => {
    if (initialCheckIn) return new Date(`${initialCheckIn}T00:00:00`);
    return new Date();
  });

  const selectDate = (value) => {
    if (!checkIn || checkOut || value <= checkIn) {
      setCheckIn(value);
      setCheckOut("");
    } else {
      setCheckOut(value);
    }
  };

  const changeMonth = (amount) => {
    setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + amount, 1));
  };

  const secondMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);

  const adjust = (setter, value, min, max) => {
    setter((prev) => Math.max(min, Math.min(max, prev + value)));
  };

  const apply = () => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    onApply({ checkIn, checkOut, guests, rooms });
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-2 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[95vh] w-full max-w-[850px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">

        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">Select your stay</p>
            <h2 className="mt-1 text-xl font-extrabold">{hotel?.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{destination}</p>
          </div>
          <button onClick={onClose} className="rounded-lg border p-2 hover:bg-gray-100">
            <X size={21} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border p-3">
            <p className="text-xs text-gray-500">Check-in</p>
            <p className="mt-1 font-bold">{formatDate(checkIn) || "Select date"}</p>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-xs text-gray-500">Check-out</p>
            <p className="mt-1 font-bold">{formatDate(checkOut) || "Select date"}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => changeMonth(-1)}
            className="rounded-full border p-2 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-semibold text-gray-500">Choose your dates</span>
          <button
            onClick={() => changeMonth(1)}
            className="rounded-full border p-2 hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <CalendarMonth
            month={month}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelect={selectDate}
          />
          <CalendarMonth
            month={secondMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelect={selectDate}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t pt-5">
          {[
            { label: "Tonight", days: 0 },
            { label: "Tomorrow night", days: 1 },
            { label: "This weekend", days: 5 },
            { label: "Next weekend", days: 7 },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                const start = new Date();
                start.setDate(start.getDate() + item.days);
                const end = new Date(start);
                end.setDate(end.getDate() + 1);
                setCheckIn(toISO(start));
                setCheckOut(toISO(end));
                setMonth(new Date(start.getFullYear(), start.getMonth(), 1));
              }}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-gray-100"
            >
              <CalendarDays size={15} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-2">
          {[
            { label: "Guests", value: guests, setter: setGuests, min: 1, max: 8 },
            { label: "Rooms", value: rooms, setter: setRooms, min: 1, max: 5 },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-bold">{item.label}</p>
                <p className="text-xs text-gray-500">Select number of {item.label.toLowerCase()}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => adjust(item.setter, -1, item.min, item.max)}
                  className="rounded-full border p-2"
                  disabled={item.value <= item.min}
                >
                  <Minus size={15} />
                </button>
                <strong>{item.value}</strong>
                <button
                  onClick={() => adjust(item.setter, 1, item.min, item.max)}
                  className="rounded-full border p-2"
                  disabled={item.value >= item.max}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <div>
            <p className="text-xs text-gray-500">Price from</p>
            <p className="text-2xl font-extrabold">{hotel?.price}</p>
          </div>
          <button
            onClick={apply}
            className="rounded-xl bg-[#007fc5] px-8 py-3 font-bold text-white hover:bg-[#006da9]"
          >
            Apply dates and see prices →
          </button>
        </div>
      </div>
    </div>
  );
}
