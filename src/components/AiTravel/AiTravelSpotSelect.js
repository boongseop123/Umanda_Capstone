import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./AiTravelSpotSelect.module.scss";

const pageSize = 12; // 한 페이지에 보여줄 데이터 개수
const numColumns = 2; // 한 줄에 보여줄 사진 개수

const AiTravelSpotSelect = () => {
  const location = useLocation();
  const response = location?.state?.response;

  const [spotIndex, setSpotIndex] = useState(0); // 현재 보여지고 있는 스팟 인덱스
  const [displayedSpots, setDisplayedSpots] = useState([]); // 현재 페이지에 보여지는 스팟들

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

  // 스팟을 numColumns 열로 구성하여 출력
  const renderSpot = (spot, index) => (
    <div
      key={index}
      className={styles.spot}
      style={{ width: `${100 / numColumns}%` }}
    >
      {/* response를 이용해 화면에 원하는 정보를 보여줌 */}
      <img src={spot.URI} alt={spot.spot} />
      <p>{spot.countryName}</p>
      <p>{spot.feature}</p>
      <p>{spot.spot}</p>
    </div>
  );

  return (
    <>
      <h1>시발 사진이 왜이리 적노??</h1>
      <div
        className={styles.spots}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {displayedSpots.map(renderSpot)}
      </div>
      {spotIndex + pageSize < response?.spot?.length && (
        // 더 보기 버튼이 클릭되면 handleLoadMore 함수가 실행됨
        <button onClick={handleLoadMore} ref={loadMoreButtonRef}>
          더 보기
        </button>
      )}
    </>
  );
};

export default AiTravelSpotSelect;
