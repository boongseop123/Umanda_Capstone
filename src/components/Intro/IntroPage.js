import React, { useState, useEffect } from "react";
import IntroMain from "./IntroMain";
function IntroPage() {
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowScreen(true);
    }, 2000);
  }, []);

  if (!showScreen) {
    return (
      <div>
        <IntroMain />
      </div>
    );
  }

  return <div></div>;
}

export default IntroPage;
