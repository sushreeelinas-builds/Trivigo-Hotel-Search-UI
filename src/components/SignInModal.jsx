import { useEffect, useState } from "react";
import { X, Eye, EyeOff, ChevronLeft } from "lucide-react";


const USERS_KEY = "trivagoUsers";
const USER_KEY = "trivagoUser"; 
const AUTH_EVENT = "trivago-auth-change";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const readJSON = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

async function hashPassword(email, password) {
  const text = `${email.toLowerCase()}:${password}`;
  if (globalThis.crypto?.subtle) {
    const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return btoa(unescape(encodeURIComponent(text))); 
}

const getSession = () => {
  const user = readJSON(USER_KEY, null);
  return user && user.signedIn ? user : null;
};

const startSession = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify({ ...user, signedIn: true }));
  localStorage.setItem("trivagoUserEmail", user.email);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const endSession = () => {
  const user = readJSON(USER_KEY, null);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify({ ...user, signedIn: false }));
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const validatePassword = (password) => {
  if (password.length < 8) return "Use at least 8 characters.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return "Use letters and at least one number.";
  return "";
};

const TITLES = {
  email: "Unlock more savings as a member",
  password: "Welcome back",
  register: "Create your account",
  forgot: "Reset your password",
};

export default function SignInModal() {
  const [user, setUser] = useState(getSession);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sync = () => setUser(getSession());
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setPassword("");
    setError("");
    setBusy(false);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setPassword("");
        setError("");
        setBusy(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const openModal = () => {
    setStep("email");
    setEmail(localStorage.getItem("trivagoUserEmail") || "");
    setName("");
    setPassword("");
    setShowPassword(false);
    setError("");
    setIsOpen(true);
  };

  const goTo = (nextStep) => {
    setStep(nextStep);
    setPassword("");
    setShowPassword(false);
    setError("");
  };

  const finish = (account) => {
    startSession(account);
    closeModal();
  };


  const handleEmail = (e) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return setError("Please enter your email address.");
    if (!EMAIL_PATTERN.test(value)) return setError("Please enter a valid email address.");

    setEmail(value);
    const users = readJSON(USERS_KEY, {});
    return goTo(users[value] ? "password" : "register");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!password) return setError("Please enter your password.");

    setBusy(true);
    const users = readJSON(USERS_KEY, {});
    const account = users[email];
    const hash = await hashPassword(email, password);
    setBusy(false);

    if (!account || account.hash !== hash) return setError("Incorrect email or password.");
    return finish({ email, name: account.name });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your name.");
    const problem = validatePassword(password);
    if (problem) return setError(problem);

    setBusy(true);
    const users = readJSON(USERS_KEY, {});
    users[email] = { name: name.trim(), hash: await hashPassword(email, password) };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setBusy(false);

    return finish({ email, name: name.trim() });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const problem = validatePassword(password);
    if (problem) return setError(problem);

    setBusy(true);
    const users = readJSON(USERS_KEY, {});
    if (!users[email]) {
      setBusy(false);
      return setError("We could not find that account.");
    }
    users[email] = { ...users[email], hash: await hashPassword(email, password) };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setBusy(false);

    return finish({ email, name: users[email].name });
  };

  const socialLogin = (provider) => {
    const account = { email: `${provider.toLowerCase()}.user@example.com`, name: `${provider} User` };
    const users = readJSON(USERS_KEY, {});
    if (!users[account.email]) {
      users[account.email] = { name: account.name, hash: "" };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    localStorage.setItem("trivagoLoginProvider", provider);
    finish(account);
  };

  const signOut = () => {
    setMenuOpen(false);
    endSession();
  };


  if (user) {
    const firstName = (user.name || user.email).split(" ")[0];

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          className="flex items-center gap-2 rounded-xl border border-black bg-white px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0089cf] text-xs font-bold uppercase text-white">
            {firstName.charAt(0)}
          </span>
          <span className="max-w-[90px] truncate">{firstName}</span>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border bg-white p-2 shadow-xl">
              <div className="border-b px-3 py-3">
                <p className="truncate font-bold text-gray-900">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    );
  }


  const inputClass =
    "h-[52px] w-full rounded-[10px] border border-gray-700 px-3.5 text-sm text-gray-900 outline-none focus:border-[#0089cf] focus:ring-2 focus:ring-blue-100";
  const primaryClass =
    "mt-4 h-[44px] w-full rounded-[10px] bg-[#0089cf] text-sm font-bold text-white transition-all hover:bg-[#006eaa] disabled:cursor-not-allowed disabled:bg-[#d6d6d6]";
  const socialClass =
    "relative flex h-[47px] w-full items-center justify-center rounded-[10px] border border-gray-500 bg-white text-[15px] font-bold text-black transition-all hover:bg-gray-50";

  const passwordField = (label, autoComplete) => (
    <>
      <label htmlFor="auth-password" className="mb-1.5 mt-4 block text-sm font-semibold text-black">
        {label}
      </label>
      <div className="relative">
        <input
          id="auth-password"
          type={showPassword ? "text" : "password"}
          value={password}
          autoFocus
          autoComplete={autoComplete}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="Enter password"
          className={`${inputClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-xl border border-black bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
      >
        Sign in
      </button>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111827]/80 px-4 py-6"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={TITLES[step]}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-[464px] overflow-y-auto rounded-[10px] bg-white p-[18px] shadow-2xl"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-5 top-6 rounded-full p-1 text-black hover:bg-gray-100"
            >
              <X size={21} />
            </button>

            <h1 className="mb-3 text-[34px] font-extrabold leading-tight tracking-tight">
              <span className="text-[#e92e58]">tri</span>
              <span className="text-[#ff7935]">va</span>
              <span className="text-[#0089cf]">go</span>
            </h1>

            {step !== "email" && (
              <button
                type="button"
                onClick={() => goTo("email")}
                className="mb-2 flex items-center gap-1 text-sm font-semibold text-[#0089cf] hover:underline"
              >
                <ChevronLeft size={16} /> {email}
              </button>
            )}

            <h2 className={`${step === "email" ? "mb-10" : "mb-2"} text-[25px] font-bold leading-tight text-black`}>
              {TITLES[step]}
            </h2>

            {step === "email" && (
              <>
                <div className="space-y-3">
                  <button type="button" onClick={() => socialLogin("Google")} className={socialClass}>
                    <span className="absolute left-5 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 bg-clip-text text-[25px] font-extrabold text-transparent">
                      G
                    </span>
                    Google
                  </button>
                  <button type="button" onClick={() => socialLogin("Apple")} className={socialClass}>
                    <span className="absolute left-5 text-[22px] text-black"></span>
                    Apple
                  </button>
                  <button type="button" onClick={() => socialLogin("Facebook")} className={socialClass}>
                    <span className="absolute left-5 flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[#1877F2] text-xl font-bold text-white">
                      f
                    </span>
                    Facebook
                  </button>
                </div>
                <p className="mt-2 text-center text-[11px] text-gray-500">
                  Demo: social buttons sign you in with a sample account.
                </p>

                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-300" />
                  <span className="text-sm text-gray-500">or</span>
                  <div className="h-px flex-1 bg-gray-300" />
                </div>

                <form onSubmit={handleEmail} noValidate>
                  <label htmlFor="auth-email" className="mb-1.5 block text-sm font-semibold text-black">
                    Email
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter email address"
                    className={inputClass}
                  />
                  {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                  <button type="submit" disabled={!email.trim()} className={primaryClass}>
                    Continue with email
                  </button>
                </form>
              </>
            )}

            {step === "password" && (
              <form onSubmit={handleSignIn} noValidate>
                {passwordField("Password", "current-password")}
                {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                <button type="submit" disabled={busy || !password} className={primaryClass}>
                  {busy ? "Signing in…" : "Sign in"}
                </button>
                <button
                  type="button"
                  onClick={() => goTo("forgot")}
                  className="mt-3 text-sm font-semibold text-[#0089cf] hover:underline"
                >
                  Forgot password?
                </button>
              </form>
            )}

            {step === "register" && (
              <form onSubmit={handleRegister} noValidate>
                <p className="text-sm text-gray-600">We couldn’t find an account for this email, so let’s create one.</p>
                <label htmlFor="auth-name" className="mb-1.5 mt-4 block text-sm font-semibold text-black">
                  Full name
                </label>
                <input
                  id="auth-name"
                  value={name}
                  autoFocus
                  autoComplete="name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your name"
                  className={inputClass}
                />
                {passwordField("Create password", "new-password")}
                <p className="mt-1 text-xs text-gray-500">At least 8 characters, with letters and a number.</p>
                {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                <button type="submit" disabled={busy} className={primaryClass}>
                  {busy ? "Creating account…" : "Create account"}
                </button>
              </form>
            )}

            {step === "forgot" && (
              <form onSubmit={handleReset} noValidate>
                <p className="text-sm text-gray-600">
                  Demo only: no email is sent. Choose a new password to reset it right here.
                </p>
                {passwordField("New password", "new-password")}
                {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                <button type="submit" disabled={busy || !password} className={primaryClass}>
                  {busy ? "Saving…" : "Reset password and sign in"}
                </button>
              </form>
            )}

            <p className="mt-6 px-3 pb-3 text-[12px] leading-[21px] text-gray-800">
              By creating an account, you agree to our{" "}
              <a href="/privacy" className="text-[#0089cf] hover:underline">
                Privacy policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-[#0089cf] hover:underline">
                Terms of use
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}