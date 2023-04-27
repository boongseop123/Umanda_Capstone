import React from "react";
import styles from "../Pages/Header.module.scss";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className={styles.Frame}>
      <p>Umanda</p>
      <p>홈</p>
      <p>qna</p>
    </div>
  );
};

export default Header;
