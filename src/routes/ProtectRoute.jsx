import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SignInModal from "../components/SignInModal";

function ProtectRoute() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(null);

  const checkLogin = () => {
    try {
      const loginUser = JSON.parse(
        localStorage.getItem("trivagoUser") || "null"
      );

      return loginUser?.signedIn === true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setIsLogin(checkLogin());

    const handleAuthChange = () => {
      setIsLogin(checkLogin());
    };

    window.addEventListener(
      "trivago-auth-change",
      handleAuthChange
    );

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(
        "trivago-auth-change",
        handleAuthChange
      );

      window.removeEventListener(
        "storage",
        handleAuthChange
      );
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  const handleClose = () => {
    if (checkLogin()) {
      setIsLogin(true);
    } else {
      navigate("/");
    }
  };

  if (isLogin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="font-semibold text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  if (!isLogin) {
    return (
      <SignInModal
        isOpen={true}
        onClose={handleClose}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return <Outlet />;
}

export default ProtectRoute;