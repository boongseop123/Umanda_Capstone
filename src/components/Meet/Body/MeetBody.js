import React from "react";

import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import styles from "../Body/MeetBody.module.scss";
import profile from "../resources/profile.png";
const MeetBody = () => {
  const navigate = useNavigate();

  const confirm = () => {
    console.log(navigate("/chat"));
  };

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div>
      <h2 style={{ margin: "30px" }}>Chat</h2>
      <div className={styles.container}>
        <div
          onClick={confirm} //확인버튼, 추후에 삭제 예정
          className={isDesktop ? styles.ChatListDesktop : styles.ChatListMobile}
        >
          <img
            src={profile}
            className={isDesktop ? styles.profileDesktop : styles.profileMobile}
          ></img>
        </div>
        <div
          className={isDesktop ? styles.ChatListDesktop : styles.ChatListMobile}
        ></div>
        <div
          className={isDesktop ? styles.ChatListDesktop : styles.ChatListMobile}
        ></div>
        <div
          className={isDesktop ? styles.ChatListDesktop : styles.ChatListMobile}
        ></div>
        <div
          className={isDesktop ? styles.ChatListDesktop : styles.ChatListMobile}
        ></div>
        <div
          className={isDesktop ? styles.ChatListDesktop : styles.ChatListMobile}
        ></div>
      </div>
    </div>
  );
};

export default MeetBody;
