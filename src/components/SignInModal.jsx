
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
    const buffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(text)
    );

    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  return btoa(unescape(encodeURIComponent(text)));
}

const getSession = () => {
  const user = readJSON(USER_KEY, null);
  return user?.signedIn ? user : null;
};

const startSession = (user) => {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({ ...user, signedIn: true })
  );

  localStorage.setItem("trivagoUserEmail", user.email);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const endSession = () => {
  const user = readJSON(USER_KEY, null);

  if (user) {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ ...user, signedIn: false })
    );
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
};

const validatePassword = (password) => {
  if (password.length < 8) {
    return "Use at least 8 characters.";
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Use letters and at least one number.";
  }

  return "";
};

const TITLES = {
  email: "Unlock more savings as a member",
  password: "Welcome back",
  register: "Create your account",
};

export default function SignInModal({
  isOpen: externalIsOpen = false,
  onClose,
  onLoginSuccess,
}) {
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

  // Listen for login/logout changes.
  useEffect(() => {
    const sync = () => setUser(getSession());

    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Open modal when HotelDetails requests it.
  useEffect(() => {
    if (externalIsOpen) {
      setStep("email");
      setEmail(localStorage.getItem("trivagoUserEmail") || "");
      setName("");
      setPassword("");
      setShowPassword(false);
      setError("");
      setIsOpen(true);
    }
  }, [externalIsOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setPassword("");
    setError("");
    setBusy(false);
    onClose?.();
  };

  // Escape key and background scroll handling.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
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

  // Open sign-in modal.
  const openModal = () => {
    setStep("email");
    setEmail(localStorage.getItem("trivagoUserEmail") || "");
    setName("");
    setPassword("");
    setShowPassword(false);
    setError("");
    setIsOpen(true);
  };

  // Change modal step.
  const goTo = (nextStep) => {
    setStep(nextStep);
    setPassword("");
    setShowPassword(false);
    setError("");
  };

  // Shared success handler.
  const finish = (account) => {
    startSession(account);
    setUser(getSession());
    setMenuOpen(false);
    closeModal();

    alert(
      `Sign in successful! Welcome, ${account.name || account.email}.`
    );

    onLoginSuccess?.();
  };

  // Email verification.
  const handleEmail = (e) => {
    e.preventDefault();

    const value = email.trim().toLowerCase();

    if (!value) {
      return setError("Please enter your email address.");
    }

    if (!EMAIL_PATTERN.test(value)) {
      return setError("Please enter a valid email address.");
    }

    setEmail(value);

    const users = readJSON(USERS_KEY, {});

    goTo(users[value] ? "password" : "register");
  };

  // Existing account sign-in.
  const handleSignIn = async (e) => {
    e.preventDefault();

    const users = readJSON(USERS_KEY, {});
    const account = users[email];

    if (!account) {
      return setError("Account not found.");
    }

    setBusy(true);
    setError("");

    try {
      const passwordHash = await hashPassword(email, password);

      if (passwordHash !== account.hash) {
        setError("Incorrect password. Please try again.");
        return;
      }

      finish({
        email,
        name: account.name,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // New account registration.
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return setError("Please enter your name.");
    }

    const problem = validatePassword(password);

    if (problem) {
      return setError(problem);
    }

    setBusy(true);
    setError("");

    try {
      const users = readJSON(USERS_KEY, {});

      users[email] = {
        name: name.trim(),
        hash: await hashPassword(email, password),
      };

      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      finish({
        email,
        name: name.trim(),
      });
    } catch {
      setError("Unable to create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // Sign out.
  const signOut = () => {
    setMenuOpen(false);
    endSession();
    setUser(null);
  };

  const inputClass =
    "h-[52px] w-full rounded-[10px] border border-gray-700 px-3.5 text-sm text-gray-900 outline-none focus:border-[#0089cf] focus:ring-2 focus:ring-blue-100";

  const primaryClass =
    "mt-4 h-[44px] w-full rounded-[10px] bg-[#0089cf] text-sm font-bold text-white transition-all hover:bg-[#006eaa] disabled:cursor-not-allowed disabled:bg-[#d6d6d6]";

  // Password input field.
  const passwordField = (label, autoComplete) => (
    <>
      <label
        htmlFor="auth-password"
        className="mb-1.5 mt-4 block text-sm font-semibold text-black"
      >
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

  // Signed-in account menu.
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

          <span className="max-w-[90px] truncate">
            {firstName}
          </span>
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />

            <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border bg-white p-2 shadow-xl">
              <div className="border-b px-3 py-3">
                <p className="truncate font-bold text-gray-900">
                  {user.name}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>
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
                <ChevronLeft size={16} />
                {email}
              </button>
            )}

            <h2
              className={`${
                step === "email" ? "mb-10" : "mb-2"
              } text-[25px] font-bold leading-tight text-black`}
            >
              {TITLES[step]}
            </h2>

            {/* Email step */}
            {step === "email" && (
              <form onSubmit={handleEmail} noValidate>
                <label
                  htmlFor="auth-email"
                  className="mb-1.5 block text-sm font-semibold text-black"
                >
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

                {error && (
                  <p className="mt-2 text-xs text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!email.trim()}
                  className={primaryClass}
                >
                  Continue with email
                </button>
              </form>
            )}

            {/* Existing account password step */}
            {step === "password" && (
              <form onSubmit={handleSignIn} noValidate>
                {passwordField("Password", "current-password")}

                {error && (
                  <p className="mt-2 text-xs text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy || !password}
                  className={primaryClass}
                >
                  {busy ? "Signing in…" : "Sign in"}
                </button>
              </form>
            )}

            {/* Registration step */}
            {step === "register" && (
              <form onSubmit={handleRegister} noValidate>
                <p className="text-sm text-gray-600">
                  We couldn’t find an account for this email, so let’s
                  create one.
                </p>

                <label
                  htmlFor="auth-name"
                  className="mb-1.5 mt-4 block text-sm font-semibold text-black"
                >
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

                <p className="mt-1 text-xs text-gray-500">
                  At least 8 characters, with letters and a number.
                </p>

                {error && (
                  <p className="mt-2 text-xs text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className={primaryClass}
                >
                  {busy ? "Creating account…" : "Create account"}
                </button>
              </form>
            )}

            <p className="mt-6 px-3 pb-3 text-[12px] leading-[21px] text-gray-800">
              By creating an account, you agree to our{" "}
              <a
                href="/privacy"
                className="text-[#0089cf] hover:underline"
              >
                Privacy policy
              </a>{" "}
              and{" "}
              <a
                href="/terms"
                className="text-[#0089cf] hover:underline"
              >
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
