import styles from "../LoginPage.module.scss";
import { KAKAO_AUTH_URL } from "../../social/KakaoOauth";
import { NAVER_AUTH_URL } from "../../social/NaverOauth";
import { GOOGLE_LOGIN_URL } from "../../social/GoogleOauth";

const SocialLoginButton = () => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  const googleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className={styles.snsLoginMargin}>
      <button onClick={kakaoLogin} className={styles.KAKAOLogin}></button>
      <button onClick={naverLogin} className={styles.NAVERLogin}></button>
      <button onClick={googleLogin} className={styles.GOOGLELogin}></button>
    </div>
  );
};

export default SocialLoginButton;
