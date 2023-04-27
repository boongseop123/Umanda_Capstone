import React from "react";

import ChatFooter from "./ChatFooter/ChatFooter";
import ChatHeader from "./ChatHeader/ChatHeader";
import styles from "./ChatPage.module.scss";
import { useMediaQuery } from "react-responsive";

const ChatPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div>
      <div className={styles.Frame1}>
        <ChatHeader />
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame2 : styles.mobileFrame2}`}
      >
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatPage;
