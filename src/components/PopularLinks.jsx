
const popularSearches = [
  [
    "Hotels in Paris",
    "Hotels in Vagamon",
    "Hotels in Thekkady",
    "Hotels in Ajmer",
    "Hotels in Shirdi",
    "Hotels in Alibaug",
    "Hotels in Guwahati",
    "Hotels in Bhopal",
    "Hotels in Goa",
    "Hotels in Mumbai",
    "Hotels in Jaipur",
    "Hotels in Delhi",
  ],
  [
    "Hotels in Nagpur",
    "Hotels in Diu",
    "Hotels in Makkah",
    "Hotels in Matheran",
    "Hotels in Greater Noida",
    "Hotels in Candolim",
    "Hotels in Shillong",
    "Hotels in Raipur",
    "Hotels in Bengaluru",
    "Hotels in Udaipur",
    "Hotels in Manali",
    "Hotels in Shimla",
  ],
];

const internationalSites = [
  [
    { name: "Ecuador", language: "trivago" },
    { name: "Suomi", language: "trivago" },
    { name: "Ελλάδα", language: "trivago" },
    { name: "Hrvatska", language: "trivago" },
    { name: "Indonesia", language: "trivago" },
    { name: "ישראל", language: "trivago" },
    { name: "Italia", language: "trivago" },
    { name: "한국", language: "trivago" },
    { name: "Malaysia", language: "trivago" },
    { name: "Brasil", language: "trivago" },
  ],
  [
    { name: "España", language: "trivago" },
    { name: "France", language: "trivago" },
    { name: "香港", language: "trivago" },
    { name: "Magyarország", language: "trivago" },
    { name: "Ireland", language: "trivago" },
    { name: "India", language: "trivago" },
    { name: "日本", language: "trivago" },
    { name: "México", language: "trivago" },
    { name: "Deutschland", language: "trivago" },
    { name: "United Kingdom", language: "trivago" },
  ],
];

const ScrollPanel = ({ children }) => (
  <div className="bg-[#f2f2f2] rounded-2xl p-4 h-[320px] overflow-y-auto custom-scrollbar">
    {children}
  </div>
);

export default function PopularLinks() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 lg:px-16 py-10">
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 ">

        {/* MORE POPULAR SEARCHES */}
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-black mb-3">
            More popular searches
          </h2>

          <ScrollPanel>
            <div className="grid  grid-cols-2 gap-x-5 sm:gap-x-10 gap-y-3">

              {popularSearches.map((column, index) => (
                <div key={index} className="flex flex-col gap-3 ">
                  {column.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-black font-bold text-base hover:text-[#df2450] transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              ))}

            </div>
          </ScrollPanel>
        </div>

        {/* INTERNATIONAL SITES */}
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-black mb-3">
            trivago international sites
          </h2>

          <ScrollPanel>
            <div className="grid grid-cols-2 gap-x-5 sm:gap-x-10 gap-y-3">

              {internationalSites.map((column, index) => (
                <div key={index} className="flex flex-col gap-3">
                  {column.map((site) => (
                    <a
                      key={site.name}
                      href="#"
                      className="text-black text-base hover:text-[#df2450] transition-colors"
                    >
                      {site.language}{" "}
                      <span className="font-bold">{site.name}</span>
                    </a>
                  ))}
                </div>
              ))}

            </div>
          </ScrollPanel>
        </div>

      </div>
    </section>
  );
}
