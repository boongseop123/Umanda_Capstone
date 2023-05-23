import React, { useState, useEffect } from "react";

import axios from "axios";
import styles from "./PostModal.module.scss";
import { useMediaQuery } from "react-responsive";
import Paris from "../Body/resources/Paris.png";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { postState } from "../../../recoils/Recoil";
import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from "../../Constant";
import Functions from "../Body/functions";
import button from "../Body/resources/button.png";

const PostModal = ({ isOpen, onClose, post }) => {
  const { handleSubmit } = Functions;
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [DepartureDate, setDepartureDate] = useState("");

  const setPost = useSetRecoilState(postState);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setTitle(post?.title || "");
    setContent(post?.content || "");
  }, [post]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    birthdate: "",
    gender: "",
    departDate: "",
  });

  const handleGetUserInfo = () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("id"); // 로그인 후 localstorage에 저장

    axios
      .get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // header에 토큰 포함
        },
      })
      .then((response) => {
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
        setDepartureDate(departDate);
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
  };

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
            <div style={{ display: "flex" }}>
              <span style={{ marginTop: "3px" }}>제목 ㅣ </span>
              <input
                className={styles.editTitle}
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div style={{ marginLeft: "-14px", marginTop: "20px" }}>
              <span>작성자 ㅣ</span>
              <input
                className={styles.editTitle}
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
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
                marginTop: "50px",
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
                  borderRadius: "10px",
                  border: "1px solid white",
                }}
              >
                저장
              </button>
              <button
                style={{
                  width: "185px",
                  height: "40px",
                  color: "black ",
                  borderRadius: "10px",
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
              <button className={styles.sendMsg}>
                메세지 보내기{" "}
                <img
                  src={button}
                  style={{ width: "20px", height: "20px", marginLeft: "10px" }}
                ></img>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostModal;
