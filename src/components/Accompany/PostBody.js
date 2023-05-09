import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { IdState, tokenState, postState } from "../../recoils/Recoil";
import { API_URL } from "../Constant";

const PostBody = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState); // useRecoilValue를 사용하여 상태 값을 읽어옴
  const setPost = useSetRecoilState(postState);
  const [userId, setUserId] = useRecoilState(IdState);

  // 작성자 필드에 userId를 기본 값으로 설정
  //const [author, setAuthor] = useState(userId);

  /*  작성자, 제목 및 내용을 저장하기 위한 상태 변수 */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    axios
      .post(
        `${API_URL}/boards/create`,
        {
          userId: userId,
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
          },
        }
      )
      .then((response) => {
        setUserId(response.data.userId); // 로그인 성공 후 아이디 설정
        setPost((prevPosts) => [
          ...prevPosts,
          { title: title, userId: response.data.userId, content: content },
        ]);
        // 게시물 정보를 postState에 저장
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

  const cancel = () => {
    alert("글 작성을 취소하시겠습니까?");
    navigate("/accompany");
  };
  useEffect(() => {
    console.log("token:", typeof token);
    console.log(token);
    console.log("userId:", typeof userId);
    console.log(userId);
  }, [token, userId]);

  return (
    <div>
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <span>제목</span>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div></div>
        <div>
          <span>내용</span>
          <textarea value={content} onChange={handleContentChange}></textarea>
        </div>
        <div>
          <button type="submit">작성하기</button>
          <button type="button" onClick={cancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostBody;
