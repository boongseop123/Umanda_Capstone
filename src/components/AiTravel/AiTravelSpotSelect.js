import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./AiTravelSpotSelect.module.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  responseState,
  selectedSpotsState,
  selectedCountryNameState,
  selectedSpotsByCountryState,
  updatedSelectedSpotsByCountryState,
} from "../../recoils/Recoil";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "../Header/Header";
import AiTravelProgress4 from "./AiTravelProgress4";

const pageSize = 12; // 한 페이지에 보여줄 데이터 개수
const numColumns = 2; // 한 줄에 보여줄 사진 개수

const AiTravelSpotSelect = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/aitravel_date");
  };
  const location = useLocation();
  const response = location?.state?.response;
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [spotIndex, setSpotIndex] = useState(0); // 현재 보여지고 있는 스팟 인덱스
  const [displayedSpots, setDisplayedSpots] = useState([]); // 현재 페이지에 보여지는 스팟들
  const [selectedSpots, setSelectedSpots] = useRecoilState(selectedSpotsState);
  const [selectedCountryName, setSelectedCountryName] = useRecoilState(
    selectedCountryNameState
  );
  const [selectedSpotsByCountry, setSelectedSpotsByCountry] = useRecoilState(
    selectedSpotsByCountryState
  );
  const setUpdatedSelectedSpotsByCountry = useSetRecoilState(
    updatedSelectedSpotsByCountryState
  );
  const updatedSelectedSpotsByCountry = useRecoilValue(
    updatedSelectedSpotsByCountryState
  );

  const loadMoreButtonRef = useRef(null); // '더 보기' 버튼의 ref

  useEffect(() => {
    // 페이지 로드 시 10개의 스팟을 보여줌
    const newDisplayedSpots = response?.spot?.slice(0, pageSize);
    setDisplayedSpots(newDisplayedSpots);
  }, [response]);

  const handleLoadMore = () => {
    // '더 보기' 버튼이 클릭되면 다음 10개의 스팟을 보여줌
    const newIndex = spotIndex + pageSize;
    const newDisplayedSpots = [
      ...displayedSpots,
      ...response?.spot?.slice(newIndex, newIndex + pageSize),
    ];
    setDisplayedSpots(newDisplayedSpots);
    setSpotIndex(newIndex);
  };

  const handleSpotClick = (spot) => {
    console.log("Spot clicked: ", spot.spot);

    const currentCountryName = selectedCountryName;
    const selectedSpotsByCountrySnapshot = { ...selectedSpotsByCountry };

    // 이미 선택된 스팟인 경우 중복으로 배열에 추가하지 않음
    if (selectedSpots.some((selectedSpot) => selectedSpot === spot.spot)) {
      return;
    }

    // 선택한 스팟이 이전에 선택한 나라와 같은 경우
    if (currentCountryName === spot.countryName) {
      setSelectedSpots((prevSelectedSpots) => [
        ...prevSelectedSpots,
        spot.spot,
      ]);
    } else {
      // 선택한 스팟이 이전에 선택한 나라와 다른 경우
      const updatedSelectedSpotsByCountry = {
        ...selectedSpotsByCountrySnapshot,
        [currentCountryName]: selectedSpots,
      };

      setSelectedSpots([spot.spot]);
      setSelectedCountryName(spot.countryName);
      setSelectedSpotsByCountry(updatedSelectedSpotsByCountry);
    }

    alert("확인되었습니다.");
  };
  useEffect(() => {
    // 스팟 선택이 변경될 때마다 selectedSpotsByCountry 업데이트
    const updatedSelectedSpotsByCountry = {
      ...selectedSpotsByCountry,
      [selectedCountryName]: selectedSpots,
    };
    setSelectedSpotsByCountry(updatedSelectedSpotsByCountry);
  }, [selectedSpots, selectedCountryName, setSelectedSpotsByCountry]);

  useEffect(() => {
    console.log("Selected spots: ", selectedSpots);
    console.log("Selected country name: ", selectedCountryName);
    console.log("Selected spots by country: ", selectedSpotsByCountry);

    const updatedSelectedSpotsByCountry = Object.fromEntries(
      Object.entries(selectedSpotsByCountry).filter(([key]) => key !== "")
    );
    console.log(
      "Updated selected spots by country: ",
      updatedSelectedSpotsByCountry
    );
    setUpdatedSelectedSpotsByCountry(updatedSelectedSpotsByCountry);
  }, [selectedSpots, selectedCountryName, selectedSpotsByCountry]);

  // 스팟을 numColumns 열로 구성하여 출력
  const renderSpot = (spot, index) => (
    <div
      key={index}
      className={`${styles.spot} ${
        selectedSpots.includes(spot.spot) ? styles.selected : ""
      }`}
      style={{ width: `${100 / numColumns}%` }}
      onClick={() => handleSpotClick(spot)}
    >
      {/* response를 이용해 화면에 원하는 정보를 보여줌 */}
      <div className={styles.imageContainer}>
        <img src={spot.URI} alt={spot.spot} className={styles.image} />
      </div>
      <p>
        #
        {spot.countryName === "British"
          ? "영국"
          : spot.countryName === "France"
          ? "프랑스"
          : spot.countryName === "Spain"
          ? "스페인"
          : spot.className}
        <span>&nbsp;</span>#{spot.feature}
        <span>&nbsp;</span>#{spot.spot}
      </p>
    </div>
  );

  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
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
          <div style={{ margin: "20px auto", textAlign: "center" }}>
            <h3 className={styles.h1}>선호하는 관광지들을 선택해주세요!</h3>
            <br />
          </div>

          {displayedSpots.map(renderSpot)}
          <button onClick={handleNavigate} className={styles.button}>
            다음
          </button>
          {spotIndex + pageSize < response?.spot?.length && (
            // 더 보기 버튼이 클릭되면 handleLoadMore 함수가 실행됨
            <button
              onClick={handleLoadMore}
              style={{ fontWeight: 600, fontFamily: "Happy" }}
            >
              더 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiTravelSpotSelect;
