
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const destinations = [
  {
    name: "Udaipur",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/d5/f0/cc3da077a3689cba15e5ed78f4585c9da87905d8a0ac2d64f983a4aaec8b.jpeg",
    prices: [
      ["March", "₹2,015", "₹13,700"],
      ["April", "₹2,040", "₹11,935"],
      ["May", "₹1,910", "₹11,660"],
      ["June", "₹1,920", "₹11,670"],
      ["July", "₹1,955", "₹11,640"],
      ["August", "₹1,985", "₹12,750"],
      ["September", "₹2,025", "₹12,545"],
      ["October", "₹2,150", "₹14,200"],
      ["November", "₹2,350", "₹15,500"],
      ["December", "₹2,800", "₹18,000"],
    ],
  },
  {
    name: "Mumbai",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/1d/bc/6a01bcd945549ac48141f17c02c9d59bd01ce9979d42b65f0430880763ca.jpeg",
    prices: [
      ["March", "₹2,500", "₹12,000"],
      ["April", "₹2,300", "₹10,500"],
      ["May", "₹2,100", "₹9,800"],
      ["June", "₹1,900", "₹9,500"],
      ["July", "₹2,000", "₹10,000"],
      ["August", "₹2,100", "₹10,500"],
      ["September", "₹2,200", "₹11,000"],
    ],
  },
  {
    name: "Jaipur",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/29/70/3c5fb02948dc6b46a822faab0c5c1c6317943db80c9393fdae8eca26ae28.jpeg",
    prices: [
      ["March", "₹1,800", "₹9,500"],
      ["April", "₹1,700", "₹8,900"],
      ["May", "₹1,600", "₹8,500"],
      ["June", "₹1,650", "₹8,800"],
      ["July", "₹1,750", "₹9,000"],
      ["August", "₹1,800", "₹9,200"],
      ["September", "₹1,900", "₹10,000"],
    ],
  },
  {
    name: "Mussoorie",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/9c/33/7402655d74b8c467dbc0d59d18c36e92c7e5bbcb4a0e23e165939c85ff83.jpeg",
    prices: [
      ["March", "₹2,000", "₹10,000"],
      ["April", "₹2,400", "₹12,000"],
      ["May", "₹3,000", "₹15,000"],
      ["June", "₹3,500", "₹18,000"],
      ["July", "₹2,700", "₹14,000"],
      ["August", "₹2,500", "₹12,500"],
      ["September", "₹2,200", "₹11,000"],
    ],
  },
  {
    name: "Bengaluru",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/9e/b1/62f831cf0ceaf2b8b6bcf8e12be62c835de745cece5bc83ee0da4ec7.jpeg",
    prices: [
      ["March", "₹2,000", "₹9,000"],
      ["April", "₹1,900", "₹8,500"],
      ["May", "₹1,850", "₹8,200"],
      ["June", "₹1,900", "₹8,500"],
      ["July", "₹2,000", "₹9,000"],
      ["August", "₹2,100", "₹9,500"],
      ["September", "₹2,050", "₹9,200"],
    ],
  },
  {
    name: "Munnar",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/2d/8d/e3a3ea142a66cd7ebdbbe2e449ef8c6731758e14d5a9ed57e5ccfccb7f99.jpeg",
    prices: [
      ["March", "₹2,200", "₹11,000"],
      ["April", "₹2,000", "₹10,000"],
      ["May", "₹2,100", "₹10,500"],
      ["June", "₹2,300", "₹12,000"],
      ["July", "₹2,250", "₹11,500"],
      ["August", "₹2,400", "₹12,000"],
      ["September", "₹2,300", "₹11,800"],
    ],
  },
  {
    name: "Mysore",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/9e/65/826a9d12de4ab77df92dd7b2849e36aad72c668ffcb95c36ef7285a9db00.jpeg",
    prices: [
      ["March", "₹1,700", "₹7,500"],
      ["April", "₹1,650", "₹7,200"],
      ["May", "₹1,700", "₹7,500"],
      ["June", "₹1,750", "₹7,800"],
      ["July", "₹1,800", "₹8,000"],
      ["August", "₹1,850", "₹8,200"],
      ["September", "₹1,900", "₹8,500"],
    ],
  },
  {
    name: "Delhi",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/b5/3e/d036c6d63951f899563022a0e9abc9fd17ad169186fc5b836af251eb4df0.jpeg",
    prices: [
      ["March", "₹2,000", "₹10,000"],
      ["April", "₹1,900", "₹9,500"],
      ["May", "₹1,800", "₹9,000"],
      ["June", "₹1,750", "₹8,500"],
      ["July", "₹1,800", "₹9,000"],
      ["August", "₹1,900", "₹9,500"],
      ["September", "₹2,000", "₹10,000"],
    ],
  },
  {
    name: "Kolkata",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/37/d1/682d01043f920e6257c5cae27d7525af17dbea0d82b02edbf3ec248d7a47.jpeg",
    prices: [
      ["March", "₹1,800", "₹8,500"],
      ["April", "₹1,750", "₹8,000"],
      ["May", "₹1,700", "₹7,800"],
      ["June", "₹1,800", "₹8,200"],
      ["July", "₹1,900", "₹8,800"],
      ["August", "₹1,850", "₹8,500"],
      ["September", "₹1,900", "₹9,000"],
    ],
  },
  {
    name: "Varanasi",
    image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_493,q_45,w_516/destination-images/18/c0/f11867064d696d4dbf7ff26dd595e965fdca97b39f8f5a846e3d74b9cb03.jpeg",
    prices: [
      ["March", "₹1,500", "₹7,000"],
      ["April", "₹1,450", "₹6,800"],
      ["May", "₹1,400", "₹6,500"],
      ["June", "₹1,450", "₹6,700"],
      ["July", "₹1,500", "₹7,000"],
      ["August", "₹1,550", "₹7,200"],
      ["September", "₹1,600", "₹7,500"],
    ],
  },
];

export default function BestTimeToBook() {
  const [activeCity, setActiveCity] = useState("Udaipur");
  const navigate = useNavigate();

  const city =
    destinations.find((item) => item.name === activeCity) ||
    destinations[0];

  const handleMonthClick = (month, lowPrice, highPrice) => {
    navigate(
      `/month-details/${encodeURIComponent(city.name)}/${month.toLowerCase()}`,
      {
        state: {
          destination: city.name,
          month,
          lowPrice,
          highPrice,
          image: city.image,
        },
      }
    );
  };

  return (
    <section className="w-full bg-white px-4 py-10 text-black sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">

        <h2 className="mb-7 text-2xl font-bold tracking-tight sm:text-3xl">
          Discover the best time to book your next stay
        </h2>

        <div className="rounded-2xl bg-white p-4 shadow-[0_5px_25px_rgba(0,0,0,0.14)] sm:p-6">

          <div className="mb-5 flex gap-2 overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {destinations.map((destination) => (
              <button
                key={destination.name}
                type="button"
                onClick={() => setActiveCity(destination.name)}
                className={`shrink-0 border-b-2 px-4 py-3 text-sm font-bold transition sm:text-base ${
                  activeCity === destination.name
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-black hover:text-sky-600"
                }`}
              >
                {destination.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.25fr)]">

            <div>
              <img
                src={city.image}
                alt={city.name}
                className="h-[300px] w-full rounded-xl object-cover sm:h-[380px] md:h-[425px]"
                onError={(e) => {
                  e.currentTarget.style.backgroundColor = "#e5e7eb";
                }}
              />

              <p className="mt-5 text-sm font-medium leading-6 text-gray-500">
                Prices are based on the average price range for 3-star hotels
                per night.
              </p>
            </div>

            <div className="max-h-[425px] space-y-2 overflow-y-auto pr-1">
              {city.prices.map(([month, lowPrice, highPrice]) => (
                <button
                  key={month}
                  type="button"
                  onClick={() =>
                    handleMonthClick(month, lowPrice, highPrice)
                  }
                  className="flex min-h-[55px] w-full items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-left transition hover:border-sky-500 hover:bg-sky-50"
                >
                  <span className="text-sm font-bold sm:text-base">
                    {month}
                  </span>

                  <span className="flex items-center gap-2 whitespace-nowrap text-sm font-bold sm:text-base">
                    {lowPrice} - {highPrice}
                    <ChevronRight size={21} strokeWidth={2.5} />
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
