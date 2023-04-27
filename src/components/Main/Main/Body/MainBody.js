import React from "react";

import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import styles from "../Body/MainBody.module.scss";
import MainFooter from "../../MainFooter/MainFooter";
import Meet30 from "../resources/30 x 30/Meet30.jpeg";
import Route30 from "../resources/30 x 30/Route30.jpeg";
import Accompany30 from "../resources/30 x 30/Accompany30.jpeg";

const Mainbody = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
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
  return (
    <div>
      <div>
        <h3
          className={` ${
            isDesktop ? styles.desktopTravel : styles.mobileTravel
          }`}
        >
          떠나기 좋은 여행 추천
        </h3>
      </div>
      <div>
        <div
          className={` ${
            isDesktop ? styles.desktopImgSlide : styles.mobileImgSlide
          }`}
        ></div>
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame : styles.mobileFrame}`}
      >
        <button
          className={`${
            isDesktop ? styles.desktopAccompany : styles.mobileAccompany
          }`}
          onClick={moveToAccompany}
        >
          <img
            src={Accompany30}
            className={`${isDesktop ? styles.desktopImg : styles.mobileImg}`}
          ></img>
          <p className={styles.with}>동행</p>
          <span className={styles.letter}> &gt;&gt; 여행 동행 찾기</span>
        </button>
        <button
          className={` ${isDesktop ? styles.desktopAI : styles.mobileAI}`}
          onClick={moveToAi}
        >
          <img
            src={Route30}
            className={` ${isDesktop ? styles.desktopImg : styles.mobileImg}`}
          ></img>
          <p className={styles.with}>Ai 경로 추천</p>
          <span className={styles.letter}> &gt;&gt; 경로 검색</span>
        </button>
        <button
          className={`${isDesktop ? styles.desktopMeet : styles.mobileMeet}`}
          onClick={moveToMeet}
        >
          <img
            src={Meet30}
            className={`${isDesktop ? styles.desktopImg : styles.mobileImg}`}
          ></img>
          <p className={styles.with}>만남</p>
          <span className={styles.letter}> &gt;&gt; 나의 친구 만나기</span>
        </button>
      </div>
      <MainFooter />
    </div>
  );
};

export default Mainbody;
