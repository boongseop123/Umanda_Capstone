import React, { useState, useEffect } from "react";

import axios from "axios";
import styles from "./PostModal.module.scss";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import Paris from "../Body/resources/Paris.png";
import { db } from "../../social/firebase";
import { collection, where, addDoc, getDocs, query } from "firebase/firestore";

import { useSetRecoilState } from "recoil";
import { postState } from "../../../recoils/Recoil";
import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from "../../Constant";

const PostModal = ({ isOpen, onClose, post }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const setPost = useSetRecoilState(postState);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  const handleGetUserInfo = async () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("id"); // 로그인 후 localstorage에 저장

    const response = await axios
      .get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // header에 토큰 포함
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.response || error.request || error.message);
        }
        alert("사용자 정보를 가져오는데 실패했습니다.");
      });

    // console.log(response.data);

    const { username, name, departDate, birthdate, gender } = response.data;

    setUserInfo({
      username,
      name,
      departDate,
      birthdate,
      gender,
    });

    console.log(birthdate);
    setdepartureDate(departDate);
  };

  const handleOpenChatRoom = async () => {
    console.log("handleOpenChatRoom called");

    // 이 부분 추가
    await handleGetUserInfo();

    const chatRoomRef = collection(db, "chatrooms");
    const loggedInUsername = userInfo.username;
    const targetUsername = post.createdBy;

    const participants = [loggedInUsername, targetUsername].sort();
    console.log("participants:", participants);

    const q = query(chatRoomRef, where("participants", "==", participants));

    const existingChatRoom = await getDocs(q);

    let chatRoomId;
    if (existingChatRoom.empty) {
      const newChatRoom = await addDoc(chatRoomRef, {
        participants: participants,
        messages: messages,
      });
      chatRoomId = newChatRoom.id;
      console.log("New chat room created with id:", chatRoomId);
    } else {
      chatRoomId = existingChatRoom.docs[0].id;
      console.log("Existing chat room found with id:", chatRoomId);
    }
    navigate(`/chatPage/${chatRoomId}`, {
      state: { currentUser: loggedInUsername, postAuthor: targetUsername },
    });
    console.log(`Navigating to /chatPage/${chatRoomId}`);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [departDate, setdepartureDate] = useState("");

  useEffect(() => {
    setIsEditing(false);
    setTitle(post?.title || "");
    setContent(post?.content || "");
    setdepartureDate(post?.departDate || "");
  }, [post]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDepartDateChange = (e) => {
    setdepartureDate(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    axios
      .put(
        `${API_URL}/boards/update/${post.boardId}`,
        {
          title: title,
          content: content,
          departDate: departDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // header에 토큰 포함
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPost(response.data); // <-- 서버에서 받은 새로운 게시글 데이터로 상태 업데이트
        // Update was successful, reset editing state and close modal
        setIsEditing(false);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    birthdate: "",
    gender: "",
    departDate: "",
  });

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    axios
      .get(`${API_URL}/boards/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.response || error.request || error.message);
        }
      });
  }, []);

  // const confirm;
  if (!isOpen || !post) return null;

  return (
    <div className={styles.modalContainer} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", marginTop: "10px", marginLeft: "17px" }}
            >
              <span style={{ marginTop: "3px" }}>제목 ㅣ </span>
              <input
                className={styles.editTitle}
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div style={{ marginLeft: "-14px", marginTop: "20px" }}>
              <span className={styles.depart}>출발 날짜 ㅣ</span>
              <input
                style={{ width: "200px" }}
                type="date"
                value={departDate}
                onChange={handleDepartDateChange}
                // 추후 작성자 username으로 바꿀 것임
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
                marginLeft: "17px",
              }}
            >
              <span>내용 ㅣ </span>
              <textarea
                className={styles.editContent}
                value={content}
                onChange={handleContentChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                style={{
                  marginRight: "30px",
                  width: "185px",
                  height: "40px",
                  backgroundColor: "#ef455a",
                  color: "white",
                  borderRadius: "20%",
                  border: "1px solid white",
                }}
              >
                수정하기
              </button>
              <button
                style={{
                  width: "185px",
                  height: "40px",
                  color: "black ",
                  borderRadius: "20px",
                  border: "1px solid white",
                }}
                onClick={() => setIsEditing(false)}
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.contentContainer}>
              <img
                src={Paris}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "10px",
                }}
              ></img>
              <div className={styles.textContent}>
                <div className={styles.title}>제목 ㅣ {post.title}</div>
                <div className={styles.departDate}>
                  출발날짜 ㅣ {post.departDate}
                </div>
                <div className={styles.createdBy}>
                  작성자 ㅣ {post.createdBy}
                </div>
              </div>
              <div>
                {userInfo.username === post.createdBy && (
                  <button
                    className={styles.updateButton}
                    onClick={handleEditClick}
                  >
                    수정
                  </button>
                )}
              </div>
            </div>

            <fieldset className={styles.fieldset}>
              <legend>내용</legend>
              {post.content}
            </fieldset>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "14px",
              }}
            >
              {userInfo.username !== post.createdBy && (
                <button className={styles.sendMsg} onClick={handleOpenChatRoom}>
                  메세지 보내기
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostModal;
