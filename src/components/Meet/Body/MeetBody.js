import React, { useState, useEffect } from "react";
import { usernameState } from "../../../recoils/Recoil";
import { onSnapshot } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { collection, getDocs, where, query } from "firebase/firestore"; // 추가: where, query 추가
import { db } from "../../social/firebase";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import styles from "../Body/MeetBody.module.scss";
import profile from "../resources/profile.png";

const MeetBody = ({ receiver }) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [chatRooms, setChatRooms] = useState([]);
  const username = useRecoilValue(usernameState);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRoomsCollection = collection(db, "chatrooms");
      const querySnapshot = await getDocs(
        query(
          chatRoomsCollection,
          where("participants", "array-contains", username)
        )
      );

      const fetchedChatRooms = querySnapshot.docs.map((doc) => ({
        chatRoomId: doc.id,
        ...doc.data(),
        unreadCount: 0,
      }));

      setChatRooms(fetchedChatRooms);
    };

    fetchChatRooms();
  }, [username]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const message = change.doc.data();
          const chatRoomId = message.chatRoomId;
          const receiver = message.receiver;

          setChatRooms((prevChatRooms) =>
            prevChatRooms.map((room) => {
              if (
                room.chatRoomId === chatRoomId &&
                room.participants.includes(receiver)
              ) {
                return {
                  ...room,
                  unreadCount:
                    room.unreadCount + (receiver !== username ? 1 : 0),
                };
              }
              return room;
            })
          );
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const filteredChatRooms = chatRooms.filter((room) =>
    room.participants.includes(username)
  );

  return (
    <div style={{ minHeight: "650px" }}>
      <h2 style={{ margin: "30px" }}>Chat</h2>
      <div className={styles.container}>
        {filteredChatRooms.map((room) => {
          const receiver = room.participants.find(
            (participant) => participant !== username
          );

          return (
            <div
              onClick={() => navigate(`/chatPage/${room.chatRoomId}`)}
              className={
                isDesktop ? styles.ChatListDesktop : styles.ChatListMobile
              }
              key={room.chatRoomId}
            >
              <img
                src={profile}
                className={
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }
                alt="Profile"
              ></img>
              <h3 style={{ marginLeft: "20px", marginTop: "30px" }}>
                {receiver}
              </h3>
              {room.unreadCount > 0 && (
                <div className={styles.unreadCount}>{room.unreadCount}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeetBody;
