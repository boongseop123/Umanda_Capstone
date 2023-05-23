import React, { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { usernameState } from "../../recoils/Recoil";
import styles from "./ChatFooter.module.scss";

const ChatFooter = ({ chatRoomId }) => {
  const [messageText, setMessageText] = useState("");
  const username = useRecoilValue(usernameState);
  const chatRoomId = generateChatRoomId(currentUser, postAuthor);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      await createMessage(chatRoomId, message, username);
      setMessage("");
    }
  };

  function generateChatRoomId(currentUser, postAuthor) {
    const ids = [currentUser, postAuthor].sort();
    return ids.join("-");
  }
  async function createMessage(chatRoomId, messageText, sender) {
    const db = getFirestore();
    try {
      await addDoc(collection(db, `chatrooms/${chatRoomId}/messages`), {
        text: messageText,
        createdAt: Date.now(),
        sender: sender,
      });
    } catch (e) {
      console.error("Error sending message: ", e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      createMessage(chatRoomId, messageText, username);
      setMessageText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.ChatFooterDesktop}>
      <input
        type="text"
        placeholder="Type a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatFooter;
