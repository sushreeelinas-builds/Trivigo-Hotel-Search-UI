import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("trivagoBookings") || "[]"
      );

      setBookings(
        Array.isArray(savedBookings) ? savedBookings : []
      );
    } catch {
      setBookings([]);
    }
  }, []);

  // Cancel booking
  const cancelBooking = (id) => {
    const updated = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    setBookings(updated);

    localStorage.setItem(
      "trivagoBookings",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-5">

        <button
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold"
        >
          <span className="text-pink-600">tri</span>
          <span className="text-blue-600">vago</span>
        </button>

        <button
          onClick={() => navigate("/")}
          className="font-semibold text-blue-700 hover:text-blue-900"
        >
          ← Home
        </button>

      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-5 py-10">

        <h1 className="text-3xl font-extrabold text-gray-900">
          My Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your hotel bookings.
        </p>

        {/* Empty State */}
        {bookings.length === 0 ? (

          <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="text-5xl text-gray-300">
              ▤
            </div>

            <h2 className="mt-4 text-xl font-bold">
              No bookings yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your bookings will appear here.
            </p>

            <button
              onClick={() => navigate("/hotels?city=Jaipur")}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Explore Hotels
            </button>

          </div>

        ) : (

          /* Booking Cards */
          <div className="mt-8 space-y-5">

            {bookings.map((booking) => (

              <article
                key={booking.id}
                className="overflow-hidden rounded-2xl border bg-white p-4 shadow-sm sm:flex sm:gap-5"
              >

                {/* Hotel Image */}
                <img
                  src={booking.image}
                  alt={booking.hotelName}
                  className="h-48 w-full rounded-xl object-cover sm:h-40 sm:w-52"
                />

                {/* Booking Details */}
                <div className="flex-1 py-3">

                  <div className="flex flex-wrap items-center justify-between gap-2">

                    <h2 className="text-xl font-bold text-gray-900">
                      {booking.hotelName}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {booking.location}
                  </p>

                  {/* Dates and Guests */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                    <p>
                      <span className="text-gray-500">
                        Check-in:
                      </span>
                      <br />
                      <strong>{booking.checkIn}</strong>
                    </p>

                    <p>
                      <span className="text-gray-500">
                        Check-out:
                      </span>
                      <br />
                      <strong>{booking.checkOut}</strong>
                    </p>

                    <p>
                      <span className="text-gray-500">
                        Guests:
                      </span>
                      <br />
                      <strong>{booking.guests}</strong>
                    </p>

                    <p>
                      <span className="text-gray-500">
                        Rooms:
                      </span>
                      <br />
                      <strong>{booking.rooms}</strong>
                    </p>

                  </div>

                  {/* Price and Cancel Button */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">

                    <div>
                      <p className="text-xs text-gray-500">
                        Total amount
                      </p>

                      <p className="text-xl font-extrabold text-gray-900">
                        ₹
                        {Number(
                          booking.totalPrice || 0
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {booking.status === "Confirmed" && (

                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Cancel Booking
                      </button>

                    )}

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>
    </div>
  );
}