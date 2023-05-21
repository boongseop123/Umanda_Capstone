import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import {
  selectedSpotsState,
  selectedCountryNameState,
  selectedSpotsByCountryState,
  responseState,
  updatedSelectedSpotsByCountryState,
  travelDurationState,
  IdState,
  newResponseState,
  spotImagesState,
} from "../../recoils/Recoil";
import { API_URL_AI } from "../Constant";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";
import styles from "./AiOverView.module.scss";
import { motion } from "framer-motion";

const AiOverView = () => {
  const spotsPerPage = 2;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagesPerPage = 2; // 한 번에 보여줄 이미지 수
  const navigate = useNavigate();
  const moveToModel = () => {
    navigate("/aitravelmodel");
  };

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [selectedSpots, setSelectedSpots] = useRecoilState(selectedSpotsState);
  const [selectedCountryName, setSelectedCountryName] = useRecoilState(
    selectedCountryNameState
  );
  const updatedSelectedSpotsByCountry = useRecoilValue(
    updatedSelectedSpotsByCountryState
  );
  const spotImages = useRecoilValue(spotImagesState);
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };
  const [newResponse, setNewResponse] = useRecoilState(newResponseState);
  const selectedSpotsByCountry = useRecoilValue(selectedSpotsByCountryState);
  const [response, setResponse] = useRecoilState(responseState);
  const travelDuration = useRecoilValue(travelDurationState);
  const IdToken = useRecoilValue(IdState);

  const spotImagesByCountry = {};
  Object.entries(updatedSelectedSpotsByCountry).forEach(([country, spots]) => {
    spotImagesByCountry[country] = spots.map((spot) => spotImages[spot]);
  });

  const countryNames = {
    British: "영국",
    Spain: "스페인",
    Italy: "이탈리아",
    Swiss: "스위스",
    France: "프랑스",
  };
  const handleSubmit = async () => {
    try {
      const requests = Object.entries(updatedSelectedSpotsByCountry).map(
        async ([country, spots], index) => {
          const days = travelDuration[index] || 0;
          const requestBody = {
            id: IdToken,
            countryName: country,
            days: travelDuration[index] || 0,
            spot: [...spots],
          };

          console.log(requestBody.countryName);
          console.log(requestBody.days);
          console.log(requestBody.id);

          const response = await axios.post(
            `${API_URL_AI}/country`,
            requestBody
          );
          console.log(response.data);
          return response.data;
        }
      );

      const responses = await Promise.all(requests);
      setNewResponse(responses);
      navigate("/aitravelmodel");
    } catch (error) {
      console.error(error);
    }
  };

  let selectedCountryText = "";
  if (Array.isArray(selectedCountryName)) {
    selectedCountryText = selectedCountryName.join(", ");
  } else {
    selectedCountryText = selectedCountryName;
  }

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
          <div
            className={`${styles.spots} ${
              isDesktop ? styles.desktopFrame2 : styles.mobileFrame2
            }`}
          >
            <div
              style={{
                marginTop: "40px",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              <h4 className={styles.h4}>선택한 여행지입니다.</h4>
            </div>
            {Object.entries(updatedSelectedSpotsByCountry).map(
              ([country, spots]) => {
                const countryImages = spotImagesByCountry[country];
                const countryName = countryNames[country]; // 국가의 한글 이름을 가져옵니다.

                // 이미지 캐러셀 기능 추가

                const countryImagesPerPage = countryImages.slice(
                  currentImageIndex,
                  currentImageIndex + imagesPerPage
                );

                return (
                  <div key={country} className={styles.countryContainer}>
                    <h3 className={styles.h4}>{countryName}</h3>
                    <div className={styles.imageContainer}>
                      {countryImagesPerPage.map((image, index) => {
                        const spot = spots[index + currentImageIndex];
                        const isActive = index === 0; // 현재 보여지는 이미지 여부

                        return (
                          <div
                            key={index}
                            className={`${styles.imageWrapper} ${
                              isActive && styles.active
                            }`}
                          >
                            <img
                              src={image}
                              alt={spot}
                              className={styles.image}
                            />
                            <div className={styles.imageCaption}>
                              <h4>{spot}</h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {countryImages.length > imagesPerPage && (
                      <div className={styles.navigationButtons}>
                        {currentImageIndex > 0 && (
                          <button onClick={handlePreviousImage}>이전</button>
                        )}
                        {currentImageIndex <
                          countryImages.length - imagesPerPage && (
                          <button onClick={handleNextImage}>다음</button>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
            <div style={{ margin: "20px auto", textAlign: "center" }}>
              <h4 className={styles.bottomtext}>
                이 관광지들이 마음에 들면 추천받기 버튼을 눌러주세요!
              </h4>

              <button onClick={handleSubmit}>나만의 코스 추천받기</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiOverView;
