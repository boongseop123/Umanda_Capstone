import React from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import {
  selectedSpotsState,
  selectedCountryNameState,
  responseState,
} from "../../recoils/Recoil";
import { API_URL_AI } from "../Constant";
import { useNavigate } from "react-router-dom";

const AiTravelDate = () => {
  const navigate = useNavigate();
  const moveToModel = () => {
    navigate("/aitravelmodel");
  };

  const [selectedSpots, setSelectedSpots] = useRecoilState(selectedSpotsState);
  const [selectedCountryName, setSelectedCountryName] = useRecoilState(
    selectedCountryNameState
  );
  const [response, setResponse] = useRecoilState(responseState);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL_AI}/country`, {
        spot: [...selectedSpots], // 배열로 전달
        countryName: selectedCountryName,
        id: 1,
        days: 2,
      });
      console.log(response.data);
      setResponse(response.data);
      navigate("/aitravelmodel");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>관광지들</h2>
      <ul>
        {selectedSpots.map((spot, index) => (
          <li key={index}>{spot}</li>
        ))}
      </ul>
      <h2>나라(일단 한개만)</h2>
      <p>{selectedCountryName}</p>
      <button onClick={handleSubmit}>모델돌리기</button>
    </div>
  );
};

export default AiTravelDate;
