import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./AiTravelMain.module.scss";

const AiTravelProgress = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div style={{ height: "100%" }} className={styles.fonts}>
      <div
        className={`${
          isDesktop ? styles.CategoryDesktop : styles.CategoryMobile
        }`}
      >
        <br></br>
        <br></br>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 17,
            fontWeight: 600,
          }}
        >
          <div style={{ marginRight: "16px", textAlign: "center" }}>
            <input
              type="radio"
              disabled={true}
              style={{
                marginBottom: "4px",
                appearance: "none",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                border: "2px solid #ef455a",
                backgroundColor: "#fff",
              }}
              checked={true}
            />
            <div>여행 국가</div>
          </div>
          <div style={{ marginRight: "16px", textAlign: "center" }}>
            <input
              type="radio"
              disabled={true}
              style={{
                marginBottom: "4px",
                appearance: "none",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                border: "2px solid gray",
                backgroundColor: "#fff",
              }}
              checked={true}
            />
            <div>체류 기간</div>
          </div>
          <div style={{ marginRight: "16px", textAlign: "center" }}>
            <input
              type="radio"
              disabled={true}
              style={{
                marginBottom: "4px",
                appearance: "none",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                border: "2px solid gray",
                backgroundColor: "#fff",
              }}
              checked={true}
            />
            <div>여행 테마</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <input
              type="radio"
              disabled={true}
              style={{
                marginBottom: "4px",
                appearance: "none",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                border: "2px solid gray",
                backgroundColor: "#fff",
              }}
              checked={true}
            />
            <div>이동 수단</div>
          </div>
        </div>
        <div className={styles.FormHorizontal}></div>
      </div>
    </div>
  );
};

export default AiTravelProgress;
