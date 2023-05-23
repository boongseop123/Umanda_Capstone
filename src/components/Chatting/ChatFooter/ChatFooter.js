import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { usernameState } from "../../../recoils/Recoil";
import {
  addDoc,
  collection,
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import styles from "./ChatFooter.module.scss";

const ChatFooter = ({ currentUser, postAuthor }) => {
  const [message, setMessage] = useState("");
  const username = useRecoilValue(usernameState);

  const chatRoomId = generateChatRoomId(currentUser, postAuthor);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      await createMessage(chatRoomId, message, username, postAuthor);
      setMessage("");
    }
  };

  function generateChatRoomId(currentUser, postAuthor) {
    return postAuthor;
  }

  async function createMessage(chatRoomId, messageText, sender, receiver) {
    const db = getFirestore();
    try {
      const docRef = collection(db, `chatrooms/${chatRoomId}/messages`);
      await addDoc(docRef, {
        text: messageText,
        createdAt: Date.now(),
        sender: sender,
      });
    } catch (e) {
      console.error("Error sending message: ", e);
    }
  }

  return (
    <div className={styles.inputDesktop}>
      <input
        className={styles.inputBox}
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        value={message}
      />
      <button className={styles.sendButton} onClick={sendMessage}></button>
    </div>
  );
};

export default ChatFooter;
