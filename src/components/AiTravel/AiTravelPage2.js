import React, { useState } from "react";
import styles from "./AiTravelPage.module.scss";
import { useMediaQuery } from "react-responsive";
import button from "../Accompany/Body/resources/button.png";
import Header from "../Header/Header";
import AiTravelProgress2 from "./AiTravelProgress2";
import AiTravelSelect from "./AiTravelSelect";
import AiTravelCountry from "./AiTravelCounrty";

const AiTravelPage2 = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame2 : styles.mobileFrame2}`}
      >
        <AiTravelProgress2 />
        <AiTravelSelect />
        <AiTravelCountry />
      </div>
    </div>
  );
};

export default AiTravelPage2;
