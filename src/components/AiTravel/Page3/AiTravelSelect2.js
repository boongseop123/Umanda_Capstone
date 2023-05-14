import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./AiTravelSelect.module.scss";
import refresh from "../resource/refresh.png";
import right_arrow from "../resource/right_arrow.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URL_AI } from "../../Constant";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCountriesState,
  selectedOptionsState,
} from "../../../recoils/Recoil";

const AiTravelSelect2 = ({ onNextStep }) => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null); // 응답데이터를 저장할 상태

  const [selectedOptions, setSelectedOptions] =
    useRecoilState(selectedOptionsState);
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const selectedCountries = useRecoilValue(selectedCountriesState);
  console.log(selectedCountries);

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

  const handleNextStep = async () => {
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
    <div style={{ height: "100%" }}>
      <div
        className={`${
          isDesktop ? styles.CategoryDesktop : styles.CategoryMobile
        }`}
      >
        <br />
        <br />
        <label style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={styles.refresh}>초기화</div>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={refresh}
                alt="your-image-description-here"
                style={{ width: "16px" }}
              />
            </span>
            <div className={styles.next_step} onClick={handleNextStep}>
              다음 단계
            </div>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={right_arrow}
                alt="your-image-description-here"
                style={{ width: "16px", filter: "hue-rotate(340deg)" }}
              />
              <img
                src={right_arrow}
                alt="your-image-description-here"
                style={{ width: "16px", filter: "hue-rotate(340deg)" }}
              />
            </span>
          </div>
        </label>
        <br />
        <br />
      </div>
    </div>
  );
};

export default AiTravelSelect2;
