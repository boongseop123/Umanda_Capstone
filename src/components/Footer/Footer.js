import React from "react";

import styles from "./Footer.module.scss";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div>
      <p
        className={`${isDesktop ? styles.friendDesktop : styles.friendMobile}`}
      >
        <span style={{ color: "#A0A0A0" }}>마음 맞는</span>
        <span style={{ color: "#EF455A" }}>여행 </span>
        <span style={{ color: "#A0A0A0" }}>함께 가는 </span>
        <span style={{ color: "#EF455A" }}>친구</span>
      </p>
    </div>
  );
};

export default Footer;
