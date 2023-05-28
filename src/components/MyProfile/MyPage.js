import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { combinedSelectedSpotsArrayState } from "../../recoils/Recoil";
import Header from "../Header/Header";
import styles from "./MyPage.module.scss";

const MyPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [selectedCourse, setSelectedCourse] = useRecoilState(
    combinedSelectedSpotsArrayState
  );

  const getLocalStorageData = (key) => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  };

  useEffect(() => {
    const storedSelectedCourse = getLocalStorageData(
      "combinedSelectedSpotsArray"
    );
    if (storedSelectedCourse) {
      setSelectedCourse(storedSelectedCourse);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div className={styles.Frame1}>
          <Header />
          <div
            className={`${styles.spots} ${
              isDesktop ? styles.desktopFrame2 : styles.mobileFrame2
            }`}
          >
            <div className={styles.mytext}>내정보</div>
            <div>
              <div className={styles.name}>신지훈</div>
              <div className={styles.detail}>26세 | 남성 | 정보수정</div>
            </div>
            <div className={styles.name1}>내 방문지</div>
            <div className={styles.imageContainer}>
              {selectedCourse.length > 0 ? (
                selectedCourse.map((spot, index) => (
                  <div key={index} className={styles.imageItem}>
                    <img
                      src={spot.URI}
                      alt={spot.spot}
                      className={styles.image}
                    />
                    <div className={styles.spotName}>{spot.spot}</div>
                  </div>
                ))
              ) : (
                <div>방문한 장소가 없습니다.</div>
              )}
            </div>
            <div className={styles.feature}>#해외축구 #포토스팟</div>
            <div className={styles.underline}></div>

            <div className={styles.detail}>내가 작성한 게시글</div>
            <div className={styles.detail}>채팅방</div>
            <div className={styles.underline1}></div>
            <div className={styles.detail}>
              <div className={styles.detail_margin}>비밀번호 변경</div>
              <div className={styles.detail_margin}>설정</div>
              <div className={styles.detail_margin}>로그아웃</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyPage;
