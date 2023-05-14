import React, { useState } from "react";
import styles from "../Page1/AiTravelPage.module.scss";
import { useMediaQuery } from "react-responsive";
import button from "../../Accompany/Body/resources/button.png";
import Header from "../../Header/Header";
import AiTravelProgress2 from "./AiTravelProgress2";
import AiTravelSelect2 from "./AiTravelSelect2";
import AiTravelCountry from "../Page1/AiTravelCounrty";
import AiTravelTrait from "./AiTravelTrait";

const AiTravelPage2 = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleNextStep = (options) => {
    setSelectedOptions(options);
  };

  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame2 : styles.mobileFrame2}`}
      >
        <AiTravelProgress2 />
        <AiTravelSelect2 onNextStep={handleNextStep} />
        <AiTravelTrait selectedOptions={selectedOptions} />
      </div>
    </div>
  );
};

export default AiTravelPage2;
