import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  selectedCountriesState,
  travelDurationState,
} from "../../../recoils/Recoil";
import styles from "./AiTravelCalender.Module.scss"; // 경로 수정
import { motion } from "framer-motion";

const AiTravelCalendar = () => {
  const selectedCountries = useRecoilValue(selectedCountriesState);
  const [selectedDates, setSelectedDates] = useState([]);
  const [countryDurations, setCountryDurations] = useState([]);
  const [travelDuration, setTravelDuration] =
    useRecoilState(travelDurationState);

  useEffect(() => {
    const initializeCountryDurations = () => {
      const durations = selectedCountries.map(() => null);
      setCountryDurations(durations);
    };

    initializeCountryDurations();
  }, [selectedCountries]);

  useEffect(() => {
    console.log("Selected Countries:", selectedCountries);
    console.log("Country Durations:", countryDurations);
    console.log("Travel Duration:", travelDuration);
  }, [selectedCountries, countryDurations, travelDuration]);

  const handleDateChange = (date) => {
    setSelectedDates(date);

    if (date.length === 2) {
      const [startDate, endDate] = date;
      const duration = calculateDuration(startDate, endDate);

      const updatedCountryDurations = [...countryDurations];
      const selectedIndex = updatedCountryDurations.findIndex(
        (duration) => duration === null
      );

      if (selectedIndex !== -1) {
        updatedCountryDurations[selectedIndex] = duration;
        setCountryDurations(updatedCountryDurations);

        if (updatedCountryDurations.every((duration) => duration !== null)) {
          setTravelDuration(updatedCountryDurations);
        }
      }
    }
  };

  const calculateDuration = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return duration;
    }
    return 0;
  };

  const translateCountryName = (country) => {
    switch (country) {
      case "British":
        return "영국";
      case "France":
        return "프랑스";
      case "Italy":
        return "이탈리아";
      case "Spain":
        return "스페인";
      case "Swiss":
        return "스위스";
      default:
        return country;
    }
  };

  return (
    <motion.div
      /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="custom-calendar-wrapper">
        <h2 className={styles.h3select}>여행 기간을 선택해 주세요</h2>
        <br></br>
        {countryDurations.map((duration, index) => (
          <h4 key={index} className={styles.text}>
            {translateCountryName(selectedCountries[index])}:{" "}
            {duration !== null ? duration + "일" : "기간이 선택되지 않았습니다"}
          </h4>
        ))}
        <div className="custom-calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange
            className="custom-calendar"
            tileClassName="custom-calendar-tile"
            calendarType="US"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AiTravelCalendar;
