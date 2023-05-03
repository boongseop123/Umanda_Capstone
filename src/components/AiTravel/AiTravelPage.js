import React, { useState } from "react";
import styles from "./AiTravelPage.module.scss";
import { useMediaQuery } from "react-responsive";
import button from "../Accompany/Body/resources/button.png";
import Header from "../Header/Header";
import AiTravelProgress from "./AiTravelProgress";
import AiTravelSelect from "./AiTravelSelect";

const AiTravelPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame2 : styles.mobileFrame2}`}
      >
        <AiTravelProgress />
        <AiTravelSelect />
      </div>
    </div>
  );
};

export default AiTravelPage;
