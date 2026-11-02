import { cities } from "./cities";
const explicitHotels = {
  Panaji: [
    {
      id: 101,
      name: "Goa Marriott Resort",
      location: "Panaji, India",
      score: 9.0,
      reviews: "6.2k",
      price: "₹12,500",
      provider: "Booking.com",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description: "Luxury hotel with beautiful views and premium facilities.",
      distance: "2.5 km",
      facilities: ["Free WiFi", "Swimming pool", "Restaurant", "Breakfast included", "Spa"],
      breakfast: true,
      pool: true,
      type: "Resort",
      hotDeal: true,
    },
    {
      id: 102,
      name: "Hotel Palacio de Goa",
      location: "Panaji, India",
      score: 8.3,
      reviews: "2.1k",
      price: "₹5,200",
      provider: "Agoda",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Comfortable rooms with modern amenities.",
      distance: "1.8 km",
      facilities: ["Free WiFi", "Restaurant", "Air conditioning"],
      breakfast: false,
      pool: false,
      type: "Hotel",
      hotDeal: false,
    },
    {
      id: 103,
      name: "Vivanta Goa",
      location: "Panaji, India",
      score: 9.1,
      reviews: "11k",
      price: "₹14,844",
      provider: "ZenHotels.com",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      description: "Premium luxury stay with exceptional hospitality.",
      distance: "3.2 km",
      facilities: ["Free WiFi", "Swimming pool", "Restaurant", "Spa", "Fitness centre"],
      breakfast: true,
      pool: true,
      type: "Resort",
      hotDeal: true,
    },
    {
      id: 104,
      name: "Bambolim Beach Resort",
      location: "Panaji, India",
      score: 7.7,
      reviews: "5.4k",
      price: "₹4,647",
      provider: "Agoda",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description: "Relaxing beach resort with beautiful surroundings.",
      distance: "5.8 km",
      facilities: ["Free WiFi", "Swimming pool", "Free parking"],
      breakfast: false,
      pool: true,
      type: "Resort",
      hotDeal: true,
    },
    {
      id: 105,
      name: "Goa Heritage Hotel",
      location: "Panaji, India",
      score: 8.5,
      reviews: "1.8k",
      price: "₹6,800",
      provider: "MakeMyTrip",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
      description: "Heritage property with traditional hospitality.",
      distance: "2.1 km",
      facilities: ["Free WiFi", "Restaurant", "Breakfast included"],
      breakfast: true,
      pool: false,
      type: "Hotel",
      hotDeal: false,
    },
    {
      id: 106,
      name: "Casa Panaji Serviced Apartments",
      location: "Panaji, India",
      score: 8.2,
      reviews: "940",
      price: "₹3,900",
      provider: "Goibibo.com",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
      description: "Self-catering apartments with a kitchen, ideal for longer stays.",
      distance: "1.4 km",
      facilities: ["Free WiFi", "Air conditioning", "Free parking"],
      breakfast: false,
      pool: false,
      type: "Serviced apartment",
      hotDeal: true,
    },
  ],

  Rome: [
    {
      id: 201,
      name: "Hotel Artemide",
      location: "Rome, Italy",
      score: 9.2,
      reviews: "4.5k",
      price: "₹19,500",
      provider: "Booking.com",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Elegant hotel in the heart of Rome.",
      distance: "1.2 km",
      facilities: ["Free WiFi", "Restaurant", "Spa", "Breakfast included"],
      breakfast: true,
      pool: false,
      type: "Hotel",
      hotDeal: true,
    },
    {
      id: 202,
      name: "Stendhal Hotel",
      location: "Rome, Italy",
      score: 8.9,
      reviews: "3.2k",
      price: "₹26,338",
      provider: "Hotel Site",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Stylish hotel with premium city facilities.",
      distance: "2 km",
      facilities: ["Free WiFi", "Restaurant", "Air conditioning"],
      breakfast: true,
      pool: false,
      type: "Hotel",
      hotDeal: false,
    },
    {
      id: 203,
      name: "Hotel Quirinale",
      location: "Rome, Italy",
      score: 8.4,
      reviews: "3.7k",
      price: "₹16,200",
      provider: "Agoda",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
      description: "Comfortable accommodation near city attractions.",
      distance: "3 km",
      facilities: ["Free WiFi", "Restaurant", "Breakfast included"],
      breakfast: true,
      pool: false,
      type: "Hotel",
      hotDeal: false,
    },
    {
      id: 204,
      name: "Trastevere Residence",
      location: "Rome, Italy",
      score: 8.6,
      reviews: "1.3k",
      price: "₹11,400",
      provider: "Booking.com",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
      description: "Bright apartments with kitchenettes in a lively neighbourhood.",
      distance: "2.6 km",
      facilities: ["Free WiFi", "Air conditioning", "Non-smoking rooms"],
      breakfast: false,
      pool: false,
      type: "Serviced apartment",
      hotDeal: true,
    },
  ],

  Mysore: [
    {
      id: 301,
      name: "Radisson Blu Plaza",
      location: "Mysore, India",
      score: 9.0,
      reviews: "5.3k",
      price: "₹9,200",
      provider: "Booking.com",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
      description: "Luxury accommodation with premium amenities.",
      distance: "2 km",
      facilities: ["Free WiFi", "Swimming pool", "Restaurant", "Spa"],
      breakfast: true,
      pool: true,
      type: "Hotel",
      hotDeal: true,
    },
    {
      id: 302,
      name: "The Green Hotel",
      location: "Mysore, India",
      score: 8.1,
      reviews: "3.9k",
      price: "₹3,595",
      provider: "Goibibo.com",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
      description: "Affordable heritage hotel with a peaceful atmosphere.",
      distance: "3.5 km",
      facilities: ["Free WiFi", "Restaurant", "Free parking"],
      breakfast: false,
      pool: false,
      type: "Hotel",
      hotDeal: true,
    },
    {
      id: 303,
      name: "Grand Mercure Mysore",
      location: "Mysore, India",
      score: 8.8,
      reviews: "26k",
      price: "₹8,610",
      provider: "Mercure",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
      description: "Modern hotel offering elegant rooms and services.",
      distance: "1.5 km",
      facilities: ["Free WiFi", "Restaurant", "Swimming pool"],
      breakfast: true,
      pool: true,
      type: "Hotel",
      hotDeal: false,
    },
    {
      id: 304,
      name: "Palace View Suites",
      location: "Mysore, India",
      score: 7.9,
      reviews: "720",
      price: "₹2,800",
      provider: "Agoda",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900",
      description: "Serviced suites with a kitchenette, close to the palace.",
      distance: "2.2 km",
      facilities: ["Free WiFi", "Air conditioning", "Free parking"],
      breakfast: false,
      pool: false,
      type: "Serviced apartment",
      hotDeal: false,
    },
  ],

  Goa: [
    {
      id: 401,
      name: "Taj Fort Aguada Resort",
      location: "Goa, India",
      score: 9.2,
      reviews: "8.3k",
      price: "₹18,250",
      provider: "MakeMyTrip",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900",
      description: "Luxury beachfront resort with stunning views.",
      distance: "4 km",
      facilities: ["Free WiFi", "Swimming pool", "Spa", "Restaurant"],
      breakfast: true,
      pool: true,
      type: "Resort",
      hotDeal: true,
    },
    {
      id: 402,
      name: "Goa Marriott Resort",
      location: "Goa, India",
      score: 9.0,
      reviews: "6.2k",
      price: "₹12,500",
      provider: "Booking.com",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
      description: "Luxury resort with premium facilities.",
      distance: "2.5 km",
      facilities: ["Free WiFi", "Swimming pool", "Restaurant"],
      breakfast: true,
      pool: true,
      type: "Resort",
      hotDeal: true,
    },
    {
      id: 403,
      name: "Luxury Beach Resort",
      location: "Goa, India",
      score: 8.7,
      reviews: "2.8k",
      price: "₹8,500",
      provider: "Agoda",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Peaceful beach resort with comfortable accommodation.",
      distance: "5 km",
      facilities: ["Free WiFi", "Swimming pool", "Restaurant"],
      breakfast: false,
      pool: true,
      type: "Resort",
      hotDeal: false,
    },
    {
      id: 404,
      name: "Calangute Stay Apartments",
      location: "Goa, India",
      score: 8.0,
      reviews: "1.1k",
      price: "₹4,200",
      provider: "Goibibo.com",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
      description: "Self-catering apartments a short walk from the beach.",
      distance: "2.9 km",
      facilities: ["Free WiFi", "Air conditioning", "Swimming pool"],
      breakfast: false,
      pool: true,
      type: "Serviced apartment",
      hotDeal: true,
    },
  ],
};

export const galleryImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900",
];

export const breakfastOptions = [
  "Continental",
  "Italian",
  "Full English/Irish",
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Asian",
  "American",
  "Buffet",
];

export const highlights = [
  "Superb breakfast options",
  "Free WiFi",
  "Free private parking",
  "Swimming pool",
  "Restaurant and bar",
  "Air-conditioned rooms",
  "24-hour front desk",
  "Wheelchair accessible",
];

export const defaultFacilities = [
  "Free WiFi",
  "Swimming pool",
  "Free parking",
  "Restaurant",
  "Room service",
  "Air conditioning",
  "Family rooms",
  "Non-smoking rooms",
  "Fitness centre",
  "Spa and wellness centre",
  "Breakfast included",
  "24-hour front desk",
];

export const formatPrice = (price) =>
  Number(String(price || "").replace(/[^\d]/g, "")) || 0;

export const parseDistance = (distance) =>
  parseFloat(String(distance || "").replace(/[^\d.]/g, "")) || 999;

export const getLabel = (score = 0) => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Very Good";
  if (score >= 7) return "Good";
  return "Pleasant";
};

export const getCityHotels = (city) => {
  const key = Object.keys(locationHotels).find(
    (item) => item.toLowerCase() === String(city).trim().toLowerCase()
  );
  return key ? locationHotels[key] : [];
};

export const findHotelById = (id) =>
  Object.values(locationHotels)
    .flat()
    .find((hotel) => String(hotel.id) === String(id));

const imagePool = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
];

const providers = ["Booking.com", "Agoda", "MakeMyTrip", "ZenHotels.com", "Goibibo.com", "Trip.com", "Hotel Site"];

const descriptions = {
  Hotel: [
    "Traditional architecture, authentic local cuisine on site",
    "Central location with a rooftop restaurant and city views",
    "Comfortable rooms, 24-hour front desk and free breakfast options",
  ],
  Resort: [
    "Landscaped gardens, outdoor pool and spa treatments",
    "Peaceful resort with a pool, yoga deck and live entertainment",
  ],
  "Serviced apartment": [
    "Self-catering apartments with a kitchen, ideal for longer stays",
  ],
};

const facilityPool = [
  "Free WiFi", "Restaurant", "Air conditioning", "Free parking", "Room service",
  "Fitness centre", "24-hour front desk", "Non-smoking rooms", "Family rooms",
];

const seeded = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const typeFromName = (name) => {
  if (/resort|retreat|camp/i.test(name)) return "Resort";
  if (/apartment|residence|residency|suites|stay/i.test(name)) return "Serviced apartment";
  return "Hotel";
};

const generateCityHotels = (city, cityIndex) =>
  city.hotelNames.map((name, i) => {
    const rand = seeded(cityIndex * 97 + i * 13 + 7);
    const type = typeFromName(name);
    const luxury = /palace|oberoi|taj |leela|imperial|rambagh|amarvilas|wildflower|itc |grand|lalit/i.test(name);
    const typeFactor = (type === "Resort" ? 1.25 : type === "Serviced apartment" ? 0.6 : 1) * (luxury ? 3.2 : 1);
    const rawScore = Math.min(9.6, Math.round((7.2 + rand() * 2.3) * 10) / 10);
    const score = luxury ? Math.max(rawScore, 8.6) : rawScore;
    const pool = type === "Resort" ? true : type === "Hotel" ? rand() > 0.55 : rand() > 0.8;
    const breakfast = rand() > 0.4;
    const facilities = ["Free WiFi"];
    if (pool) facilities.push("Swimming pool");
    if (breakfast) facilities.push("Breakfast included");
    facilityPool.forEach((f) => {
      if (facilities.length < 6 && rand() > 0.55 && !facilities.includes(f)) facilities.push(f);
    });
    if (!facilities.includes("Air conditioning") && rand() > 0.3) facilities.push("Air conditioning");
    const descList = descriptions[type];
    const price = Math.round((city.avg * (0.45 + rand() * 1.5) * typeFactor) / 5) * 5;

    return {
      id: 5000 + cityIndex * 20 + i,
      name,
      location: `${city.name}, ${city.region}`,
      city: city.name,
      score,
      reviews: Math.round(600 + rand() * 20000).toLocaleString("en-US"),
      price: `₹${price.toLocaleString("en-IN")}`,
      provider: providers[Math.floor(rand() * providers.length)],
      image: imagePool[(cityIndex + i) % imagePool.length],
      description: descList[Math.floor(rand() * descList.length)],
      distance: `${(0.5 + rand() * 8).toFixed(1)} km`,
      facilities,
      breakfast,
      pool,
      type,
      hotDeal: rand() > 0.55,
      ...(luxury ? { stars: 5 } : {}),
    };
  });

export const normalizeHotel = (hotel, index = 0) => {
  const seed = Number(hotel.id) || index + 1;
  const stars = hotel.stars || (hotel.score >= 9 ? 5 : hotel.score >= 8.3 ? 4 : 3);
  return {
    ...hotel,
    city: hotel.city || String(hotel.location || "").split(",")[0].trim(),
    stars,
    sites: hotel.sites || 4 + (seed % 9),
    halfBoard: hotel.halfBoard ?? (Boolean(hotel.breakfast) && seed % 2 === 0),
    popular: hotel.popular ?? seed % 5 === 1,
    distance: hotel.distance || "2.4 km",
    facilities: hotel.facilities || ["Free WiFi", "Restaurant"],
    breakfast: Boolean(hotel.breakfast),
    pool: Boolean(hotel.pool),
    type: hotel.type || "Hotel",
  };
};

const generated = {};
cities.forEach((city, index) => {
  if (!explicitHotels[city.name] && city.hotelNames.length) {
    generated[city.name] = generateCityHotels(city, index);
  }
});

const merged = { ...explicitHotels, ...generated };

export const locationHotels = Object.fromEntries(
  Object.entries(merged).map(([city, list]) => [
    city,
    list.map((hotel, i) => normalizeHotel({ ...hotel, city }, i)),
  ])
);

export const allHotels = Object.values(locationHotels).flat();

export const findHotelByName = (name) =>
  allHotels.find((h) => h.name.toLowerCase() === String(name).trim().toLowerCase());
