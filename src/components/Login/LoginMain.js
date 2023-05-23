import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SocialLoginButton from "./socialLogin/SocialLoginButton";
import PageRatio from "../Global/PageRatio";
import { useMediaQuery } from "react-responsive";
import { useSetRecoilState, useRecoilState } from "recoil";
import { tokenState, IdState, usernameState } from "../../recoils/Recoil";
import { API_URL } from "../Constant";
import { motion } from "framer-motion";

const LoginMain = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const setToken = useSetRecoilState(tokenState);
  const [id, setId] = useRecoilState(IdState);
  // tokenState atom의 값을 읽어옴
  const setusername = useSetRecoilState(usernameState);

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
      .post(`${API_URL}/users/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);

        const { jwtToken, id } = response.data;

        setToken(jwtToken);
        setId(id);
        setusername(username);

        // Save token and id to localStorage
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("id", id);

        alert("로그인이 성공적으로 완료되었습니다.");
        console.log(jwtToken);
        console.log(id);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response);
        alert("로그인에 실패했습니다.");
      });
  };
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <motion.div
      /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.div>
  );
};

export default LoginMain;
