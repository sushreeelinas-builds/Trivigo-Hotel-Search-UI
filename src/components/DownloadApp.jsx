
import { Check, Bell, ShieldCheck } from "lucide-react";

export default function DownloadApp() {
  return (
    <section className="w-full bg-white px-4 sm:px-8 lg:px-16 py-5">

      <div className="relative max-w-[1255px] mx-auto bg-[#df2450] rounded-2xl overflow-hidden h-[350px] min-h-[300px]">

        <div className="max-w-[11130px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center min-h-[430px] px-6 sm:px-10 lg:px-16">

          {/* LEFT CONTENT */}
          <div className="relative z-5 text-white px-15 py- md:py-">

            <h1 className="text-xl sm:text-xl font-bold mb-4">
              Download the trivago app
            </h1>

            {/* Benefits */}
            <div className="space-y-1 text-base sm:text-">
              <p className="flex items-center gap-1">
                <Check size={19} strokeWidth={3} />
                Get notified when prices drop
              </p>

              <p className="flex items-center gap-2 mb-10">
                <Check size={19} strokeWidth={3} />
                Unlock app exclusive deals
              </p>
            </div>

            {/* QR + Statistics */}
            <div className="flex flex-col sm:flex-row items-center gap-7 mt-2">

              {/* QR Code */}
              <div className="bg-white p-2 mb-20 rounded-xl w-30 h-30 shrink-0">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://www.trivago.com/"
                  alt="Scan to download Trivago"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Stats and buttons */}
              <div className="flex flex-col gap-6">

                <div className="flex items-center gap-7">

                  <div>
                    <h2 className="text-2xl sm:text-2xl font-bold">
                      170M+
                    </h2>
                    <p className="text-base">Downloads</p>
                  </div>

                  <div className="w-px h-16 bg-white/80"></div>

                  <div>
                    <h2 className="text-3xl sm:text-2xl font-bold">
                      1M+
                    </h2>
                    <p className="text-base whitespace-nowrap">
                      5-star reviews
                    </p>
                  </div>

                </div>

                
<div className="flex flex-row items-center gap-4 flex-nowrap">

  {/* Google Play */}
  <a
    href="https://play.google.com/store/apps/details?id=com.trivago"
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center bg-black border border-white/70 rounded-lg px-3 mb-25 py-2 w-[162px] h-[50px] shrink-0 hover:scale-105 transition-transform"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      alt="Get it on Google Play"
      className="w-full h-full object-contain"
    />
  </a>

  {/* App Store */}
  <a
    href="https://apps.apple.com/app/trivago-hotels-travel/id376888389"
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center mb-25 bg-black border border-white/70 rounded-lg px-3 py-2 w-[162px] h-[50px] shrink-0 hover:scale-105 transition-transform"
  >
    <img
      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
      alt="Download on the App Store"
      className="w-full h-full object-contain"
    />
  </a>

</div>


              </div>
            </div>
          </div>

          {/* RIGHT PHONE MOCKUP */}
          <div className="relative hidden md:flex justify-center items-end h-[430px]">

            {/* Phone */}
            <div className="relative z-10 w-[255px] h-[400px] mb-10 bg-black rounded-[40px] border-[5px] border-gray-500 p-[9px] shadow-2xl translate-y-10">

              <div className="w-full h-full bg-white rounded-[29px] overflow-hidden">

                {/* Logo */}
                <div className="h-[110px] flex justify-center items-center">
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    <span className="text-[#df2450]">tri</span>
                    <span className="text-[#ff9d24]">va</span>
                    <span className="text-[#078bd2]">go</span>
                  </h2>
                </div>

                {/* Hotel Image */}
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600"
                  alt="Hotel building"
                  className="w-full h-[100px] object-cover"
                />

                {/* Hotel Details */}
                <div className="p-1 text-black">
                  <h3 className="text- font-extrabold leading-4">
                    The New Yorker,
                    <br />
                    A Wyndham Hotel
                  </h3>

                  <div className="flex text-xl mt-1 ">
                    ★★★★★
                  </div>
                </div>

              </div>
            </div>

            {/* Price drop notification */}
            <div className="absolute z-20 top-[133px] -left-1 right-0 mx-auto w-[310px] max-w-full bg-[#20ae2c] rounded-full py-3 px-5 flex items-center justify-center gap-3 text-white shadow-lg animate-bounce">
              <Bell size={23} fill="white" />
              <span className="text-xl font-bold whitespace-nowrap">
                10% price drop
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
