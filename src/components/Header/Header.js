import React, { useState } from "react";

import { Link } from "react-router-dom";
import hamburger from "./hamburger.png";
import styles from "./Header.module.scss";
import { useMediaQuery } from "react-responsive";

const MainHeader = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  /* 헤더 버튼 클릭 시 하나만 밑줄이 생기게 하는 함수 */
  const [selectedLink, setSelectedLink] = useState("");

  return (
    <div
      className={`${
        isDesktop ? styles.headerColumnDesktop : styles.headerColumnMobile
      }`}
    >
      <p
        className={`${styles.desktopUmanda} ${
          isDesktop ? styles.desktopUmanda : styles.mobileUmanda
        }`}
      >
        Umanda
      </p>
      <Link
        to="/main"
        className={`${styles.main} ${
          selectedLink === "main" ? styles.selected : ""
        }`}
      >
        홈
      </Link>
      <Link
        to="/accompany"
        className={`${styles.accompany} ${
          selectedLink === "accompany" ? styles.selected : ""
        }`}
        onClick={() => setSelectedLink("accompany")}
      >
        동행
      </Link>
      <Link
        to="/ai"
        className={`${styles.ai} ${
          selectedLink === "ai" ? styles.selected : ""
        }`}
        onClick={() => setSelectedLink("ai")}
      >
        AI 경로추천
      </Link>
      <Link
        to="/meet"
        className={`${styles.meet} ${
          selectedLink === "meet" ? styles.selected : ""
        }`}
        onClick={() => setSelectedLink("meet")}
      >
        만남
      </Link>
      <img
        src={hamburger}
        className={`${
          isDesktop ? styles.hamburgerDesktop : styles.hamburgerMobile
        }`}
      ></img>
    </div>
  );
};

export default MainHeader;
