import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedOptionsState,
  selectedCountriesState,
} from "../../../recoils/Recoil";
import axios from "axios";
import { API_URL_AI } from "../../Constant";
import { useNavigate } from "react-router";
import styles from "./AiTravelTrait.module.scss";

const AiTravelTrait = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null); // 응답데이터를 저장할 상태

  const selectedCountries = useRecoilValue(selectedCountriesState);
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(selectedOptionsState);

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(selectedOption)) {
        return prevSelectedOptions.filter(
          (option) => option !== selectedOption
        );
      } else {
        return [...prevSelectedOptions, selectedOption];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // 선택된 국가와 옵션을 JSON 형식으로 변환하여 서버에 보낸다.
      const data = JSON.stringify({
        countryName: selectedCountries,
        features: selectedOptions,
      });
      console.log(data);
      const response = await axios.post(`${API_URL_AI}/getURI`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(response.data); // 응답데이터를 상태로 저장
      console.log("성공적으로 서버에 데이터를 보냈습니다!");
      navigate("/ai-travel-spot-select", {
        state: { response: response.data },
      }); // 이동할 경로를 지정
    } catch (error) {
      console.error(
        "데이터를 서버에 보내는 도중에 에러가 발생했습니다:",
        error
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>원하는 여행 테마를 선택해 주세요!</div>
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
