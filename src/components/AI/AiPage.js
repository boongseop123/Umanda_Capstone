import React from "react";

import { useMediaQuery } from "react-responsive";
import styles from "./AiPage.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AiBody from "./Body/AiBody";

const AiPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
      </div>
      <div
        className={`${styles.desktopFrame2} ${
          isDesktop ? styles.desktopFrame2 : styles.mobileFrame2
        }`}
      >
        <AiBody />
        <Footer />
      </div>
    </div>
  );
};

export default AiPage;
