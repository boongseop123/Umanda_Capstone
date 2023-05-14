import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./AiTravelCountry.module.scss";
import { useRecoilState } from "recoil";
import { selectedCountriesState } from "../../../recoils/Recoil";

const AiTravelCountry = () => {
  const selectedCountriesRef = useRef([]);
  const [selectedFirst, setSelectedFirst] = useState("동아시아");
  const [selectedSecond, setSelectedSecond] = useState("한국");
  const [selectedThird, setSelectedThird] = useState([]);

  const [savedFirst, setSavedFirst] = useState("");
  const [savedSecond, setSavedSecond] = useState("");
  const [savedThird, setSavedThird] = useState([]);

  const firstColumn = [
    "동아시아",
    "유럽",
    "서남아시아",
    "아프리카",
    "동남아시아",
    "아메리카",
    "오세아니아",
  ];

  const secondColumn = {
    유럽: ["영국", "프랑스", "스페인", "스위스", "이탈리아", "독일"],
    동아시아: ["한국", "일본", "중국", "몽골", "대만", "마카오"],
  };

  const thirdColumn = {
    영국: [
      { name: "런던", checked: false, country: "British" },
      { name: "맨체스터", checked: false, country: "British" },
      { name: "리버풀", checked: false, country: "British" },
      { name: "에든버러", checked: false, country: "British" },
      { name: "버밍엄", checked: false, country: "British" },
      { name: "요크", checked: false, country: "British" },
      { name: "카디프", checked: false, country: "British" },
      { name: "인버네스", checked: false, country: "British" },
    ],
    프랑스: [
      { name: "파리", checked: false, country: "France" },
      { name: "마르세유", checked: false, country: "France" },
    ],
    스페인: [
      { name: "마드리드", checked: false, country: "Spain" },
      { name: "바르셀로나", checked: false, country: "Spain" },
    ],
    스위스: [
      { name: "취리히", checked: false, country: "Switzerland" },
      { name: "베른", checked: false, country: "Switzerland" },
    ],
    이탈리아: [
      { name: "로마", checked: false, country: "Italy" },
      { name: "밀라노", checked: false, country: "Italy" },
    ],
    독일: [
      { name: "베를린", checked: false, country: "Germeny" },
      { name: "뮌헨", checked: false, country: "Germeny" },
    ],
  };

  const handleFirstClick = (item) => {
    setSelectedFirst(item);
    setSelectedSecond("");
    setSelectedThird([]);

    if (savedFirst === item) {
      setSelectedSecond(savedSecond);
      setSelectedThird(savedThird);
    } else {
      setSavedFirst(item);
      setSavedSecond("");
      setSavedThird([]);
    }
  };

  const handleSecondClick = (item) => {
    setSelectedSecond(item);
    setSelectedThird([]);

    if (savedSecond === item) {
      setSelectedThird(savedThird);
    } else {
      setSavedSecond(item);
      setSavedThird([]);
    }
  };

  const [selectedCountries, setSelectedCountries] = useRecoilState(
    selectedCountriesState
  );

  const handleThirdClick = (item) => {
    const updatedSelectedThird = [...selectedThird];
    const index = selectedThird.findIndex(
      (selectedItem) => selectedItem.name === item.name
    );

    if (index > -1) {
      updatedSelectedThird.splice(index, 1);
    } else {
      updatedSelectedThird.push(item);
    }

    setSelectedThird(updatedSelectedThird);

    const newSelectedCountries = updatedSelectedThird.reduce(
      (countries, item) => {
        // 중복 선택된 도시의 국가 이름을 제거합니다.
        if (!countries.includes(item.country)) {
          countries.push(item.country);
        }
        return countries;
      },
      []
    );

    setSelectedCountries((prevSelectedCountries) => {
      const newSelectedCountries = [...prevSelectedCountries];
      // 기존에 선택된 국가가 아닌 새로운 국가를 추가합니다.
      item.country &&
        !newSelectedCountries.includes(item.country) &&
        newSelectedCountries.push(item.country);
      return newSelectedCountries;
    });
  };

  useEffect(() => {
    console.log(selectedCountries);
  }, [selectedCountries]);

  useEffect(() => {
    console.clear();
  }, []);

  function saveSelectedCountries() {
    selectedCountriesRef.current = selectedThird.reduce((countries, item) => {
      if (!countries.includes(item.country)) {
        countries.push(item.country);
      }
      return countries;
    }, []);
    return selectedCountriesRef.current;
  }

  function getKoreanCountryName(country) {
    switch (country) {
      case "British":
        return "영국";
      case "France":
        return "프랑스";
      case "Spain":
        return "스페인";
      case "Switzerland":
        return "스위스";
      case "Italy":
        return "이탈리아";
      case "Germeny":
        return "독일";
      default:
        return country;
    }
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.column}>
          {firstColumn.map((item) => (
            <button
              key={item}
              onClick={() => handleFirstClick(item)}
              className={selectedFirst === item ? styles.active : ""}
            >
              {item}
            </button>
          ))}
        </div>
        {selectedFirst && (
          <div className={styles.column}>
            {secondColumn[selectedFirst] &&
              secondColumn[selectedFirst].map((item) => (
                <button
                  key={item}
                  onClick={() => handleSecondClick(item)}
                  className={selectedSecond === item ? styles.active : ""}
                >
                  {item}
                </button>
              ))}
          </div>
        )}
        {selectedSecond && (
          <div className={styles.column}>
            {thirdColumn[selectedSecond] &&
              thirdColumn[selectedSecond].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleThirdClick(item)}
                  className={
                    (selectedThird &&
                      selectedThird.findIndex(
                        (selectedItem) => selectedItem.name === item.name
                      ) > -1) ||
                    item.checked
                      ? styles.active
                      : ""
                  }
                >
                  {item.name}
                </button>
              ))}
          </div>
        )}
      </div>
      {selectedFirst && selectedSecond && selectedThird && (
        <div className={styles.selectedCountry}>
          <p>선택한 나라:</p>
          {selectedCountries.map((country) => (
            <p key={country}>{getKoreanCountryName(country)}</p>
          ))}
        </div>
      )}
    </div>
  );
};
export default AiTravelCountry;
