import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  responseState,
  latitudeState,
  longitudeState,
} from "../../recoils/Recoil";
import { useNavigate } from "react-router";

const AiTravelModel = () => {
  const response = useRecoilValue(responseState);
  const [, setLatitude] = useRecoilState(latitudeState);
  const [, setLongitude] = useRecoilState(longitudeState);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavigate = () => {
    navigate("/aitravelmap");
  };

  if (!response || !response.length) {
    return <div>Loading...</div>;
  }

  let countryData = {};

  if (!isLoaded) {
    response.forEach((data) => {
      const { countryName, recommend1, recommend2, recommend3 } = data;
      if (!countryData[countryName]) {
        countryData[countryName] = [];
      }
      countryData[countryName].push(
        recommend1.spot,
        recommend2.spot,
        recommend3.spot
      );
    });
    setIsLoaded(true);
  }

  return (
    <div>
      {Object.keys(countryData).map((countryName) => (
        <div key={countryName}>
          <h2>{countryName}</h2>
          {countryData[countryName].map((spot, index) => (
            <div key={index}>
              <p>Response {index + 1}:</p>
              <p>latitude: {spot?.latitude}</p>
              <p>longitude: {spot?.longitude}</p>
              <p>spot: {spot?.spot}</p>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleNavigate}>구글맵띄우기</button>
    </div>
  );
};

export default AiTravelModel;
