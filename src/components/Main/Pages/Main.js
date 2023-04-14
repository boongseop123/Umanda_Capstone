import React from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import styles from "../Pages/Main.module.scss";
import Accompany30 from "../../../resources/Accompany30.jpeg";
import Meet30 from "../../../resources/Meet30.jpeg";
import Route30 from "../../../resources/Route30.jpeg";

const Main = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div style={{ height: "100%" }}>
      <div>
        <h3
          className={`${styles.desktopTravel} ${
            isDesktop
              ? styles.desktopTravel
              : isMobile
              ? styles.mobileTravel
              : ""
          }`}
        >
          떠나기 좋은 여행 추천
        </h3>
      </div>
      <div>
        <div
          className={`${styles.desktopImgSlide} ${
            isDesktop
              ? styles.desktopImgSlide
              : isMobile
              ? styles.mobileImgSlide
              : ""
          }`}
        ></div>
      </div>
      <div
        className={`${styles.desktopFrame} ${
          isDesktop ? styles.desktopFrame : isMobile ? styles.mobileFrame : ""
        }`}
      >
        <button
          className={`${styles.desktopAccompany} ${
            isDesktop
              ? styles.desktopAccompany
              : isMobile
              ? styles.mobileAccompany
              : ""
          }`}
        >
          <img
            src={Route30}
            className={`${styles.desktopImg} ${
              isDesktop ? styles.desktopImg : isMobile ? styles.mobileImg : ""
            }`}
          ></img>
          <p className={styles.with}>동행</p>
        </button>
        <button
          className={`${styles.desktopAI} ${
            isDesktop ? styles.desktopAI : isMobile ? styles.mobileAI : ""
          }`}
        >
          <img
            src={Accompany30}
            className={`${styles.desktopImg} ${
              isDesktop ? styles.desktopImg : isMobile ? styles.mobileImg : ""
            }`}
          ></img>
          <p className={styles.with}>Ai 경로 추천</p>
        </button>
        <button
          className={`${styles.desktopMeet} ${
            isDesktop ? styles.desktopMeet : isMobile ? styles.mobileMeet : ""
          }`}
        >
          <img
            src={Meet30}
            className={`${styles.desktopImg} ${
              isDesktop ? styles.desktopImg : isMobile ? styles.mobileImg : ""
            }`}
          ></img>
          <p className={styles.with}>만남</p>
        </button>
      </div>
      <div>
        <p className={styles.friend}>
          <span style={{ color: "#A0A0A0" }}>마음 맞는 </span>
          <span style={{ color: "#EF455A" }}>여행 </span>
          <span style={{ color: "#A0A0A0" }}>함께 가는 </span>
          <span style={{ color: "#EF455A" }}>친구</span>
        </p>
      </div>
    </div>
  );
};

export default Main;
