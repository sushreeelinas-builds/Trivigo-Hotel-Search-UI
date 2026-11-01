
import { useEffect, useState } from "react";
import { Globe, X, ChevronDown } from "lucide-react";

const languages = [
  "English",
  "Hindi",
  "Odia",
  "French",
  "German",
  "Spanish",
];

const currencies = [
  "INR - Indian Rupee",
  "USD - US Dollar",
  "EUR - Euro",
  "GBP - British Pound",
  "AED - UAE Dirham",
];

export default function LanguageCurrencyModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [language, setLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );

  const [currency, setCurrency] = useState(
    localStorage.getItem("selectedCurrency") ||
      "INR - Indian Rupee"
  );

  const [savedLanguage, setSavedLanguage] = useState(language);
  const [savedCurrency, setSavedCurrency] = useState(currency);

  const handleApply = () => {
    localStorage.setItem("selectedLanguage", language);
    localStorage.setItem("selectedCurrency", currency);

    setSavedLanguage(language);
    setSavedCurrency(currency);

    setIsOpen(false);
  };

  const handleClose = () => {
    setLanguage(savedLanguage);
    setCurrency(savedCurrency);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [savedLanguage, savedCurrency]);

  const currencySymbol = {
    "INR - Indian Rupee": "₹",
    "USD - US Dollar": "$",
    "EUR - Euro": "€",
    "GBP - British Pound": "£",
    "AED - UAE Dirham": "د.إ",
  };

  return (
    <>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-black
        px-4 py-2.5 text-sm font-semibold text-gray-900
        hover:black transition-all  hover:bg-black hover:text-white
  active:scale-95 "
      >
        <Globe size={17} />

        <span>
          {savedLanguage === "English"
            ? "EN"
            : savedLanguage === "Hindi"
            ? "HI"
            : savedLanguage === "Odia"
            ? "OR"
            : savedLanguage.slice(0, 2).toUpperCase()}
        </span>

        <span>{currencySymbol[savedCurrency] || "₹"}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[9999] flex items-center
          justify-center bg-black/65 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[435px] overflow-hidden
            rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-6">
              <h2 className="text-lg font-bold text-black">
                Select language and currency
              </h2>

              <button
                onClick={handleClose}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X size={22} className="text-black" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6 px-5 pb-6">

              {/* Language */}
              <div>
                <label className="mb-1 block text-sm text-gray-700">
                  Language
                </label>

                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none rounded-xl border
                    border-gray-300 bg-white px-4 py-2.5
                    text-base text-gray-900 outline-none
                    focus:border-blue-500 focus:ring-2
                    focus:ring-blue-100"
                  >
                    {languages.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={20}
                    className="pointer-events-none absolute right-4
                    top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className="mb-1 block text-sm text-gray-700">
                  Currency
                </label>

                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full appearance-none rounded-xl border
                    border-gray-300 bg-white px-4 py-2.5
                    text-base text-gray-900 outline-none
                    focus:border-blue-500 focus:ring-2
                    focus:ring-blue-100"
                  >
                    {currencies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={20}
                    className="pointer-events-none absolute right-4
                    top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-200 px-5 py-3">
              <button
                onClick={handleApply}
                className="rounded-xl bg-[#0079c8] px-5 py-2.5
                text-sm font-bold text-white
                hover:bg-[#0066aa] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
