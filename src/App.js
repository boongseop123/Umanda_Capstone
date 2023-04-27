import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/Intro/IntroPage";
import LoginMain from "./components/Login/LoginMain";
import MainPage from "./components/Main/Main/MainPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import AccompanyPage from "./components/accompany/AccompanyPage";
import AiPage from "./components/AI/AiPage";
import MeetPage from "./components/Meet/MeetPage";
import ChatPage from "./components/Chatting/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginMain />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/accompany" element={<AccompanyPage />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/meet" element={<MeetPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
