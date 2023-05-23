import React from "react";
import { useParams } from "react-router";
import ChatHeader from "./ChatHeader/ChatHeader";
import styles from "./ChatPage.module.scss";
import { useMediaQuery } from "react-responsive";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";
import { useRecoilValue } from "recoil";
import { usernameState } from "../../recoils/Recoil";

const ChatPage = () => {
  const { username } = useParams();
  const postAuthor = username;
  const currentUser = useRecoilValue(usernameState);

  console.log("postAuthor: ", postAuthor);
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div>
      <div className={styles.Header}>
        <ChatHeader postAuthor={postAuthor} />
      </div>
      <div
        className={isDesktop ? styles.BodyDesktop : styles.BodyMobile}
        style={{ overflowY: "auto" }}
      >
        <ChatBody currentUser={currentUser} postAuthor={postAuthor} />
      </div>
      <div className={styles.Footer}>
        <ChatFooter currentUser={currentUser} postAuthor={postAuthor} />
      </div>
    </div>
  );
};

export default ChatPage;
