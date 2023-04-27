import React, { useState } from "react";

import { Link } from "react-router-dom";
import hamburger from "./hamburger.png";
import styles from "./ChatHeader.module.scss";
import { useMediaQuery } from "react-responsive";

const ChatHeader = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  /* 헤더 버튼 클릭 시 하나만 밑줄이 생기게 하는 함수 */
  const [selectedLink, setSelectedLink] = useState("");

  return (
    <div
      className={`${
        isDesktop ? styles.headerColumnDesktop : styles.headerColumnMobile
      }`}
    ></div>
  );
};

export default ChatHeader;
