import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  responseState,
  latitudeState,
  longitudeState,
  newResponseState,
} from "../../recoils/Recoil";
import { useNavigate } from "react-router";

const AiTravelModel = () => {
  const response = useRecoilValue(newResponseState);
  const [, setLatitude] = useRecoilState(latitudeState);
  const [, setLongitude] = useRecoilState(longitudeState);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    if (response && response.length > 0 && !isLoaded) {
      const newCountryData = {};
      response.forEach((data) => {
        const { id, recommend1, recommend2, recommend3 } = data;
        newCountryData[id] = {
          recommend1: recommend1 || [],
          recommend2: recommend2 || [],
          recommend3: recommend3 || [],
        };
      });
      setCountryData(newCountryData);
      setIsLoaded(true);
    }
  }, [response, isLoaded]);

  const handleNavigate = () => {
    navigate("/aitravelmap");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.keys(countryData).map((id) => (
        <div key={id}>
          <h2>Recommendations for ID {id}:</h2>
          <h3>Recommend 1:</h3>
          {countryData[id].recommend1.map((recommend, index) => (
            <div key={index}>
              <p>latitude: {recommend.latitude}</p>
              <p>longitude: {recommend.longitude}</p>
              <p>spot: {recommend.spot}</p>
              <p>description: {recommend.description}</p>
              <img src={recommend.image} alt="Spot Image" />
            </div>
          ))}

          <h3>Recommend 2:</h3>
          {countryData[id].recommend2.map((recommend, index) => (
            <div key={index}>
              <p>latitude: {recommend.latitude}</p>
              <p>longitude: {recommend.longitude}</p>
              <p>spot: {recommend.spot}</p>
              <p>description: {recommend.description}</p>
              <img src={recommend.image} alt="Spot Image" />
            </div>
          ))}

          <h3>Recommend 3:</h3>
          {countryData[id].recommend3.map((recommend, index) => (
            <div key={index}>
              <p>latitude: {recommend.latitude}</p>
              <p>longitude: {recommend.longitude}</p>
              <p>spot: {recommend.spot}</p>
              <p>description: {recommend.description}</p>
              <img src={recommend.image} alt="Spot Image" />
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleNavigate}>구글맵띄우기</button>
    </div>
  );
};

export default AiTravelModel;
