
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
    () => localStorage.getItem("selectedLanguage") || "English"
  );

  const [currency, setCurrency] = useState(
    () =>
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
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, savedLanguage, savedCurrency]);

  const currencySymbol = {
    "INR - Indian Rupee": "₹",
    "USD - US Dollar": "$",
    "EUR - Euro": "€",
    "GBP - British Pound": "£",
    "AED - UAE Dirham": "د.إ",
  };

  const languageCode = {
    English: "EN",
    Hindi: "HI",
    Odia: "OR",
    French: "FR",
    German: "DE",
    Spanish: "ES",
  };

  return (
    <>
      {/* Language and Currency Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-1.5 sm:gap-2
        rounded-lg sm:rounded-xl
        border border-black
        px-2.5 py-2 sm:px-4 sm:py-2.5
        text-xs sm:text-sm
        font-semibold text-gray-900
        transition-all duration-200
        hover:bg-black hover:text-white
        active:scale-95"
      >
        <Globe size={16} className="shrink-0 sm:w-[17px] sm:h-[17px]" />

        <span>{languageCode[savedLanguage] || "EN"}</span>

        <span>
          {currencySymbol[savedCurrency] || "₹"}
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[9999]
          flex items-center justify-center
          overflow-y-auto bg-black/65
          px-3 py-4 sm:px-5 sm:py-6"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full
            max-w-[435px] max-h-[90vh]
            overflow-y-auto
            rounded-xl sm:rounded-2xl
            bg-white shadow-2xl
            animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between
              gap-3 px-4 pt-5 pb-5
              sm:px-5 sm:pt-6 sm:pb-6"
            >
              <h2
                id="language-modal-title"
                className="text-base sm:text-lg
                font-bold text-black"
              >
                Select language and currency
              </h2>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="shrink-0 rounded-full p-1.5
                transition hover:bg-gray-100"
              >
                <X size={21} className="text-black sm:w-[22px] sm:h-[22px]" />
              </button>
            </div>

            {/* Form Content */}
            <div className="space-y-5 px-4 pb-6 sm:space-y-6 sm:px-5">

              {/* Language */}
              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-sm
                  font-medium text-gray-700"
                >
                  Language
                </label>

                <div className="relative">
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="h-11 sm:h-12 w-full
                    appearance-none rounded-lg sm:rounded-xl
                    border border-gray-300 bg-white
                    px-3 sm:px-4 pr-10
                    text-sm sm:text-base text-gray-900
                    outline-none transition
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  >
                    {languages.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={19}
                    className="pointer-events-none
                    absolute right-3 sm:right-4
                    top-1/2 -translate-y-1/2
                    text-gray-600"
                  />
                </div>
              </div>

              {/* Currency */}
              <div>
                <label
                  htmlFor="currency"
                  className="mb-2 block text-sm
                  font-medium text-gray-700"
                >
                  Currency
                </label>

                <div className="relative">
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="h-11 sm:h-12 w-full
                    appearance-none rounded-lg sm:rounded-xl
                    border border-gray-300 bg-white
                    px-3 sm:px-4 pr-10
                    text-sm sm:text-base text-gray-900
                    outline-none transition
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  >
                    {currencies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={19}
                    className="pointer-events-none
                    absolute right-3 sm:right-4
                    top-1/2 -translate-y-1/2
                    text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex justify-end
              border-t border-gray-200
              px-4 py-3 sm:px-5 sm:py-4"
            >
              <button
                type="button"
                onClick={handleApply}
                className="w-full sm:w-auto
                rounded-lg sm:rounded-xl
                bg-[#0079c8]
                px-6 py-2.5
                text-sm font-bold text-white
                transition-colors
                hover:bg-[#0066aa]
                active:scale-95"
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
