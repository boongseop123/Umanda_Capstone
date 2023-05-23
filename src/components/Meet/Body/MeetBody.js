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

const MeetBody = () => {
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
        ) // 수정: 현재 사용자가 참여한 채팅방 필터링
      );

      const fetchedChatRooms = querySnapshot.docs.map((doc) => ({
        chatRoomId: doc.id,
        ...doc.data(),
      }));

      setChatRooms(fetchedChatRooms);
    };

    fetchChatRooms();
  }, [username]);

  // Filter the chat rooms that the current user is a participant of
  const filteredChatRooms = chatRooms.filter((room) =>
    room.participants.includes(username)
  );

  return (
    <div style={{ minHeight: "650px" }}>
      <h2 style={{ margin: "30px" }}>Chat</h2>
      <div className={styles.container}>
        {filteredChatRooms.map((room) => {
          // 수신자의 이름 추출 (배열의 첫 번째 요소)
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeetBody;
