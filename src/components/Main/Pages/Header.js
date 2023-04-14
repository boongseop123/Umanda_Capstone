import React from "react";
import styles from "../Pages/Header.module.scss";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className={styles.headerColumn}>
      <p
        className={`${styles.desktopUmanda} ${
          isDesktop ? styles.desktopUmanda : isMobile ? styles.mobileUmanda : ""
        }`}
      >
        Umanda
      </p>
      <p className={styles.home}>홈</p>
      <p className={styles.QnA}>Q&A</p>
    </div>
  );
};

export default Header;
