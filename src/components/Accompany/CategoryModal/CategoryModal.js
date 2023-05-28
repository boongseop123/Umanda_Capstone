import React, { useState } from "react";
import styles from "./CategoryModal.module.scss";
import { useMediaQuery } from "react-responsive";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import "react-datepicker/dist/react-datepicker.css";

const CategoryModal = ({ isOpen, onClose }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [value, onChange] = useState(new Date());

  // const confirm;
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div>
          <h4 className={styles.h2}>성별</h4>
          <div className={styles.container}>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              남성
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              여성
            </div>
          </div>
        </div>
        <div>
          <h4 className={styles.h2}>나이</h4>
          <div className={styles.container}>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              10대
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              20대
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              30대
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              40대
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              50대
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              60대
            </div>
          </div>
        </div>
        <div>
          <h4>여행 유형</h4>
          <div className={styles.container}>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              문화
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              스포츠
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              자연
            </div>
            <div
              className={
                isDesktop ? styles.containerDesktop : styles.genderMobile
              }
            >
              40대
            </div>
          </div>
        </div>
        <div>
          <h4>출발 날짜</h4>
          <div className={styles.Calender}>
            <Calender onChange={onChange} value={value} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button className={styles.submitButton}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
