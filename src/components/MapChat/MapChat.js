import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import MapModal from "./Modal/MapModal";
import MapModal2 from "./Modal/MapModal2";
import styles from "./MapChat.module.scss";

const MapChat = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/accompany");
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function (error) {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  /* Modal 관련 state와 함수들 */

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const GoogleApi = "AIzaSyD6HTEklvN8AWBgtd_RdesV5c2PHllWu - Q";

  const handleMarkerClick1 = (marker) => {
    setSelectedMarker(marker);
    setIsModalOpen1(true);
    setIsModalOpen2(false); // Ensure the second modal is closed when the first one opens
  };

  const handleMarkerClick2 = (marker) => {
    setSelectedMarker(marker);
    setIsModalOpen2(true);
    setIsModalOpen1(false); // Ensure the first modal is closed when the second one opens
  };

  const handleCloseModal = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  /* 임의의 위도, 경도 설정 */
  const myposition = { lat: 51.529628, lng: -0.123136 };
  const [location, setLocation] = useState({ myposition });

  const position1 = { lat: 51.526978, lng: -0.114998 };
  const position2 = { lat: 51.521491, lng: -0.130416 };

  return (
    <div className={styles.container}>
      <LoadScript googleMapsApiKey={GoogleApi}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={location}
          onClick={handleCloseModal}
        >
          {window.google && (
            <>
              <Marker
                position={myposition}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "red",
                  fillOpacity: 1,
                  strokeColor: "#ef455a",
                  strokeOpacity: 0.5,
                  scale: 10,
                }}
              />
              <Marker
                position={position1}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeColor: "#ef455a",
                  strokeOpacity: 1,
                  scale: 10,
                }}
                onClick={() => handleMarkerClick1(position1)}
              />
              <Marker
                position={position2}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "white",
                  fillOpacity: 1,
                  strokeColor: "#ef455a",
                  strokeOpacity: 1,
                  scale: 10,
                }}
                onClick={() => handleMarkerClick2(position2)}
              />
            </>
          )}
        </GoogleMap>
      </LoadScript>
      {isModalOpen1 && (
        <MapModal
          isOpen={isModalOpen1}
          marker={selectedMarker}
          onClose={handleCloseModal}
          className={styles.modalEnter}
        />
      )}
      {isModalOpen2 && (
        <MapModal2
          isOpen={isModalOpen2}
          marker={selectedMarker}
          onClose={handleCloseModal}
          className={styles.modalEnter}
        />
      )}
      <button className={styles.goBack} onClick={goBack}></button>
    </div>
  );
};

export default MapChat;
