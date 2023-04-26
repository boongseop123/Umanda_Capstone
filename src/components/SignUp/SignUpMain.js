import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./SignUpPage.module.scss";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import BirthdatePicker from "./Pages/birthComponent";

const SignUpMain = () => {
  const [responseData, setResponseData] = useState(null);

  let [isIdClicked, setisIdClicked] = useState(false);
  let [isPassClicked, setisPassClicked] = useState(false);
  let [isPassClicked_1, setisPassClicked_1] = useState(false);
  let [isNameClicked, setisNameClicked] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(0);
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState({});

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const navigate = useNavigate();

  /* 유효성 검사 */
  const handleRegister = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://ec2-13-125-237-47.ap-northeast-2.compute.amazonaws.com:8080/register",
        {
          username: username,
          password: password,
          password1: password1,
          name: name,
          birthdate: birthdate,
          gender: gender,
        }
      )
      .then((response) => {
        console.log(response);
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={`${styles.Frame} ${
        isDesktop ? styles.desktop : isMobile ? styles.mobile : ""
      }`}
    >
      <h4 className={styles.register}>회원가입</h4>
      <br></br>
      <br></br>
      <div>
        <label>
          <h5 className={styles.register}>아이디</h5>
          <input
            onFocus={() => {
              setisIdClicked(true);
            }}
            onBlur={() => {
              setisIdClicked(false);
            }}
            className={`${styles.desktopInput1} ${
              isDesktop ? styles.desktopInput : styles.mobileInput1
            }`}
            type="string"
            placeholder={isIdClicked === true ? "" : "아이디 입력 (6 ~ 20자)"}
            value={username}
            onChange={handleUsernameChange}
          />
          <button className={styles.duplicateButton}>중복확인</button>
        </label>
      </div>
      <div>
        <h5 className={styles.id}>패스워드</h5>
        <input
          onFocus={() => {
            setisPassClicked(true);
          }}
          onBlur={() => {
            setisPassClicked(false);
          }}
          className={`${styles.desktopInput} ${
            isDesktop ? styles.desktopInput : styles.mobileInput
          }`}
          type="password"
          placeholder={
            isPassClicked === true
              ? ""
              : "패스워드 입력 (문자, 숫자, 특수문자 포함 8 ~ 20자)"
          }
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <h5 className={styles.id}>패스워드 확인</h5>
        <input
          onFocus={() => {
            setisPassClicked_1(true);
          }}
          onBlur={() => {
            setisPassClicked_1(false);
          }}
          className={`${styles.desktopInput} ${
            isDesktop ? styles.desktopInput : styles.mobileInput
          }`}
          type="password"
          placeholder={
            isPassClicked_1 === true
              ? ""
              : "패스워드 입력 (문자, 숫자, 특수문자 포함 8 ~ 20자)"
          }
          value={password1}
          onChange={handlePassword1Change}
        />
      </div>
      <div>
        <h5 className={styles.id}>이름</h5>
        <input
          onFocus={() => {
            setisNameClicked(true);
          }}
          onBlur={() => {
            setisNameClicked(false);
          }}
          className={`${styles.desktopInput} ${
            isDesktop ? styles.desktopInput : styles.mobileInput
          }`}
          type="string"
          placeholder={isNameClicked === true ? "" : "이름을 입력해주세요"}
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <h5 className={styles.id}>생년월일</h5>
        {/*<input
        className={styles.Birth}
        type="number"
        placeholder="연도"
        value={birthdate}
        onChange={handleBirthChange}
        /> */}

        <BirthdatePicker className="custom-datepicker" />
      </div>
      <div className={styles.label}>
        <h5>성별</h5>
        <label className={styles.maleLabel}>
          <input
            type="radio"
            name="gender"
            value="MAN"
            checked={gender === "MAN"}
            className={styles.stillLogin}
            onChange={handleGenderChange}
          />
          <text className={styles.malefont}>남성</text>
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="WOMEN"
            checked={gender === "WOMEN"}
            className={styles.stillLogin}
            onChange={handleGenderChange}
          />
          <text className={styles.malefont}>여성</text>
        </label>
      </div>
      <div
        div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <button
          onClick={handleRegister}
          className={`${styles.desktopLoginBox} ${
            isDesktop ? styles.desktopLoginBox : styles.mobileLoginBox
          }`}
        >
          <text className={styles.loginBoxText}>회원가입</text>
        </button>
        {responseData && <div>{responseData}</div>}
      </div>
    </div>
  );
};

export default SignUpMain;
