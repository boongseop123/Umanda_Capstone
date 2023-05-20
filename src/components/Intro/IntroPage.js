import React, { useState, useEffect } from "react";
import IntroMain from "./IntroMain";
import LoginPage from "../Login/LoginPage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
      <motion.div
        /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <IntroMain />
      </motion.div>
    );
  }

  return;
  <LoginPage />;
}

export default IntroPage;
