
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [country, setCountry] = useState("India");

  const countries = [
    { name: "India", flag: "🇮🇳" },
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "France", flag: "🇫🇷" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Japan", flag: "🇯🇵" },
  ];

  const companyLinks = [
    "About us",
    "Jobs",
    "Investor relations",
    "Press",
  ];

  const productLinks = [
    "Mobile apps - searching on the go",
    "trivago for hoteliers",
  ];

  const policyLinks = [
    "Terms and conditions",
    "Legal information",
    "Privacy notice",
    "DSA information",
    "Do Not Sell My Personal Information",
    "Vulnerability Disclosure Programme",
  ];

  const supportLinks = [
    "Help centre",
    "Learn how trivago works",
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://facebook.com",
      label: "Facebook",
      hover: "hover:bg-blue-600",
    },
    {
      icon: FaXTwitter,
      url: "https://x.com",
      label: "X",
      hover: "hover:bg-gray-500",
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com",
      label: "Instagram",
      hover: "hover:bg-pink-600",
    },
    {
      icon: FaYoutube,
      url: "https://youtube.com",
      label: "YouTube",
      hover: "hover:bg-red-600",
    },
    {
      icon: FaLinkedinIn,
      url: "https://linkedin.com",
      label: "LinkedIn",
      hover: "hover:bg-blue-700",
    },
  ];

  return (
    <footer className="w-full bg-[#171717] h-[] text-white px-5 sm:px-10 lg:px-16 pt-10">

      <div className="max-w-[1600px] mx-auto ">

        {/* TOP HEADER */}
        <div className="flex items-center justify-between mb-10 ">

          {/* Trivago Logo */}
          <a
            href="#"
            className="text-2xl font-extrabold tracking-tight"
          >
            <span className="text-white">trivago</span>
          </a>

          {/* Social Media Icons */}
          <div className="flex items-center gap-1">

            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`w-6 h-4 flex items-center justify-center rounded-full bg-white text-black ${social.hover} hover:text-white transition-all duration-300 hover:-translate-y-1`}
                >
                  <Icon size={15} />
                </a>
              );
            })}

          </div>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap- lg:gap-10">

          {/* COLUMN 1 */}
          <div className="space-y-2">

            {/* COUNTRY SELECTOR */}
            <div>
              <label
                htmlFor="country"
                className="block text-base mb-3 text-[15px]"
              >
                Choose your country
              </label>

              <div className="relative max-w-[325px]">

                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full appearance-none bg-transparent border border-gray-600 rounded-xl px-4 py-2 pr-12 outline-none hover:border-white focus:border-blue-500 cursor-pointer text-white"
                >
                  {countries.map((item) => (
                    <option
                      key={item.name}
                      value={item.name}
                      className="bg-[#171717] text-white"
                    >
                      {item.flag} {item.name}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={21}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />

              </div>
            </div>

            {/* GOOGLE BUTTON */}
            <div>
              <a
                href="https://www.google.com/preferences/source"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black rounded-lg px-2 py-1 font-bold hover:bg-gray-200 transition-all duration-300"
              >
                <span className="text-x font-bold text-[#4285F4]">
                  G
                </span>

                Add on Google
              </a>

              <p className="text-sm leading-6 text-gray-300 max-w-[300px] mt-3">
                Find our results easily: add trivago as a
                preferred source on Google.
              </p>
            </div>

            {/* COMPANY LINKS */}
            <div>
              <h3 className="text-x font-bold mb-">
                Company
              </h3>

              <div className="flex flex-col gap-3">

                {companyLinks.map((link) => (
                  <a
                    href="#"
                    key={link}
                    className="text-base w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
                  >
                    {link}
                  </a>
                ))}

              </div>
            </div>

            {/* PRODUCT LINKS */}
            <div>
              <h3 className="text-x font-bold mb-">
                Our products
              </h3>

              <div className="flex flex-col gap-">

                {productLinks.map((link) => (
                  <a
                    href="#"
                    key={link}
                    className="text-base w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
                  >
                    {link}
                  </a>
                ))}

              </div>
            </div>

          </div>

          {/* COLUMN 2 */}
          <div className="space-y-8">

            {/* TERMS AND POLICIES */}
            <div>
              <h3 className="text-x font-bold mb-3">
                Terms and policies
              </h3>

              <div className="flex flex-col text-x gap-2">

                {policyLinks.map((link) => (
                  <a
                    href="#"
                    key={link}
                    className="text-base w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
                  >
                    {link}
                  </a>
                ))}

              </div>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-x font-bold mb-2">
                Support
              </h3>

              <div className="flex flex-col gap-3">

                {supportLinks.map((link) => (
                  <a
                    href="#"
                    key={link}
                    className="text-base w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300"
                  >
                    {link}
                  </a>
                ))}

              </div>
            </div>

          </div>

          {/* COLUMN 3 */}
          <div className="space-y-8">

            {/* SIGN IN CARD */}
            <div className="border-2 border-[#008bd2] rounded-xl p-2 sm:p-5">

              <h2 className="text-x sm:text-xl font-bold mb-3">
                Sign in for member-exclusive benefits
              </h2>

              {/* Benefits */}
              <div className="space-y-2 mb-3">

                <p className="flex items-center gap-2 text-base">
                  <Check
                    size={15}
                    strokeWidth={3}
                  />
                  Personalise your experience
                </p>

                <p className="flex items-center gap-2 text-base">
                  <Check
                    size={15}
                    strokeWidth={3}
                  />
                  Loyalty deals and member prices
                </p>

              </div>

              {/* Sign In Button */}
              <button
                onClick={() => alert("Sign in clicked!")}
                className="w-full bg-[#0783c5] hover:bg-[#006ba5] text-white font-bold text-lg py-2 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Sign in
              </button>

            </div>

            {/* COMPANY ADDRESS */}
            <div className="text-sm text-gray-300 leading-7">

              <p>
                <span className="font-bold text-white">
                  trivago N.V.,
                </span>{" "}
                Kesselstraße 5 – 7, 40221 Düsseldorf, Germany
              </p>

              <p>
                Copyright 2026 trivago | All rights reserved.
              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM BORDER */}
        <div className="border-t border-gray-800 mt-10 pt-5 text-center text-xs text-gray-500">
          Hotel search made easy with trivago.
        </div>

      </div>

    </footer>
  );
}
