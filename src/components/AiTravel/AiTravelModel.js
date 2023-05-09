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

  if (!isLoaded) {
    const { id, latitude, longitude } = response[0];
    setLatitude(latitude);
    setLongitude(longitude);
    setIsLoaded(true);
  }

  return (
    <div>
      <h2>병신 모델</h2>
      {response.map((data) => {
        const { id, latitude, longitude, spot } = data;
        return (
          <div key={id}>
            <p>구분하기 위해 부여한 id?: {id}</p>
            <hr></hr>
            <p>latitude: {latitude}</p>
            <p>longitude: {longitude}</p>
            <p>spot: {spot}</p>
          </div>
        );
      })}
      <button onClick={handleNavigate}>구글맵띄우기</button>
    </div>
  );
};

export default AiTravelModel;
