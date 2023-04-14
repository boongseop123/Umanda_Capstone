import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/Intro/IntroPage";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import MainPage from "./components/Main/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
