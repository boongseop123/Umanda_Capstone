import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./SignUpPage.module.scss";

const SignUpMain = () => {
  let [isIdClicked, setisIdClicked] = useState(false);
  let [isPassClicked, setisPassClicked] = useState(false);
  let [isPassClicked_1, setisPassClicked_1] = useState(false);
  let [isNameClicked, setisNameClicked] = useState(false);
  let [isPhoneNumClicked, setisPhoneNumClicked] = useState(false);

  /* 생년월일 함수 */
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleYearChange = (e: any) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e: any) => {
    setMonth(e.target.value);
  };

  const handleDayChange = (e: any) => {
    setDay(e.target.value);
  };

  const [gender, setGender] = useState("");

  const handleGenderChange = (e: any) => {
    setGender(e.target.value);
  };

  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleDuplicateCheck = () => {
    axios
      .post("/api/check-duplicate-username", {
        username: username,
      })
      .then((response) => {
        console.log(response.data);
        setIsDuplicate(response.data.isDuplicate);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsDuplicate(false);
        alert("아이디 중복 확인에 실패했습니다.");
      });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: any) => {
    setPasswordConfirm(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const handleRegister = () => {
    axios
      .post("/register", {
        username,
        password,
        name,
        phone,
        year,
        month,
        day,
        gender,
      })
      .then((response) => {
        console.log(response.data);
        alert("회원가입이 완료되었습니다.");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <div className={styles.Container}>
      <h2 className={styles.register}>회원가입</h2>
      <div className={styles.Container2}>
        <div>
          <p className={styles.id}>아이디</p>
          <input
            onFocus={() => {
              setisIdClicked(true);
            }}
            onBlur={() => {
              setisIdClicked(false);
            }}
            className={styles.inputId}
            type="string"
            placeholder={isIdClicked === true ? "" : "아이디 입력 (6 ~ 20자)"}
            value={username}
            onChange={handleUsernameChange}
          />
          <button
            className={styles.duplicateButton}
            onClick={handleDuplicateCheck}
          >
            중복 확인
          </button>
          {isDuplicate && (
            <p className={styles.duplicate}>이미 사용 중인 아이디입니다.</p>
          )}
        </div>
        <div>
          <p className={styles.id}>패스워드</p>
          <input
            onFocus={() => {
              setisPassClicked(true);
            }}
            onBlur={() => {
              setisPassClicked(false);
            }}
            className={styles.inputId}
            type="string"
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
          <p className={styles.id}>패스워드 확인</p>
          <input
            onFocus={() => {
              setisPassClicked_1(true);
            }}
            onBlur={() => {
              setisPassClicked_1(false);
            }}
            className={styles.inputId}
            type="password"
            placeholder={
              isPassClicked_1 === true
                ? ""
                : "패스워드 입력 (문자, 숫자, 특수문자 포함 8 ~ 20자)"
            }
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
        </div>
        <div>
          <p className={styles.id}>이름</p>
          <input
            onFocus={() => {
              setisNameClicked(true);
            }}
            onBlur={() => {
              setisNameClicked(false);
            }}
            className={styles.inputId}
            type="string"
            placeholder={isNameClicked === true ? "" : "이름을 입력해주세요"}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <p className={styles.id}>휴대폰 번호</p>
          <input
            onFocus={() => {
              setisPhoneNumClicked(true);
            }}
            onBlur={() => {
              setisPhoneNumClicked(false);
            }}
            className={styles.inputId}
            type="string"
            placeholder={
              isPhoneNumClicked === true
                ? ""
                : "휴대폰 번호 입력 ('-' 제외 11자리 입력)"
            }
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div>
          <p className={styles.id}>생년월일</p>
          <input
            className={styles.Birth}
            type="number"
            placeholder="연도"
            value={year}
            onChange={handleYearChange}
          />
          <input
            className={styles.Birth}
            type="number"
            placeholder="월"
            value={month}
            onChange={handleMonthChange}
          />
          <input
            className={styles.Birth}
            type="number"
            placeholder="일"
            value={day}
            onChange={handleDayChange}
          />
        </div>
        <div className={styles.label}>
          <p>성별</p>
          <label className={styles.maleLabel}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={handleGenderChange}
            />
            남성
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={handleGenderChange}
            />
            여성
          </label>
        </div>
      </div>
      <div>
        <button onClick={handleRegister} className={styles.registerButton}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUpMain;
