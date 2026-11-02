
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("trivagoFavorites") || "[]"
    );

    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(
      (hotel) => hotel.id !== id
    );

    setFavorites(updated);

    localStorage.setItem(
      "trivagoFavorites",
      JSON.stringify(updated)
    );
  };

  const openHotel = (hotel) => {
    localStorage.setItem(
      "trivagoSelectedHotel",
      JSON.stringify(hotel)
    );

    navigate(`/hotel/${hotel.id}`, {
      state: { hotel },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

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
          className="font-semibold text-blue-700"
        >
          ← Back to Home
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">

        <h1 className="text-3xl font-extrabold">
          My Favorites <span className="text-pink-600">♥</span>
        </h1>

        <p className="mt-2 text-gray-500">
          Your saved hotels in one place.
        </p>

        {favorites.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl text-gray-300">♡</div>

            <h2 className="mt-4 text-xl font-bold">
              No favorite hotels yet
            </h2>

            <p className="mt-2 text-gray-500">
              Click the heart icon on any hotel to save it here.
            </p>

            <button
              onClick={() => navigate("/hotels?city=Jaipur")}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white"
            >
              Explore Hotels
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {favorites.map((hotel) => (
              <article
                key={hotel.id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">

                  <h2 className="text-lg font-bold">
                    {hotel.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {hotel.location}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded bg-green-700 px-2 py-1 text-sm font-bold text-white">
                      {hotel.score}
                    </span>

                    <span className="text-lg font-extrabold">
                      {hotel.price}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => openHotel(hotel)}
                      className="flex-1 rounded-lg bg-blue-700 py-2.5 font-semibold text-white hover:bg-blue-800"
                    >
                      View Deal
                    </button>

                    <button
                      onClick={() => removeFavorite(hotel.id)}
                      className="rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50"
                    >
                      ♥
                    </button>
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
