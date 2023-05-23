import React, { useState } from "react";

import styles from "./ChatHeader.module.scss";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import profile from "./profile.png";

const ChatHeader = ({}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/meet");
  };

  return (
    <div
      className={`${
        isDesktop ? styles.headerColumnDesktop : styles.headerColumnMobile
      }`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        <button className={styles.backButtonDesktop} onClick={goBack}></button>
        <h3 style={{ marginLeft: "20px", marginTop: "30px" }}>{}</h3>
      </div>
    </div>
  );
};

export default ChatHeader;
