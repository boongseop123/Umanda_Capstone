import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  newResponseState,
  latitudeState,
  longitudeState,
  selectedcourseState,
  selectedSpotsArrayState,
  combinedSelectedSpotsArrayState,
} from "../../recoils/Recoil";
import { useNavigate } from "react-router";
import styles from "./AiTravelModel.module.scss";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const AiTravelModel = () => {
  const [selectedSpotsArray, setSelectedSpotsArray] = useRecoilState(
    selectedSpotsArrayState
  );
  const handleButtonClick = () => {
    setIsButtonPressed(!isButtonPressed);
  };
  const response = useRecoilValue(newResponseState);
  const [, setLatitude] = useRecoilState(latitudeState);
  const [, setLongitude] = useRecoilState(longitudeState);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [countryData, setCountryData] = useState({});
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({}); // 선택한 코스 데이터 객체로 초기화--?이부분 안되면 {}이렇게 객체로 바꿔
  const carouselRefs = useRef([]); // carouselRefs 초기화
  const [combinedSelectedSpotsArray, setCombinedSelectedSpotsArray] =
    useRecoilState(combinedSelectedSpotsArrayState);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const [selectedSpot, setSelectedSpot] = useRecoilState(selectedcourseState);
  const handleSelectedSpotsArray = (spotsArray) => {
    setSelectedSpotsArray(spotsArray);
  };

  const scrollNavigate = (direction, courseIndex) => {
    const carousel = carouselRefs.current[courseIndex];
    if (carousel) {
      const scrollAmount =
        direction === "next" ? carousel.offsetWidth : -carousel.offsetWidth;
      carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSpotSelection = (course) => {
    if (selectedCourse.id && selectedCourse.countryId !== course.countryId) {
      // 선택한 코스가 있는 경우
      setSelectedSpotsArray([course]); // 선택한 코스로 대체
    } else {
      // 선택한 코스가 없거나 같은 나라 내의 코스를 선택한 경우
      setSelectedSpotsArray((prevSpots) => [...prevSpots, course]); // 코스를 추가
    }
    setSelectedCourse((prevCourses) => ({ ...prevCourses, ...course })); // 선택한 코스 데이터 업데이트
    setIsButtonPressed(true);
  };

  const openModal = (spot) => {
    setSelectedSpot(spot);
  };

  const closeModal = () => {
    setSelectedSpot(null);
  };

  useEffect(() => {
    console.log(selectedSpotsArray);
  }, [selectedSpotsArray]);

  useEffect(() => {
    if (response && response.length > 0 && !isLoaded) {
      const newCountryData = {};
      response.forEach((data) => {
        const { id, recommend1, recommend2, recommend3 } = data;
        newCountryData[id] = {
          recommend1: recommend1 || [],
          recommend2: recommend2 || [],
          recommend3: recommend3 || [],
        };
      });
      setCountryData(newCountryData);
      setIsLoaded(true);
    }
  }, [response, isLoaded]);

  const handleNavigate = () => {
    const updatedSelectedSpotsArray = selectedSpotsArray.reduce(
      (acc, spot) => [...acc, ...spot],
      []
    );

    setCombinedSelectedSpotsArray(updatedSelectedSpotsArray);

    if (combinedSelectedSpotsArray.length > 0) {
      console.log("Combined array is already stored in Recoil.");
    } else {
      console.log("Combined array is stored in Recoil.");
    }

    localStorage.setItem(
      "combinedSelectedSpotsArray",
      JSON.stringify(updatedSelectedSpotsArray)
    );

    navigate("/aitravelmap");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const getRecommendationType = (recommendIndex) => {
    switch (recommendIndex) {
      case 1:
        return "추천코스";
      case 2:
        return "인기코스";
      case 3:
        return "이색코스";
      default:
        return "";
    }
  };

  const countryNames = {
    British: "영국",
    France: "프랑스",
    Spain: "스페인",
    Italy: "이탈리아",
    Swiss: "스위스",
    // 추가적인 나라들을 필요에 따라 매핑합니다.
  };

  return (
    <motion.div
      /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div className={styles.Frame1}>
          <Header />
          <div className={styles.container}>
            <div
              className={`${styles.spots} ${
                isDesktop ? styles.desktopFrame2 : styles.mobileFrame2
              }`}
              style={{
                //display: "flex",
                flexWrap: "wrap",
                border: "1px solid white",
                boxShadow: "0px 3px 6px #a7999a3e",
                backgroundColor: "white",
                borderTopLeftRadius: "45px",
                borderTopRightRadius: "45px",
                margin: "0 auto",
                //overflowY: "auto",
                minHeight: "200px",
                maxWidth: "550px",
              }}
            >
              <div className={styles.hh3}>원하는 코스를 선택해주세요!</div>
              {response.map((responseData, index) => {
                const { id, countryName } = responseData;
                const koreanCountryName =
                  countryNames[countryName] || countryName;
                return (
                  <div key={index}>
                    <div>
                      <div>
                        <h2 className={styles.hh2}>{koreanCountryName}</h2>
                      </div>
                      <div className={styles.recommendations_container}></div>
                      <div
                        className={`${styles.recommendation_row} ${
                          showMore ? styles.horizontalScroll : ""
                        }`}
                      >
                        {Array.from({ length: showMore ? 3 : 1 }).map(
                          (_, recommendIndex) => {
                            const recommendType = getRecommendationType(
                              recommendIndex + 1
                            );
                            const recommendationData =
                              responseData[`recommend${recommendIndex + 1}`];

                            return (
                              <div
                                key={recommendIndex}
                                className={styles.recommendation_column}
                              >
                                <h3 className={styles.recommendName}>
                                  {recommendType}
                                </h3>
                                <div className={styles.recommendation_item}>
                                  <div className={styles.imageContainer}></div>
                                  <div className={styles.description}>
                                    <div className={styles.choose_column}>
                                      <button
                                        onClick={() => {
                                          handleSpotSelection(
                                            recommendationData
                                          );
                                          handleButtonClick();
                                        }}
                                        className={`${styles.circle} ${
                                          isButtonPressed
                                            ? styles.buttonPressed
                                            : ""
                                        }`}
                                      ></button>
                                      <p className={styles.coursechoose}>
                                        코스 선택
                                      </p>
                                    </div>
                                    {/* 선택하기 버튼 추가 */}
                                  </div>
                                </div>

                                <div className={styles.recommendation_carousel}>
                                  {recommendationData.map(
                                    (recommend, innerIndex) => {
                                      if (
                                        selectedCountry &&
                                        recommend.countryId !== selectedCountry
                                      ) {
                                        return null;
                                      }

                                      return (
                                        <div
                                          key={innerIndex}
                                          className={styles.recommendation_item}
                                          ref={(el) =>
                                            (carouselRefs.current[innerIndex] =
                                              el)
                                          }
                                        >
                                          <div
                                            className={styles.imageContainer}
                                          >
                                            <img
                                              src={recommend.URI}
                                              alt="Spot Image"
                                              className={styles.image}
                                            />
                                          </div>
                                          <div className={styles.description}>
                                            <p>{recommend.spot}</p>

                                            <button
                                              onClick={() =>
                                                setSelectedSpot(recommend)
                                              }
                                              className={styles.detailButton}
                                            >
                                              자세히 보기
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                      {!showMore && (
                        <button
                          onClick={() => setShowMore(true)}
                          className={styles.another}
                        >
                          <p>다른 코스 >></p>
                        </button>
                      )}
                      {showMore && (
                        <button onClick={() => setShowMore(false)}>
                          접어두기
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              <button onClick={handleNavigate}>구글맵 띄우기</button>
            </div>
          </div>
          {selectedSpot && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <span
                  className={styles.close}
                  onClick={() => setSelectedSpot(null)}
                >
                  ×
                </span>
                <h4>{selectedSpot.spot}</h4>
                <p>{selectedSpot.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AiTravelModel;
