import React, { useState } from "react";

import styles from "./AccompanyBody.module.scss";
import { useMediaQuery } from "react-responsive";
import button from "./resources/button.png";
import Modal from "../Modal/Modal";

const AccompanyBody = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [gender, setGender] = useState("");
  const [travelType, setTravelType] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  /* 모달 창 */
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  ////////////////////////////////////////////////////

  const [sortOrder, setSortOrder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ gender, travelType, departureDate });
  };

  const confirm = () => {
    console.log("확인했습니다.");
  };
  return (
    <div style={{ height: "100%" }} className={styles.fonts}>
      <div
        className={`${
          isDesktop ? styles.CategoryDesktop : styles.CategoryMobile
        }`}
      >
        <div className={styles.FormHorizontal}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="gender"></label>
            <select
              className={`${
                isDesktop ? styles.GenderDesktop : styles.GenderMobile
              }`}
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" className={styles.fonts}>
                성별
              </option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>

            <label htmlFor="travelType"></label>
            <select
              className={`${
                isDesktop ? styles.TravelTypeDesktop : styles.TravelTypeMobile
              }`}
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

            <label htmlFor="departureDate"></label>
            <input
              className={`${
                isDesktop ? styles.DateDesktop : styles.DateMobile
              }`}
              type="date"
              id="departureDate"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </form>
          <button
            className={`${
              isDesktop
                ? styles.CategoryButtonDesktop
                : styles.CategoryButtonMobile
            }`}
            onClick={openModal}
          ></button>
          <Modal isOpen={isOpen} onClose={closeModal} />
        </div>
        <form>
          <label htmlFor="sortOrder"></label>
          <select
            className={`${
              isDesktop ? styles.SortOrderDesktop : styles.SortOrderMobile
            }`}
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">정렬</option>
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </form>
        {/* 글쓰기 버튼 - 잠깐 숨겨두기 */}
        {/* <button
          className={
            isDesktop ? styles.WriteButtonDesktop : styles.WriteButtonMobile
          }
        ></button> */}
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>
              30대 ∙ 여성 ∙ 대한민국{" "}
              {/* <img src={line} style={{ width: "30px" }}></img> */}
            </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
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
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>30대 ∙ 여성 ∙ 대한민국 </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>
              30대 ∙ 여성 ∙ 대한민국{" "}
              {/* <img src={line} style={{ width: "30px" }}></img> */}
            </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>
              30대 ∙ 여성 ∙ 대한민국{" "}
              {/* <img src={line} style={{ width: "30px" }}></img> */}
            </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>
              30대 ∙ 여성 ∙ 대한민국{" "}
              {/* <img src={line} style={{ width: "30px" }}></img> */}
            </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>
              30대 ∙ 여성 ∙ 대한민국{" "}
              {/* <img src={line} style={{ width: "30px" }}></img> */}
            </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>30대 ∙ 여성 ∙ 대한민국 </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>30대 ∙ 여성 ∙ 대한민국 </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={confirm}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
        <div
          className={`${isDesktop ? styles.postDesktop : styles.postMobile}`}
        >
          <div
            className={`${
              isDesktop ? styles.pictureDesktop : styles.pictureMobile
            }`}
          ></div>
          <div
            className={`${
              isDesktop ? styles.titleBoxDesktop : styles.titleBoxMobile
            }`}
          >
            <span
              className={`${
                isDesktop ? styles.titleDesktop : styles.titleMobile
              }`}
            >
              프랑스 동행 구해요!
            </span>
            <div
              className={`${
                isDesktop ? styles.profileBoxDesktop : styles.profileBoxMobile
              }`}
            >
              <div
                className={`${
                  isDesktop ? styles.profileDesktop : styles.profileMobile
                }`}
              ></div>
              <div>밍구</div>
            </div>
            <span style={{ color: "gray" }}>30대 ∙ 여성 ∙ 대한민국 </span>
          </div>
          <div>
            <button
              className={`${
                isDesktop
                  ? styles.accompanyButtonDesktop
                  : styles.accompanyButtonMobile
              }`}
              onClick={openModal}
            >
              <span>동행 신청</span>
              <img src={button} className={styles.button}></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccompanyBody;
