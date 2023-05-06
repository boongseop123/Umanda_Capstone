import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./birthComponent.module.scss";
import { useMediaQuery } from "react-responsive";

function BirthdatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    if (props.birthdate) {
      setSelectedDate(new Date(props.birthdate));
    }
  }, [props.birthdate]);

  const handleChange = (date) => {
    setSelectedDate(date);
    const year = date?.getFullYear() ?? "";
    const month = date?.getMonth() + 1 ?? "";
    const day = date?.getDate() ?? "";
    const birthdate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    props.onBirthdateChange(birthdate);
    console.log(birthdate);
  };

  const handleYearChange = (e) => {
    const year = Number(e.target.value);
    const month = selectedDate?.getMonth() ?? 0;
    const date = selectedDate?.getDate() ?? 1;
    const newDate = new Date(year, month, date);
    handleChange(newDate);
  };

  const handleMonthChange = (e) => {
    const year = selectedDate?.getFullYear() ?? new Date().getFullYear();
    const month = Number(e.target.value) - 1;
    const date = selectedDate?.getDate() ?? 1;
    const newDate = new Date(year, month, date);
    handleChange(newDate);
  };

  const handleDateChange = (e) => {
    const year = selectedDate?.getFullYear() ?? new Date().getFullYear();
    const month = selectedDate?.getMonth() ?? 0;
    const date = Number(e.target.value);
    const newDate = new Date(year, month, date);
    handleChange(newDate);
  };

  const yearOptions = [];
  for (let i = new Date().getFullYear(); i >= 1900; i--) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const monthOptions = [];
  for (let i = 1; i <= 12; i++) {
    monthOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
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
    dayOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className={styles.birthday}>
      <select
        className={styles.date}
        value={selectedDate ? selectedDate.getFullYear() : ""}
        onChange={handleYearChange}
      >
        <option value="">년도</option>
        {yearOptions}
      </select>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select
        className={styles.date}
        value={selectedDate ? selectedDate.getMonth() + 1 : ""}
        onChange={handleMonthChange}
      >
        <option value="">월</option>
        {monthOptions}
      </select>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select
        className={styles.date}
        value={selectedDate ? selectedDate.getDate() : ""}
        onChange={handleDateChange}
      >
        <option value="">일</option>
        {dayOptions}
      </select>
    </div>
  );
}

export default BirthdatePicker;
