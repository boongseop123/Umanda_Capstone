import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AnimatePresence } from "framer-motion";
import IntroPage from "./components/Intro/IntroPage";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import MainPage from "./components/Main/MainPage";
import AccompanyPage from "./components/Accompany/AccompanyPage";
import AiTravelPage from "./components/AiTravel/Page1/AiTravelPage";
import AiTravelPage2 from "./components/AiTravel/Page3/AiTravelPage2";
import AiTravelSpotSelect from "./components/AiTravel/AiTravelSpotSelect";
import AiOverView from "./components/AiTravel/AiOverView";
import AiTravelModel from "./components/AiTravel/AiTravelModel";
import AiTravelMap from "./components/AiTravel/AiTravelMap";
import AiTravelPage3 from "./components/AiTravel/Page2/AiTravelPage3";
import PostPage from "./components/Post/PostPage";
import ChatPage from "./components/Chatting/ChatPage";
import MeetPage from "./components/Meet/MeetPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/accompany" element={<AccompanyPage />} />
            <Route path="/aitravel" element={<AiTravelPage />} />
            <Route path="/aitravel2" element={<AiTravelPage2 />} />
            <Route path="/aitravel_calender" element={<AiTravelPage3 />} />
            <Route
              path="/ai-travel-spot-select"
              element={<AiTravelSpotSelect />}
            />
            <Route path="/aitravel_date" element={<AiOverView />} />
            <Route path="/aitravelmodel" element={<AiTravelModel />} />
            <Route path="/aitravelmap" element={<AiTravelMap />} />
            <Route path="/meet" element={<MeetPage />} />
            <Route path="/chatPage/:username" element={<ChatPage />} />
            <Route path="/post" element={<PostPage />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
