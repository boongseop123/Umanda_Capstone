import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SocialLoginButton from "./socialLogin/SocialLoginButton";

const LoginMain = () => {
  let [isInputClicked, setIsInputClicked] = useState(false);
  let [isInputClicked_1, setIsInputClicked_1] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberMeClicked, setRememberMeClicked] = useState(false);

  const navigate = useNavigate();

  const handleRememberMe = () => {
    if (rememberMeClicked) {
      setRememberMe(!rememberMe);
    }
    setRememberMeClicked(true);
  };

  const handleLogin = () => {
    axios
      .post(
        "https://virtserver.swaggerhub.com/PJH575157/EUROPlanner/1.0.0/login",
        {
          username: username,
          password: password,
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("로그인이 성공적으로 완료되었습니다.");
        navigate("/main"); // 로그인 성공시 MainScreen으로 이동
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("로그인에 실패했습니다.");
      });
  };

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className={styles.Frame}>
      {/* Umanda 로고 */}
      <h3 className={`${isDesktop ? styles.desktopH3 : styles.mobileH3}`}>
        Umanda
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          onFocus={() => {
            setIsInputClicked(true);
          }}
          onBlur={() => {
            setIsInputClicked(false);
          }}
          className={`${isDesktop ? styles.desktopInput : styles.mobileInput}`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={isInputClicked === true ? "" : "이메일 주소 또는 아이디"}
        />
        <input
          onFocus={() => {
            setIsInputClicked_1(true);
          }}
          onBlur={() => {
            setIsInputClicked_1(false);
          }}
          className={`${isDesktop ? styles.desktopInput : styles.mobileInput}`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isInputClicked_1 === true ? "" : "패스워드"}
        />
        <div style={{ marginTop: "50px" }}>
          <label className={styles.stillLoginLabel}>
            <input
              type="radio"
              className={styles.stillLogin}
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            로그인 유지
          </label>
          <label
            className={`${
              isDesktop
                ? styles.label_with_margin
                : styles.label_with_margin_mobile
            }`}
          >
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "#ef455a" }}
            >
              아이디 또는 비밀번호를 잊으셨나요? {">>"}
            </Link>
          </label>
        </div>
        <button
          onClick={handleLogin}
          className={`${
            isDesktop ? styles.desktopLoginBox : styles.mobileLoginBox
          }`}
        >
          <text className={styles.loginBoxText}>로그인</text>
        </button>
      </div>
      {/* <div>
        <button>
          <Link to="/main">메인 스크린으로 가는 테스트 버튼</Link>
        </button>
      </div> */}
      <div className={styles.findIdPass}>
        <div className={styles.RegisterBox}>
          <label>
            <Link to="/sign-up" className={styles.Register}>
              Umanda가 처음이신가요? 회원가입
            </Link>
          </label>
        </div>
        <SocialLoginButton />
      </div>
    </div>
  );
};

export default LoginMain;
