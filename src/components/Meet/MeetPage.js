import React from "react";
import styles from "./MeetPage.module.scss";
import { useMediaQuery } from "react-responsive";
import Header from "../Header/Header";
import Meetbody from "./Body/MeetBody";
import Footer from "../Footer/Footer";

const MeetPage = () => {
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
        <Meetbody />
        <Footer />
      </div>
    </div>
  );
};

export default MeetPage;
