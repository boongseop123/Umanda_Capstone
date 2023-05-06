import React, { useState } from "react";
import axios from "axios";
import styles from "./AiTravelTrait.module.scss";

const AiTravelTrait = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(selectedOption)) {
        // 이미 선택된 옵션일 경우 선택 해제
        return prevSelectedOptions.filter(
          (option) => option !== selectedOption
        );
      } else {
        // 선택되지 않은 옵션일 경우 선택 추가
        return [...prevSelectedOptions, selectedOption];
      }
    });

    const data = {
      id: 0,
      countryName: "string",
      days: 0,
      attractions: selectedOptions,
    };

    axios.post(
      "http://ec2-54-180-128-148.ap-northeast-2.compute.amazonaws.com:5000/country",
      data,
      { mode: "no-cors" }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="문화와 예술"
              value="문화와 예술"
              checked={selectedOptions.includes("문화와 예술")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>문화와 예술</span>
          </label>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="유럽축구"
              value="유럽축구"
              checked={selectedOptions.includes("유럽축구")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>유럽축구</span>
          </label>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="자연풍경"
              value="자연풍경"
              checked={selectedOptions.includes("자연풍경")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>자연풍경</span>
          </label>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="사진명소"
              value="사진명소"
              checked={selectedOptions.includes("사진명소")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>사진명소</span>
          </label>
        </div>
        <div className={styles.col}>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="액티비티"
              value="액티비티"
              checked={selectedOptions.includes("액티비티")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>액티비티</span>
          </label>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="쇼핑과 패션"
              value="쇼핑과 패션"
              checked={selectedOptions.includes("쇼핑과 패션")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>쇼핑과 패션</span>
          </label>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="술과 음식"
              value="술과 음식"
              checked={selectedOptions.includes("술과 음식")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>술과 음식</span>
          </label>
          <label className={styles.option}>
            <input
              type="checkbox"
              id="영화촬영지"
              value="영화촬영지"
              checked={selectedOptions.includes("영화촬영지")}
              onChange={handleOptionChange}
            />
            <span className={styles.checkmark}></span>
            <span>영화촬영지</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AiTravelTrait;
