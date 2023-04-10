import IntroPage from "./components/Intro/IntroPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
