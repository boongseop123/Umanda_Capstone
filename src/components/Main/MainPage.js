import React from "react";

import Main from "../Main/Pages/Main";
import Header from "../Main/Pages/Header";
import { useMediaQuery } from "react-responsive";
import styles from "../Main/MainPage.module.scss";

const MainPage = () => {
  //  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  //  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div>
      <div className={styles.Frame1}>
        <Header className={styles.Down} />
        <div className={`${styles.Up} ${styles.Round}`} />
        <Main />
      </div>
    </div>
  );
};

export default MainPage;
