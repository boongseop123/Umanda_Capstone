import React from "react";
import Main from "../Main/Pages/Main";
import Header from "../Main/Pages/Header";
import { useMediaQuery } from "react-responsive";
import styles from "../Main/MainPage.module.scss";
import Accompany30 from "../../resources/Accompany30.jpeg";
import Meet30 from "../../resources/Meet30.jpeg";
import Route30 from "../../resources/Route30.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();
  const moveToAi = () => {
    navigate("/ai");
  };
  const moveToMeet = () => {
    navigate("/meet");
  };
  const moveToAccompany = () => {
    navigate("/accompany");
  };
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleButtonPress = () => {
    setIsButtonPressed(true);
  };

  const handleButtonRelease = () => {
    setIsButtonPressed(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
      className={`${styles.Frame} ${
        isDesktop ? styles.desktop : isMobile ? styles.mobile : ""
      }`}
    >
      <div
        className={styles.header}
        style={{
          position: "absolute",
          top: 0,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className={styles.home1}>Umanda</div>
        <div className={styles.home}>홈</div>
        <div className={styles.home}>Q&A</div>
      </div>
      <div className={styles.main}>
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
        <div>
          <div className={styles.img1}>
            <div style={{ position: "relative" }}>
              <img
                className={styles.img}
                src={require("../../resources/London.jpeg")}
              />
            </div>
            <div
              className={styles.imgtext}
              style={{
                position: "absolute",
                top: "20%",
                left: "18%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            >
              <br></br>
              <span
                className={styles.span1}
                style={{ display: "block", textAlign: "left" }}
              >
                딱 맞는 여행
              </span>
              <br></br>
              <span
                className={styles.span1}
                style={{ display: "block", textAlign: "left" }}
              >
                어디가 좋을까?
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${styles.desktopFrame} ${
            isDesktop ? styles.desktopFrame : isMobile ? styles.mobileFrame : ""
          }`}
        >
          <button
            onClick={moveToAccompany}
            className={`${styles.desktopAccompany} ${
              isDesktop
                ? styles.desktopAccompany
                : isMobile
                ? styles.mobileAccompany
                : ""
            } button${isButtonPressed ? " pressed" : ""}`}
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onMouseLeave={handleButtonRelease}
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
            } button${isButtonPressed ? " pressed" : ""}`}
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onMouseLeave={handleButtonRelease}
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
              isButtonPressed ? "pressed" : ""
            } ${
              isDesktop ? styles.desktopMeet : isMobile ? styles.mobileMeet : ""
            }`}
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onMouseLeave={handleButtonRelease}
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
    </div>
  );
};

export default MainPage;
