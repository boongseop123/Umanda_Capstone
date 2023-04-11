import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SocialLoginButton from "./socialLogin/SocialLoginButton";
import PageRatio from "../Global/PageRatio";

const LoginMain = () => {
  let [isInputClicked, setIsInputClicked] = useState(false);
  let [isInputClicked_1, setIsInputClicked_1] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = () => {
    axios
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        navigate("./MainScreen"); // 로그인 성공시 MainScreen으로 이동
        alert("로그인이 성공적으로 완료되었습니다.");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <div
      className={`${styles.Frame} ${
        PageRatio.isDesktop
          ? styles.desktop
          : PageRatio.isTablet
          ? styles.tablet
          : PageRatio.isMobile
          ? styles.mobile
          : ""
      }`}
    >
      {/* Umanda 로고 */}
      <h3 className={styles.h3}>Umanda</h3>
      <div>
        <input
          onFocus={() => {
            setIsInputClicked(true);
          }}
          onBlur={() => {
            setIsInputClicked(false);
          }}
          className={`${styles.desktopInput} ${
            PageRatio.isDesktop ? styles.desktopInput : styles.mobileInput
          }`}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isInputClicked === true ? "" : "이메일 주소 또는 아이디"}
        />
        <input
          onFocus={() => {
            setIsInputClicked_1(true);
          }}
          onBlur={() => {
            setIsInputClicked_1(false);
          }}
          className={`${styles.desktopInput} ${
            PageRatio.isDesktop ? styles.desktopInput : styles.mobileInput
          }`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isInputClicked_1 === true ? "" : "패스워드"}
        />
        <button
          onClick={handleLogin}
          className={`${styles.desktopLoginBox} ${
            PageRatio.isDesktop ? styles.desktopLoginBox : styles.mobileLoginBox
          }`}
        >
          <text className={styles.loginBoxText}>로그인</text>
        </button>
      </div>
      <div>
        <button>
          <Link to="/MainScreen">메인 스크린으로 가는 테스트 버튼</Link>{" "}
        </button>
      </div>
      <div className={styles.findIdPass}>
        <div>
          <label>
            <input
              type="radio"
              className={styles.stillLogin}
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            로그인 유지
          </label>
          <label className={styles.label_with_margin}>
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "#ef455a" }}
            >
              아이디 또는 비밀번호를 잊으셨나요? {">>"}
            </Link>
          </label>
        </div>
        <div className={styles.RegisterBox}>
          <label>
            <Link to="/register" className={styles.Register}>
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
