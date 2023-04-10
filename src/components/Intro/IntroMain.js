import styles from "./IntroPage.module.scss";
import { Link } from "react-router-dom";

const IntroMain = () => {
  return (
    <div className={styles.LoadingScreen}>
      <div className={styles.h3Design}>
        <h3 className={styles.h3}>Umanda</h3>
        <Link
          to="/"
          style={{
            textDecoration: " none",
            color: "white",
          }}
        ></Link>
      </div>
    </div>
  );
};
export default IntroMain;
