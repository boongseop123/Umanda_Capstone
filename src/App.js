import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import IntroPage from "./components/Intro/IntroPage";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import MainPage from "./components/Main/MainPage";
import AccompanyPage from "./components/Accompany/AccompanyPage";
import AiTravelPage from "./components/AiTravel/AiTravelPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/accompany" element={<AccompanyPage />} />
          <Route path="/aitravel" element={<AiTravelPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
