
import { useEffect, useMemo, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Check,
} from "lucide-react";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const pad = (n) => String(n).padStart(2, "0");

const formatDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parseDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getMonthStart = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const getCalendarDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const mondayOffset = (firstDay + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  return [
    ...Array(mondayOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
};

export default function DateSelectionModal({
  open,
  onClose,
  initialCheckIn,
  initialCheckOut,
  onApply,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [activeTab, setActiveTab] = useState("Dates");
  const [visibleMonth, setVisibleMonth] = useState(
    getMonthStart(parseDate(initialCheckIn) || today)
  );

  const [checkIn, setCheckIn] = useState(initialCheckIn || "");
  const [checkOut, setCheckOut] = useState(initialCheckOut || "");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    if (!open) return;

    setCheckIn(initialCheckIn || "");
    setCheckOut(initialCheckOut || "");
    setActiveTab("Dates");

    const initial = parseDate(initialCheckIn) || today;
    setVisibleMonth(getMonthStart(initial));
    setSelectedMonth("");
  }, [open, initialCheckIn, initialCheckOut]);

  const secondMonth = useMemo(
    () => new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      1
    ),
    [visibleMonth]
  );

  if (!open) return null;

  const handleDateClick = (date) => {
    if (date < today) return;

    const value = formatDate(date);

    if (!checkIn || checkOut || value <= checkIn) {
      setCheckIn(value);
      setCheckOut("");
    } else {
      setCheckOut(value);
    }
  };

  const isSelected = (date) => {
    if (!date) return false;

    const value = formatDate(date);
    return value === checkIn || value === checkOut;
  };

  const isBetween = (date) => {
    if (!date || !checkIn || !checkOut) return false;

    const value = formatDate(date);
    return value > checkIn && value < checkOut;
  };

  const selectQuickDate = (type) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let start;
    let nights = 1;

    if (type === "Tonight") {
      start = now;
    }

    if (type === "Tomorrow night") {
      start = addDays(now, 1);
    }

    if (type === "This weekend" || type === "Next weekend") {
      const day = now.getDay();
      const daysUntilFriday = (5 - day + 7) % 7;

      start = addDays(
        now,
        daysUntilFriday +
          (type === "Next weekend" || daysUntilFriday === 0 ? 7 : 0)
      );

      nights = 2;
    }

    const end = addDays(start, nights);

    setCheckIn(formatDate(start));
    setCheckOut(formatDate(end));
    setVisibleMonth(getMonthStart(start));
  };

  const selectMonth = (monthIndex) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let year = now.getFullYear();

    if (
      year < now.getFullYear() ||
      (year === now.getFullYear() && monthIndex < now.getMonth())
    ) {
      year++;
    }

    let start = new Date(year, monthIndex, 1);

    if (
      year === now.getFullYear() &&
      monthIndex === now.getMonth() &&
      now.getDate() > 1
    ) {
      start = now;
    }

    const end = addDays(start, 3);

    setSelectedMonth(months[monthIndex]);
    setCheckIn(formatDate(start));
    setCheckOut(formatDate(end));
  };

  const renderCalendar = (date) => {
    const days = getCalendarDays(date);

    return (
      <div className="min-w-0 flex-1">
        <h3 className="mb-5 text-center text-lg font-bold">
          {months[date.getMonth()]} {date.getFullYear()}
        </h3>

        <div className="mb-2 grid grid-cols-7 rounded-xl bg-gray-100 py-3 text-center text-sm">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
            (day) => (
              <span key={day} className="font-semibold">
                {day}
              </span>
            )
          )}
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center">
          {days.map((day, index) => {
            if (!day) return <div key={`empty-${index}`} />;

            const current = new Date(
              date.getFullYear(),
              date.getMonth(),
              day
            );

            const value = formatDate(current);
            const disabled = current < today;
            const selected = isSelected(current);
            const between = isBetween(current);

            return (
              <button
                key={value}
                disabled={disabled}
                onClick={() => handleDateClick(current)}
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm transition
                  ${selected ? "bg-[#007fc5] font-bold text-white" : ""}
                  ${between ? "rounded-none bg-sky-100 text-sky-800" : ""}
                  ${disabled ? "cursor-not-allowed text-gray-300" : "hover:bg-sky-100"}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const displayDate = (value) => {
    if (!value) return "Select date";

    return parseDate(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const applyDates = () => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      alert("Please select a valid check-in and check-out date.");
      return;
    }

    onApply({
      checkIn,
      checkOut,
      selectedMonth,
    });
  };

  const monthYearOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() + i,
      1
    );

    return date;
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[810px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Select your travel dates
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose dates or select an entire month
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mb-7 flex justify-center gap-3">
          {["Dates", "Months"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-6 py-2 font-bold transition ${
                activeTab === tab
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Dates" && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <button
                onClick={() =>
                  setVisibleMonth(
                    new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() - 1,
                      1
                    )
                  )
                }
                disabled={
                  visibleMonth.getFullYear() === today.getFullYear() &&
                  visibleMonth.getMonth() === today.getMonth()
                }
                className="rounded-full border p-2 disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2 text-sm font-semibold">
                <span>{displayDate(checkIn)}</span>
                <span className="text-gray-400">—</span>
                <span>{displayDate(checkOut)}</span>
              </div>

              <button
                onClick={() =>
                  setVisibleMonth(
                    new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() + 1,
                      1
                    )
                  )
                }
                className="rounded-full border p-2 hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {renderCalendar(visibleMonth)}
              {renderCalendar(secondMonth)}
            </div>
          </>
        )}

        {activeTab === "Months" && (
          <div>
            <h3 className="mb-2 text-center text-lg font-bold">
              Choose your travel month
            </h3>

            <p className="mb-6 text-center text-sm text-gray-500">
              Select a month for a three-night hotel stay.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {monthYearOptions.map((date) => {
                const index = date.getMonth();
                const label = `${months[index]} ${date.getFullYear()}`;

                const selected =
                  selectedMonth === months[index] &&
                  checkIn === formatDate(
                    date.getFullYear() === today.getFullYear() &&
                    index === today.getMonth()
                      ? today
                      : date
                  );

                return (
                  <button
                    key={label}
                    onClick={() => selectMonth(index)}
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-[#007fc5] bg-sky-50 text-[#007fc5]"
                        : "border-gray-200 hover:border-[#007fc5] hover:bg-sky-50"
                    }`}
                  >
                    <CalendarDays size={20} className="mb-3" />
                    <span className="block font-bold">
                      {months[index]}
                    </span>
                    <span className="text-sm text-gray-500">
                      {date.getFullYear()}
                    </span>
                    {selected && (
                      <Check size={17} className="mt-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-7 border-t pt-5">
          <p className="mb-3 text-sm font-bold">Quick selections</p>

          <div className="flex flex-wrap gap-2">
            {[
              "Tonight",
              "Tomorrow night",
              "This weekend",
              "Next weekend",
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab("Dates");
                  selectQuickDate(item);
                }}
                className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold hover:border-[#007fc5] hover:bg-sky-50"
              >
                <CalendarDays size={15} />
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-5 sm:flex-row">
          <div className="text-sm">
            <p className="font-bold">
              {displayDate(checkIn)}
              {checkOut && ` – ${displayDate(checkOut)}`}
            </p>
            <p className="mt-1 text-gray-500">
              {checkIn && checkOut
                ? `${Math.round(
                    (parseDate(checkOut) - parseDate(checkIn)) /
                      86400000
                  )} night(s)`
                : "Select check-in and check-out"}
            </p>
          </div>

          <button
            onClick={applyDates}
            className="w-full rounded-xl bg-[#007fc5] px-10 py-3 font-bold text-white transition hover:bg-[#006da9] sm:w-auto"
          >
            Apply dates
            <ChevronRight size={18} className="ml-2 inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
