import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  newResponseState,
  latitudeState,
  longitudeState,
} from "../../recoils/Recoil";
import { useNavigate } from "react-router";
import styles from "./AiTravelModel.module.scss";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";

const AiTravelModel = () => {
  const response = useRecoilValue(newResponseState);
  const [, setLatitude] = useRecoilState(latitudeState);
  const [, setLongitude] = useRecoilState(longitudeState);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [countryData, setCountryData] = useState({});
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const carouselRefs = useRef([]);

  const scrollNavigate = (direction) => {
    const scrollAmount = direction === "next" ? 1 : -1;
    carouselRefs.current.forEach((carousel) => {
      if (carousel) {
        carousel.scrollBy({
          left: scrollAmount * carousel.offsetWidth,
          behavior: "smooth",
        });
      }
    });
  };

  const openModal = (spot) => {
    setSelectedSpot(spot);
  };

  const closeModal = () => {
    setSelectedSpot(null);
  };

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
    <div>
      <div className={styles.Frame1}>
        <Header />
        <div className={styles.container}>
          <div
            className={`${styles.spots} ${
              isDesktop ? styles.desktopFrame2 : styles.mobileFrame2
            }`}
            style={{
              display: "flex",
              flexWrap: "wrap",
              border: "1px solid white",
              boxShadow: "0px 3px 6px #a7999a3e",
              backgroundColor: "white",
              borderTopLeftRadius: "45px",
              borderTopRightRadius: "45px",
              margin: "0 auto",
              overflowY: "auto",
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
                  <h2>{koreanCountryName}</h2>
                  <div className={styles.recommendations_container}>
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
                              <h3>{recommendType}</h3>
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
                                      >
                                        <div className={styles.imageContainer}>
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
                      <button onClick={() => setShowMore(true)}>더 보기</button>
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
  );
};

export default AiTravelModel;
