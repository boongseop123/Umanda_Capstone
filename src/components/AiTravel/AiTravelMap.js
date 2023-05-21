import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { combinedSelectedSpotsArrayState } from "../../recoils/Recoil";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
  MarkerF,
  InfoWindowF,
  Polyline,
  OverlayView,
  DirectionsService,
} from "@react-google-maps/api";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";
import styles from "./AiTravelSpotSelect.module.scss";
import Modal from "react-modal";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL_AI } from "../Constant";
import markerIcon from "../../resources/markerIcon.png"; // 커스텀 마커 이미지 경로

const AiTravelMap = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [selectedCourse] = useRecoilState(combinedSelectedSpotsArrayState);
  const [directions, setDirections] = useState(null);
  const libraries = ["places", "directions"]; // libraries를 상수로 유지
  const [selectedCourseMarker, setSelectedCourseMarker] = useState(null);
  const [selectedFoodMarker, setSelectedFoodMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showShortestPath, setShowShortestPath] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD6HTEklvN8AWBgtd_RdesV5c2PHllWu-Q",
    libraries: libraries,
  });
  const [hotelData, setHotelData] = useState([]);
  const [foodData, setFoodData] = useState([]); // 변수명을 `setFoodData`로 수정
  const [showFoodInfo, setShowFoodInfo] = useState(false);

  useEffect(() => {
    if (isLoaded && selectedCourse && selectedCourse.length > 1) {
      calculateDirections();
    }
  }, [isLoaded, selectedCourse]);

  useEffect(() => {
    fetchFoodData();
  }, []);

  const calculateDirections = () => {
    console.log(selectedCourse);
    const waypoints = selectedCourse.map((data, index) => ({
      location: {
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
      },
      label: (index + 1).toString(),
    }));

    const origin = { lat: 51.47011583720578, lng: -0.45429550256021695 };
    const destination = { lat: 37.42032503555593, lng: -5.8930285423288185 };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        optimizeWaypoints: true, // 경유지 최적화 여부 설정 (선택 사항)
        waypoints: waypoints.slice(1, waypoints.length - 1).map((waypoint) => ({
          location: new window.google.maps.LatLng(
            waypoint.location.lat,
            waypoint.location.lng
          ),
        })),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Directions request failed with status: ", status);
        }
      }
    );
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMarkerClick = (data) => {
    setSelectedFoodMarker(data);
  };

  const handleShowShortestPath = () => {
    setShowShortestPath(true);
  };

  const handleSelectedCourseMarkerClick = (data) => {
    setSelectedCourseMarker(data);
  };

  const renderFoodMarkers = () => {
    return foodData.map((data, index) => (
      <OverlayView
        key={index}
        position={{
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div className={styles.customMarker}>
          <img
            src={markerIcon}
            alt={data.name}
            className={styles.markerImage}
            onClick={() => handleMarkerClick(data)}
          />
        </div>
      </OverlayView>
    ));
  };

  const handleShowFoodInfo = () => {
    setShowFoodInfo(!showFoodInfo);
  };

  const fetchFoodData = () => {
    axios
      .get(`${API_URL_AI}/restaurant`, {})
      .then((response) => {
        setFoodData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  };

  const renderSelectedCourseMarkers = () => {
    return selectedCourse.map((data, index) => {
      const markerStyle = {
        background: "gray",
        color: "white",
        padding: "13px",
        borderRadius: "38%",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "cursor",
      };

      const markerIconStyle = {
        url: markerIcon,
        scaledSize: new window.google.maps.Size(30, 30),
      };

      return (
        <OverlayView
          key={index}
          position={{
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude),
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            className={styles.customMarker}
            onClick={() => handleSelectedCourseMarkerClick(data)}
          >
            <div style={markerStyle}>{index + 1}</div>
          </div>
        </OverlayView>
      );
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  return (
    <motion.div
      /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div className={styles.Frame1}>
          <Header />
          <div
            className={`${styles.spots} ${
              isDesktop ? styles.desktopFrame2 : styles.mobileFrame2
            }`}
            style={{
              display: "flex",
              flexWrap: "wrap",
              border: "1px solid white",
              boxShadow: "0px 3px 6px #a7999a3e",
              backgroundColor: "white",
              borderTopLeftRadius: "45px",
              borderTopRightRadius: "45px",
              margin: "0 auto",
              overflowY: "auto",
              minHeight: "200px",
              maxWidth: "550px",
            }}
          >
            <div style={{ height: "100vh", width: "100%" }}>
              <GoogleMap
                options={{ disableDefaultUI: true }}
                mapContainerStyle={{ height: "100%", width: "100%" }}
                center={{ lat: 51.5074, lng: -0.1278 }}
                zoom={13}
              >
                {directions && <DirectionsRenderer directions={directions} />}
                {renderSelectedCourseMarkers()}
                {selectedCourseMarker && (
                  <InfoWindowF
                    position={{
                      lat: parseFloat(selectedCourseMarker.latitude),
                      lng: parseFloat(selectedCourseMarker.longitude),
                    }}
                    onCloseClick={() => setSelectedCourseMarker(null)}
                  >
                    <div>
                      <h3>{selectedCourseMarker.spot}</h3>
                      <ul>
                        <li>
                          <img
                            src={selectedCourseMarker.URI}
                            alt={selectedCourseMarker.spot}
                            className={styles.markerImage}
                          />
                          <p>{selectedCourseMarker.description}</p>
                        </li>
                      </ul>
                    </div>
                  </InfoWindowF>
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button onClick={handleShowFoodInfo}>음식점</button>
                </div>
                {showFoodInfo && renderFoodMarkers()}
                {selectedFoodMarker && (
                  <InfoWindowF
                    position={{
                      lat: parseFloat(selectedFoodMarker.latitude),
                      lng: parseFloat(selectedFoodMarker.longitude),
                    }}
                    onCloseClick={() => setSelectedFoodMarker(null)}
                  >
                    <div>
                      <div>
                        <h3>{selectedFoodMarker.name}</h3>
                        <p>평균 가격: {selectedFoodMarker["price range"]}</p>
                        <p>요리스타일: {selectedFoodMarker.cuisines}</p>
                        <p>인기음식: {selectedFoodMarker["special diets"]}</p>
                        <p>식사메뉴: {selectedFoodMarker.meals}</p>
                        <p>가게 특징: {selectedFoodMarker.features}</p>
                      </div>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiTravelMap;
