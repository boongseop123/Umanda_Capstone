import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { usernameState } from "../../../recoils/Recoil";
import { db } from "../../social/firebase"; // Firebase 초기화 및 Firestore 인스턴스 가져오기
import styles from "../ChatBody/ChatBody.module.scss";
const ChatBody = ({ currentUser, postAuthor, receiver }) => {
  const [messages, setLocalMessages] = useState([]);
  const currentUserName = useRecoilValue(usernameState);

  useEffect(() => {
    const chatRoomId = generateChatRoomId(currentUser, postAuthor);
    const unsubscribe = subscribeToMessages(chatRoomId, setLocalMessages);
    return () => unsubscribe();
  }, [currentUser, postAuthor]);

  function generateChatRoomId(currentUser, postAuthor) {
    return postAuthor;
  }

  function subscribeToMessages(chatRoomId, setLocalMessages) {
    const messagesQuery = query(
      collection(db, `chatrooms/${chatRoomId}/messages`),
      orderBy("createdAt")
    );

    return onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setLocalMessages(messages);
    });
  }

  function formatDate(date) {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  function formatDate1(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      // 1시간 보다 적은 경우
      if (diffInMinutes < 1) {
        return "Just now";
      } else if (diffInMinutes === 1) {
        return "1 minute ago";
      } else {
        return `${diffInMinutes}분 전`;
      }
    } else {
      // 1시간 초과하는 경우
      const diffInHours = Math.floor(diffInMinutes / 60);

      if (diffInHours === 1) {
        return "1 hour ago";
      } else {
        return `${diffInHours}시간 전`;
      }
    }
  }

  return (
    <div className={styles.chatBody}>
      {messages.map((message, index) => {
        const messageDate = new Date(message.createdAt);
        const formattedDate = formatDate1(messageDate);
        const prevMessageDate =
          index > 0 ? new Date(messages[index - 1].createdAt) : null;

        const showDateHeader =
          !prevMessageDate ||
          messageDate.toDateString() !== prevMessageDate.toDateString();

        return (
          <React.Fragment key={index}>
            {showDateHeader && (
              <p className={styles.dateHeader}>{formatDate(messageDate)}</p>
            )}
            <p
              className={
                message.sender === currentUserName
                  ? styles.rightName
                  : styles.leftName
              }
            >
              {message.sender === currentUserName
                ? `${currentUserName}`
                : `${message.sender}`}
            </p>
            <p
              className={
                message.sender === currentUserName
                  ? styles.rightMessage
                  : styles.leftMessage
              }
            >
              {message.sender === currentUserName
                ? ` ${message.text}`
                : `${message.text}`}
            </p>
            <p
              className={
                message.sender === currentUserName
                  ? styles.timeRight
                  : styles.timeLeft
              }
            >
              {formattedDate}
            </p>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ChatBody;
