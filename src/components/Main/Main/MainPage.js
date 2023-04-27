import React from "react";

import Mainbody from "./Body/MainBody";
import Header from "../../Header/Header";
import { useMediaQuery } from "react-responsive";
import styles from "../Main/MainPage.module.scss";
import MainFooter from "../MainFooter/MainFooter";

const MainPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame2 : styles.mobileFrame2}`}
      >
        <Mainbody />
        <MainFooter />
      </div>
    </div>
  );
};

export default MainPage;
