import React from "react";
import styles from "../Page1/AiTravelPage.module.scss";
import { useMediaQuery } from "react-responsive";
import button from "../../Accompany/Body/resources/button.png";
import Header from "../../Header/Header";
import AiTravelProgress3 from "../Page2/AiTravelProgress3";
import AiTravelSelect3 from "./AiTravelSelect3";
import AiTravelCalender from "../Page2/AiTravelCalender";

const AiTravelPage3 = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame2 : styles.mobileFrame2}`}
      >
        <AiTravelProgress3 />
        <AiTravelSelect3 />
        <AiTravelCalender />
      </div>
    </div>
  );
};

export default AiTravelPage3;
