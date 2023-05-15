import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import {
  selectedSpotsState,
  selectedCountryNameState,
  selectedSpotsByCountryState,
  responseState,
  updatedSelectedSpotsByCountryState,
  travelDurationState,
  IdState,
} from "../../recoils/Recoil";
import { API_URL_AI } from "../Constant";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";
import styles from "./Page1/AiTravelMain.module.scss";

const AiOverView = () => {
  const navigate = useNavigate();
  const moveToModel = () => {
    navigate("/aitravelmodel");
  };
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [selectedSpots, setSelectedSpots] = useRecoilState(selectedSpotsState);
  const [selectedCountryName, setSelectedCountryName] = useRecoilState(
    selectedCountryNameState
  );
  const updatedSelectedSpotsByCountry = useRecoilValue(
    updatedSelectedSpotsByCountryState
  );
  const selectedSpotsByCountry = useRecoilValue(selectedSpotsByCountryState);
  const [response, setResponse] = useRecoilState(responseState);
  const travelDuration = useRecoilValue(travelDurationState);
  const IdToken = useRecoilValue(IdState);
  const handleSubmit = async () => {
    try {
      const requests = Object.entries(updatedSelectedSpotsByCountry).map(
        async ([country, spots], index) => {
          const days = travelDuration[index] || 0;
          const requestBody = {
            id: IdToken,
            countryName: country,
            days: travelDuration[index] || 0,
            spot: [...spots],
          };

          console.log(requestBody.countryName);
          console.log(requestBody.days);
          console.log(requestBody.id);

          const response = await axios.post(
            `${API_URL_AI}/country`,
            requestBody
          );
          console.log(response.data);
          return response.data;
        }
      );

      const responses = await Promise.all(requests);
      setResponse(responses);
      navigate("/aitravelmodel");
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Selected spots by country:", updatedSelectedSpotsByCountry);

  let selectedCountryText = "";
  if (Array.isArray(selectedCountryName)) {
    selectedCountryText = selectedCountryName.join(", ");
  } else {
    selectedCountryText = selectedCountryName;
  }

  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
        <div>
          <h2>관광지들</h2>
          {Object.entries(updatedSelectedSpotsByCountry).map(
            ([country, spots]) => (
              <div key={country}>
                <h3>{country}</h3>
                <ul>
                  {spots.map((spot, index) => (
                    <li key={index}>{spot}</li>
                  ))}
                </ul>
              </div>
            )
          )}
          <h2>선택한 나라</h2>
          <ul>
            {Object.keys(updatedSelectedSpotsByCountry).map(
              (country, index) => (
                <li key={index}>{country}</li>
              )
            )}
          </ul>
          <button onClick={handleSubmit}>모델 실행</button>
        </div>
      </div>
    </div>
  );
};

export default AiOverView;
