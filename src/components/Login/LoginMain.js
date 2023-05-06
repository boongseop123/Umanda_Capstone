import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SocialLoginButton from "./socialLogin/SocialLoginButton";
import PageRatio from "../Global/PageRatio";
import { useMediaQuery } from "react-responsive";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../Recoils/Recoil";

const LoginMain = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const setToken = useSetRecoilState(tokenState);
  // tokenState atom의 값을 읽어옴

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = () => {
    axios
      .post(
        "http://ec2-13-209-21-62.ap-northeast-2.compute.amazonaws.com:8080/login",
        {
          username: username,
          password: password,
        }
      )
      .then((response) => {
        console.log(response.data);
        setToken(response.data.jwtToken);
        alert("로그인이 성공적으로 완료되었습니다.");
        console.log(response.data.jwtToken);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("로그인에 실패했습니다.");
      });
  };

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={`${styles.Frame} ${
        isDesktop ? styles.desktop : isMobile ? styles.mobile : ""
      }`}
    >
      <h3
        className={`${
          isDesktop ? styles.desktopH3 : isMobile ? styles.mobileH3 : ""
        }`}
      >
        Umanda
      </h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          className={`${styles.desktopInput} ${
            isDesktop ? styles.desktopInput : styles.mobileInput
          }`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="이메일 주소 또는 아이디"
        />
        <input
          className={`${styles.desktopInput} ${
            isDesktop ? styles.desktopInput : styles.mobileInput
          }`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="패스워드"
        />
      </div>
      <div className={styles.findIdPass}>
        <div>
          <label htmlFor="keepLogin">
            <input
              type="checkbox"
              id="keepLogin"
              checked={isChecked}
              onChange={handleCheck}
              className={styles.stillLogin}
            />
            로그인 유지
          </label>
          <label className={styles.label_with_margin}>
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "#ef455a" }}
            >
              아이디 또는 비밀번호를 잊으셨나요?
            </Link>
          </label>
        </div>
        <div>
          <button
            onClick={handleLogin}
            className={`${styles.desktopLoginBox} ${
              isDesktop ? styles.desktopLoginBox : styles.mobileLoginBox
            }`}
          >
            <text className={styles.loginBoxText}>로그인</text>
          </button>
        </div>
        <div className={styles.RegisterBox}>
          <label>
            <Link to="/sign-up" className={styles.Register}>
              Umanda가 처음이신가요? 회원가입
            </Link>
          </label>
        </div>
        <div>
          <SocialLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
