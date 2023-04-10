import React, { useState, useEffect } from "react";
import IntroMain from "./IntroMain";
import LoginPage from "../Login/LoginPage";
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const [showScreen, setShowScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!showScreen) {
    return (
      <div>
        <IntroMain />
      </div>
    );
  }

  return;
  <LoginPage />;
}

export default IntroPage;
