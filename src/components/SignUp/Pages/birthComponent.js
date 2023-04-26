import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./birthComponent.module.scss";
import { useMediaQuery } from "react-responsive";

function BirthdatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const yearOptions = [];
  for (let i = new Date().getFullYear(); i >= 1900; i--) {
    yearOptions.push(<option value={i}>{i}</option>);
  }

  const monthOptions = [];
  for (let i = 1; i <= 12; i++) {
    monthOptions.push(<option value={i}>{i}</option>);
  }

  const dayOptions = [];
  const daysInMonth = selectedDate
    ? new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).getDate()
    : 31; // default to 31 days
  for (let i = 1; i <= daysInMonth; i++) {
    dayOptions.push(<option value={i}>{i}</option>);
  }

  return (
    <div className={styles.birthday}>
      <select
        className={styles.date}
        value={selectedDate ? selectedDate.getFullYear() : ""}
        onChange={(e) =>
          handleChange(
            new Date(
              e.target.value,
              selectedDate?.getMonth(),
              selectedDate?.getDate()
            )
          )
        }
      >
        <option value="">
          <text className={styles.date}>년도</text>
        </option>
        {yearOptions}
      </select>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select
        className={styles.date}
        value={selectedDate ? selectedDate.getMonth() + 1 : ""}
        onChange={(e) =>
          handleChange(
            new Date(
              selectedDate?.getFullYear(),
              e.target.value - 1,
              selectedDate?.getDate()
            )
          )
        }
      >
        <option value="">
          <text className={styles.date}>월</text>
        </option>
        {monthOptions}
      </select>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select
        className={styles.date}
        value={selectedDate ? selectedDate.getDate() : ""}
        onChange={(e) =>
          handleChange(
            new Date(
              selectedDate?.getFullYear(),
              selectedDate?.getMonth(),
              e.target.value
            )
          )
        }
      >
        <option value="">일</option>
        {dayOptions}
      </select>
    </div>
  );
}

export default BirthdatePicker;
