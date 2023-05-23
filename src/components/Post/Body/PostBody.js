import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { API_URL } from "../../Constant";
import { useRecoilState } from "recoil";
import { selectedDateState } from "../../../recoils/Recoil";
import styles from "./PostBody.module.scss";
import Functions from "../../Accompany/Body/functions";

const PostBody = (post) => {
  const { cancel } = Functions();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPost = location.state?.post || "";
  const username = location.state.username ?? "";

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [departDate, setDepartDate] = useRecoilState(selectedDateState);

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title || "");
      setContent(selectedPost.content || "");
      setDepartDate(selectedPost.departDate || null);
    }
  }, [selectedPost, setDepartDate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("id");

    axios
      .post(
        `${API_URL}/boards/create`,
        {
          userId: userId,
          title: title,
          content: content,
          departDate: departDate,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("게시물이 성공적으로 저장되었습니다.");
        console.log(response.data);
        setDepartDate(departDate);
        alert("게시물이 성공적으로 작성되었습니다.");
        navigate("/accompany");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.response || error.request || error.message);
        }
        alert("게시물 작성에 실패했습니다.");
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>나만의 일정 만들기</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.writerBox}>
          <span className={styles.writer}>작성자</span>
          <div
            style={{
              width: "150px",
              height: "25px",
              border: "1px solid gray",
              borderRadius: "3px",
              textAlign: "center",
            }}
          >
            {username}
          </div>
        </div>
        <div className={styles.titleBox}>
          <span className={styles.span}>제목</span>
          <input
            type="text"
            className={styles.title}
            value={title}
            onChange={handleTitleChange}
            placeholder={"10자 내로 입력해주세요"}
            maxLength={10}
          />
        </div>
        <div
          style={{
            marginLeft: "-32px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <span className={styles.span}>출발 날짜</span>
          <input type="date" onChange={(e) => setDepartDate(e.target.value)} />
        </div>
        <div className={styles.contentBox}>
          <span className={styles.span}>내용</span>
          <textarea
            placeholder={"여행지, 가고싶은 관광지, 코스 등을 입력해주세요."}
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className={styles.buttonBox}>
          <button type="submit" className={styles.button1}>
            작성하기
          </button>
          <button type="button" className={styles.button2} onClick={cancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostBody;
