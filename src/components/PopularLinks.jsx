
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
    "Ecuador",
    "Suomi",
    "Ελλάδα",
    "Hrvatska",
    "Indonesia",
    "ישראל",
    "Italia",
    "한국",
    "Malaysia",
    "Brasil",
  ],
  [
    "España",
    "France",
    "香港",
    "Magyarország",
    "Ireland",
    "India",
    "日本",
    "México",
    "Deutschland",
    "United Kingdom",
  ],
];

const ScrollPanel = ({ children }) => (
  <div className="h-[320px] overflow-y-auto rounded-2xl bg-[#f2f2f2] p-4 custom-scrollbar">
    {children}
  </div>
);

export default function PopularLinks() {
  return (
    <section className="w-full bg-white px-4 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1250px] grid-cols-1 gap-5 lg:grid-cols-2">

        <div>
          <h2 className="mb-3 text-2xl font-bold text-black sm:text-[28px]">
            More popular searches
          </h2>

          <ScrollPanel>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:gap-x-10">
              {popularSearches.map((column, index) => (
                <div key={index} className="flex flex-col gap-3">
                  {column.map((item) => (
                    <p
                      key={item}
                      className="cursor-default text-base font-bold text-black transition-colors duration-200 hover:text-[#df2450]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </ScrollPanel>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-black sm:text-[28px]">
            trivago international sites
          </h2>

          <ScrollPanel>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:gap-x-10">
              {internationalSites.map((column, index) => (
                <div key={index} className="flex flex-col gap-3">
                  {column.map((site) => (
                    <p
                      key={site}
                      className="cursor-default text-base text-black transition-colors duration-200 hover:text-[#df2450]"
                    >
                      <span className="font-normal">trivago</span>{" "}
                      <span className="font-bold">{site}</span>
                    </p>
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
