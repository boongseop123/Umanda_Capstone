import React, { useState, useEffect } from "react";
import styles from "./AccompanyBody.module.scss";
import { useMediaQuery } from "react-responsive";
import button from "./resources/button.png";
import CategoryModal from "../CategoryModal/CategoryModal";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import PostModal from "../PostModal/PostModal";
import { departDateState, postState } from "../../../recoils/Recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { API_URL } from "../../Constant";
import Functions from "./functions";
import calculateAge from "./cal";
import { getFirestore } from "firebase/firestore";

const AccompanyBody = () => {
  const { handleDelete, loadPosts } = Functions();

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const today = new Date().toISOString().slice(0, 10);
  const { postId } = useParams();
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [travelType, setTravelType] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = useRecoilValue(postState);

  const [posts1, setPosts1] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const db = getFirestore;
      const postDocs = await db.collection("post1").get();

      const postsWithLikes = await Promise.all(
        postDocs.docs.map(async (postDoc) => {
          const postData = postDoc.data();
          const likeDocs = await db
            .collection("likes")
            .where("postId", "==", postData.id)
            .where("liked", "==", true)
            .get();
          return { ...postData, id: postDoc.id, likes: likeDocs.docs.length };
        })
      );

      setPosts1(postsWithLikes);
    };

    fetchPosts();
  }, []);
  const [sortOrder, setSortOrder] = useState("");

  // PostBody에서 선택한 날짜가 담겨있음
  const selectedDate = useRecoilValue(departDateState);
  const departureDate = useRecoilValue(departDateState);

  const moveToPost = () => {
    const username = userInfo.username; // username 추출
    navigate("/post", { state: { username } });
  };

  /* 모달 창 */
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
  };
  ////////////////////////////////////////////////////

  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    birthdate: "",
    gender: "",
    departDate: "",
  });

  useEffect(() => {
    loadPosts();
    // getBirth();
  }, [selectedDate, gender]);

  useEffect(() => {
    handleGetUserInfo();
  }, [selectedDate]);

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

        // console.log(birthdate);
        // console.log(calculateAge(birthdate));
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

  const openModalWithPost = (post) => {
    setSelectedPost(post);
    setIsOpen1(true);
  };

  const filteredPosts = posts
    .filter((post) => {
      if (gender === "") {
        return true; // Return all posts if no gender is selected
      } else if (gender === "male") {
        return post.gender === "MAN";
      } else if (gender === "female") {
        return post.gender === "WOMEN";
      } else {
        return false;
      }
    })
    // 최신 순으로 정렬 + 인기 순으로 정렬
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.updateTime) - new Date(a.updateTime); // Sort by updateTime in descending order (latest first)
      } else if (sortOrder === "popular") {
        // Add your logic for sorting by popularity here
        // Return a negative, zero, or positive value based on popularity comparison
      } else {
        return 0; // Default case: No sorting
      }
    })
    .filter((post) => {
      if (departureDate === "") {
        return true; // 날짜가 선택되지 않은 경우 모든 게시물 반환
      } else {
        return post.departDate === departureDate;
      }
    });

  const moveToMap = () => {
    navigate("/mapchat");
  };

  return (
    <div style={{ overflowY: "auto" }}>
      <div
        className={isDesktop ? styles.CategoryDesktop : styles.CategoryMobile}
      >
        <div className={styles.FormHorizontal}>
          <form>
            <label htmlFor="gender"></label>
            <select
              className={isDesktop ? styles.GenderDesktop : styles.GenderMobile}
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">성별</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>

            <label htmlFor="travelType"></label>
            <select
              className={
                isDesktop ? styles.TravelTypeDesktop : styles.TravelTypeMobile
              }
              id="travelType"
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
            >
              <option value="">여행 유형</option>
              <option value="culture">문화</option>
              <option value="sports">스포츠</option>
              <option value="nature">자연</option>
              <option value="activity"> 엑티비티</option>
            </select>

            <label for="departureDate">
              <input
                className={isDesktop ? styles.DateDesktop : styles.DateMobile}
                type="date"
                id="departureDate"
                onChange={(e) =>
                  setDepartureDate(e.target.value.split(".").join("-"))
                }
              />
            </label>
          </form>
          <button
            className={
              isDesktop
                ? styles.CategoryButtonDesktop
                : styles.CategoryButtonMobile
            }
            onClick={openModal}
          ></button>
          <CategoryModal isOpen={isOpen} onClose={closeModal} />
        </div>
        <form>
          <label htmlFor="sortOrder"></label>
          <select
            className={
              isDesktop ? styles.SortOrderDesktop : styles.SortOrderMobile
            }
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">정렬</option>
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </form>
        <button
          className={styles.postButton}
          onClick={() => {
            moveToPost();
            handleGetUserInfo(); // username 가져감
          }}
        ></button>
        {/* 게시글 하나 시작 */}
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className={isDesktop ? styles.postDesktop : styles.postMobile}
          >
            <div
              className={
                isDesktop ? styles.pictureDesktop : styles.pictureMobile
              }
            ></div>
            <div
              className={
                isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
              }
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p
                  className={
                    isDesktop ? styles.titleDesktop : styles.titleMobile
                  }
                >
                  {post.title}
                </p>
              </div>
              <div
                className={
                  isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
                }
              >
                {post.createdBy}
              </div>
              <span
                style={{
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                {calculateAge(post.birthDate)}살 ∙ {post.gender}
                <br></br>출발날짜 ㅣ {post.departDate}
              </span>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {userInfo.username === post.createdBy && (
                  <>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(post.boardId)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
              <div>
                <button
                  className={
                    isDesktop
                      ? styles.accompanyButtonDesktop
                      : styles.accompanyButtonMobile
                  }
                  onClick={() => openModalWithPost(post)}
                >
                  <span
                    className={
                      isDesktop
                        ? styles.AccompanybuttonDesktop
                        : styles.AccompanybuttonMobile
                    }
                  >
                    동행 신청
                  </span>
                  <img src={button} className={styles.button}></img>
                </button>
              </div>
              <PostModal
                isOpen={isOpen1}
                onClose={closeModal1}
                post={selectedPost}
              />
            </div>
          </div>
        ))}
        {/* 게시글 하나 끝 */}
      </div>
    </div>
  );
};

export default AccompanyBody;
