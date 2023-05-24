import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./AiTravelCountry.module.scss";
import { useRecoilState } from "recoil";
import { selectedCountriesState } from "../../../recoils/Recoil";
import { motion } from "framer-motion";
import Italy from "./resoure/italy.png";
import paris from "./resoure/paris.jpeg";
import london from "./resoure/londons.jpg";
import swiss from "./resoure/swiss.jpeg";
import chex from "./resoure/czeh.png";
import icon from "./resoure/recommend_icon.png";

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
      { name: "몽펠리에", checked: false, country: "France" },
      { name: "리옹", checked: false, country: "France" },
      { name: "툴루즈", checked: false, country: "France" },
      { name: "낭트", checked: false, country: "France" },
      { name: "모나코", checked: false, country: "France" },
    ],
    스페인: [
      { name: "마드리드", checked: false, country: "Spain" },
      { name: "바르셀로나", checked: false, country: "Spain" },
      { name: "산탄데르", checked: false, country: "Spain" },
      { name: "그라나다", checked: false, country: "Spain" },
      { name: "코르도바", checked: false, country: "Spain" },
      { name: "세비야", checked: false, country: "Spain" },
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
    <motion.div
      /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div>
          <div className={styles.line}>여행할 나라를 선택해주세요!</div>
          <div className={styles.flex}>
            <div className={styles.famous_city}>추천 인기 도시</div>
            <img className={styles.icon} src={icon} alt="icon" />
          </div>

          <div className={styles.famous_img}>
            <div className={styles.imageContainer}>
              <img src={chex} alt="Image 1" />
              <span className={styles.imageText}>VENICE</span>
            </div>
            <div className={styles.imageContainer}>
              <img src={paris} alt="Image 1" />
              <span className={styles.imageText}>PARIS</span>
            </div>
            <div className={styles.imageContainer}>
              <img src={london} alt="Image 1" />
              <span className={styles.imageText}>LONDON</span>
            </div>
            <div className={styles.imageContainer}>
              <img src={swiss} alt="Image 1" />
              <span className={styles.imageText}>SWISS</span>
            </div>
            <div className={styles.imageContainer}>
              <img src={Italy} alt="Image 1" />
              <span className={styles.imageText}>Italy</span>
            </div>
          </div>
          {selectedFirst && selectedSecond && selectedThird && (
            <div className={styles.selectedCountry}>
              {selectedCountries.map((country) => (
                <p key={country}>'{getKoreanCountryName(country)}' </p>
              ))}
            </div>
          )}
        </div>
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
      </div>
    </motion.div>
  );
};
export default AiTravelCountry;
