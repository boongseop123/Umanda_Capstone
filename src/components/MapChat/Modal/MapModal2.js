import React, { useState } from "react";
import { useNavigate } from "react-router";

import styles from "../Modal/MapModal.module.scss";
import chat from "../resources/chat.png";
import othercourse from "../../Chatting/ChatFooter/button.png";

const MapModal = () => {
  const navigate = useNavigate();
  const moveToMeet = () => {
    navigate("/chatPage/:username");
  };

  const [showModal, setShowModal] = useState(false); // 상태 변수 추가

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // localStorage에서 데이터 가져오기
  const combinedSelectedSpotsArray = JSON.parse(
    localStorage.getItem("combinedSelectedSpotsArray")
  );

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          padding: "0 20px",
        }}
      >
        <div className={styles.profile}></div>
        <div className={styles.name}>
          <span className={styles.name}>신지훈</span>
          <br />
          <br />
          <span style={{ color: "gray" }}>26세 ∙ 남성</span>
          <br />
          <span className={styles.feature}>#해외축구 #포토스팟</span>
        </div>
        <div>
          <button className={styles.chatButton} onClick={moveToMeet}>
            <p className={styles.spanChat}>채팅하기</p>
            <img className={styles.chatImg} src={chat} alt="Chat" />
          </button>
          <button className={styles.chatButton1} onClick={openModal}>
            <p className={styles.spanChat1}>여행코스 보기</p>
            <img
              className={styles.chatImg}
              src={othercourse}
              alt="Other Course"
            />
          </button>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <div className={styles.detail}>
              신지훈님의 여행코스입니다! <br></br>
              <span className={styles.similar}>(유사도:66%)</span>
              <div className={styles.feature}>#해외축구 #포토스팟</div>
            </div>
            <div className={styles.imageContainer}>
              {combinedSelectedSpotsArray.map((item, index) => (
                <div key={index}>
                  <img
                    className={styles.spotimg}
                    src={item.URI}
                    alt={item.spot}
                  />
                  <p>{item.spot}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapModal;
