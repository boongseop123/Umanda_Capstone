import React from "react";
import { useNavigate } from "react-router";

import styles from "../Modal/MapModal.module.scss";
import chat from "../resources/chat.png";

const MapModal = () => {
  const navigate = useNavigate();
  const moveToMeet = () => {
    navigate("/meet");
  };
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          padding: "0 20px",
        }}
      >
        <div className={styles.profile}></div>
        <div className={styles.name} style={{ margin: "20px 0" }}>
          <span>kop981020</span>
          <br />
          <br />
          <span style={{ color: "gray" }}>24세 ∙ 남성</span>
          <br />
          <span className={styles.feature}>#문화 #엑티비티</span>
        </div>
        <div>
          <button className={styles.chatButton} onClick={moveToMeet}>
            <p className={styles.spanChat}>채팅</p>
            <img className={styles.chatImg} src={chat}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
