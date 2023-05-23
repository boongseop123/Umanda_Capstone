// hooks/Functions.js
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import axios from "axios";
import { postState, departDateState } from "../../../recoils/Recoil";
import { useRecoilValue } from "recoil";
import { API_URL } from "../../Constant";

const Functions = (post, onClose) => {
  const navigate = useNavigate();
  const setPost = useSetRecoilState(postState);
  const departureDate = useRecoilValue(departDateState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [departDate, setdepartDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (boardId) => {
    const token = localStorage.getItem("jwtToken");

    axios
      .delete(`${API_URL}/boards/delete/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // 게시글 삭제 후 다시 게시글 목록을 불러옵니다.
        alert("글을 삭제하시겠습니까?");
        loadPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadPosts = () => {
    const token = localStorage.getItem("jwtToken");

    axios
      .get(`${API_URL}/boards/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const getBirth = (boardId) => {
  //   const token = localStorage.getItem("jwtToken");

  //   axios
  //     .get(`${API_URL}/boards/read/${boardId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setPost(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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

  const moveToPostWithPost = (posts) => {
    navigate("/post", { state: { posts } });
  };

  const cancel = () => {
    alert("글 작성을 취소하시겠습니까?");
    navigate("/accompany");
  };

  return {
    handleDelete,
    loadPosts,
    moveToPostWithPost,
    // getBirth,
    cancel,
    handleSubmit,
  };
};

export default Functions;
