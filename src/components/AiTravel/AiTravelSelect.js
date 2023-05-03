import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./AiTravelSelect.module.scss";
import refresh from "./resource/refresh.png";
import arrow from "./resource/arrow.png";

const AiTravelSelect = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div style={{ height: "100%" }}>
      <div
        className={`${
          isDesktop ? styles.CategoryDesktop : styles.CategoryMobile
        }`}
      >
        <br></br>
        <br></br>
        <label style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className={styles.refresh}>초기화</div>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={refresh}
                alt="your-image-description-here"
                style={{ width: "16px" }}
              />
            </span>
            <div className={styles.next_step}>다음 단계</div>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={arrow}
                alt="your-image-description-here"
                style={{ width: "16px", filter: "hue-rotate(340deg)" }}
              />
            </span>
          </div>
        </label>
        <div>123</div>
      </div>
    </div>
  );
};

export default AiTravelSelect;
