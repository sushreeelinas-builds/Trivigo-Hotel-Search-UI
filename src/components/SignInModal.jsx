
import { useState } from "react";
import { X } from "lucide-react";

export default function SignInModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();

    const emailValue = email.trim();

    if (!emailValue) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Save email in localStorage
    localStorage.setItem("trivagoUserEmail", emailValue);

    localStorage.setItem(
      "trivagoUser",
      JSON.stringify({
        email: emailValue,
        signedIn: false,
      })
    );

    setError("");

    alert("Email saved successfully!");
    setIsOpen(false);
  };

  const socialLogin = (provider) => {
    // Demo only: this does not authenticate with the provider.
    localStorage.setItem("trivagoLoginProvider", provider);
    alert(`${provider} sign-in requires authentication integration.`);
  };

  return (
    <>
      {/* Sign In Button */}
<button
  onClick={() => setIsOpen(true)}
  className="rounded-xl border border-black
  bg-white px-5 py-2.5 text-sm font-semibold
  text-gray-900 transition-all duration-300
  hover:bg-black hover:text-white
  active:scale-95"
>
  Sign in
</button>

      {/* Sign In Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center
          justify-center bg-[#111827]/80 px-4 py-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[464px]
            max-h-[90vh] overflow-y-auto rounded-[10px]
            bg-white p-[18px] shadow-2xl
            animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-6 rounded-full
              p-1 text-black hover:bg-gray-100"
            >
              <X size={21} />
            </button>

            {/* Logo */}
            <h1 className="mb-3 text-[34px] font-extrabold
            leading-tight tracking-tight">
              <span className="text-[#e92e58]">tri</span>
              <span className="text-[#ff7935]">va</span>
              <span className="text-[#0089cf]">go</span>
            </h1>

            {/* Heading */}
            <h2 className="mb-16 text-[25px] font-bold
            leading-tight text-black">
              Unlock more savings as a member
            </h2>

            {/* Social Login */}
            <div className="space-y-3">

              {/* Google */}
              <button
                onClick={() => socialLogin("Google")}
                className="relative flex h-[47px] w-full
                items-center justify-center rounded-[10px]
                border border-gray-500 bg-white
                text-[15px] font-bold text-black
                transition-all hover:bg-gray-50"
              >
                <span className="absolute left-5 text-[25px]
                font-extrabold text-[#4285F4]">
                  <span className="bg-gradient-to-r from-blue-500
                  via-green-500 to-red-500 bg-clip-text text-transparent">
                    G
                  </span>
                </span>
                Google
              </button>

              {/* Apple */}
              <button
                onClick={() => socialLogin("Apple")}
                className="relative flex h-[47px] w-full
                items-center justify-center rounded-[10px]
                border border-gray-500 bg-white
                text-[15px] font-bold text-black
                transition-all hover:bg-gray-50"
              >
                <span className="absolute left-5 text-[24px] text-black">
                  
                </span>
                Apple
              </button>

              {/* Facebook */}
              <button
                onClick={() => socialLogin("Facebook")}
                className="relative flex h-[47px] w-full
                items-center justify-center rounded-[10px]
                border border-gray-500 bg-white
                text-[15px] font-bold text-black
                transition-all hover:bg-gray-50"
              >
                <span className="absolute left-5 flex h-[27px]
                w-[27px] items-center justify-center
                rounded-full bg-[#1877F2] text-xl font-bold
                text-white">
                  f
                </span>
                Facebook
              </button>
            </div>

            {/* OR divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleContinue}>
              <label className="mb-1.5 block text-sm
              font-semibold text-black">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter email address"
                className="h-[52px] w-full rounded-[10px]
                border border-gray-700 px-3.5 text-sm
                text-gray-900 outline-none
                focus:border-[#0089cf]
                focus:ring-2 focus:ring-blue-100"
              />

              {error && (
                <p className="mt-2 text-xs text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!email.trim()}
                className="mt-2 h-[40px] w-full rounded-[10px]
                bg-[#0089cf] text-sm font-bold text-white
                transition-all hover:bg-[#006eaa]
                disabled:cursor-not-allowed
                disabled:bg-[#d6d6d6]"
              >
                Continue with email
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 px-3 pb-3 text-[12px]
            leading-[21px] text-gray-800">
              By creating an account, you agree to our{" "}
              <a href="/privacy" className="text-[#0089cf] hover:underline">
                Privacy policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-[#0089cf] hover:underline">
                Terms of use
              </a>.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
