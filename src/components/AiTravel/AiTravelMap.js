import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { combinedSelectedSpotsArrayState } from "../../recoils/Recoil";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
  Marker as MarkerF,
  InfoWindow as InfoWindowF,
  OverlayView,
} from "@react-google-maps/api";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";
import styles from "./AiTravelSpotSelect.module.scss";
import Modal from "react-modal";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL_AI } from "../Constant";
import markerIcon from "../../resources/markerIcon.png"; // 커스텀 마커 이미지 경로
import foodMarker from "../../resources/foodMarker.png";
import Sheet from "react-modal-sheet";
import travelPin from "./resource/travelpin.png";

const AiTravelMap = () => {
  const [isOpen, setOpen] = useState(false);

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
  const [index, setIndex] = useState(0);
  const [hotelData, setHotelData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [showFoodInfo, setShowFoodInfo] = useState(false);
  const [shortestPathSpots, setShortestPathSpots] = useState([]);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (isLoaded && selectedCourse && selectedCourse.length > 1) {
      calculateDirections();
    }
  }, [isLoaded, selectedCourse]);

  useEffect(() => {
    fetchFoodData();
  }, []);

  const handleSelectOriginBritish = () => {
    setOrigin({ lat: 51.47011583720578, lng: -0.45429550256021695 });
    calculateDirections(); // origin 값이 설정된 후에 calculateDirections 호출
  };

  const handleSelectOriginFrance = () => {
    setOrigin({ lat: 49.01820265889724, lng: 2.5506204819845575 });
    calculateDirections(); // origin 값이 설정된 후에 calculateDirections 호출
  };

  const handleSelectOriginSpain = () => {
    setOrigin({ lat: 40.49211702675035, lng: -3.5619339790760756 });
    calculateDirections(); // origin 값이 설정된 후에 calculateDirections 호출
  };

  const handleSelectOriginItaly = () => {
    setOrigin({ lat: 51.47011583720578, lng: -0.45429550256021695 });
    calculateDirections(); // origin 값이 설정된 후에 calculateDirections 호출
  };

  const handleSelectOriginSwiss = () => {
    setOrigin({ lat: 51.47011583720578, lng: -0.45429550256021695 });
    calculateDirections(); // origin 값이 설정된 후에 calculateDirections 호출
  };

  const handleSelectDestinBritish = () => {
    setDestination({ lat: 51.47011583720578, lng: -0.45429550256021695 });
  };

  const handleSelectDestinFrance = () => {
    setDestination({ lat: 49.01820265889724, lng: 2.5506204819845575 });
  };

  const handleSelectDestionSpain = () => {
    setDestination({ lat: 40.49211702675035, lng: -3.5619339790760756 });
  };

  const calculateDirections = () => {
    const waypoints = selectedCourse.map((data, index) => ({
      location: {
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
      },
    }));

    const originValue = origin; // Assign the value of origin to a separate variable
    const destinationValue = destination;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: originValue,
        destination: destinationValue,
        optimizeWaypoints: true,
        waypoints: waypoints.slice(1, waypoints.length - 1).map((waypoint) => ({
          location: new window.google.maps.LatLng(
            waypoint.location.lat,
            waypoint.location.lng
          ),
        })),
        travelMode: window.google.maps.TravelMode.BICYCLING,
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

  useEffect(() => {
    setOpen(true); // 컴포넌트가 마운트될 때 자동으로 Sheet를 엽니다.
  }, []);

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
    setShowShortestPath((prevState) => !prevState);
  };

  const handleSelectedCourseMarkerClick = (data) => {
    setSelectedCourseMarker(data);
    console.log(123);
  };

  const renderFoodMarkers = () => {
    return foodData.map((data, index) => (
      <MarkerF
        key={index}
        position={{
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        }}
        onClick={() => handleMarkerClick(data)}
        icon={{
          url: foodMarker,
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      />
    ));
  };

  const handleShowFoodInfo = () => {
    setShowFoodInfo(!showFoodInfo);
  };

  const handleShowSelectedCourseMarkers = () => {
    if (selectedMarker) {
      setSelectedMarker(null); // selectedMarker 상태를 null로 설정하여 마커 숨김
    } else {
      const markers = renderSelectedCourseMarkers();
      setSelectedMarker(markers);
    }
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
        padding: "12px",
        borderRadius: "50%",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
      };

      const markerIconStyle = {
        url: markerIcon,
        scaledSize: new window.google.maps.Size(30, 30),
      };

      return (
        <React.Fragment key={index}>
          <MarkerF
            position={{
              lat: parseFloat(data.latitude),
              lng: parseFloat(data.longitude),
            }}
            icon={{
              url: travelPin,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => handleSelectedCourseMarkerClick(data)}
          >
            <div style={markerStyle}></div>
          </MarkerF>

          {selectedCourseMarker && selectedCourseMarker === data && (
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
        </React.Fragment>
      );
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const markers = renderSelectedCourseMarkers();

  return (
    <motion.div
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
                mapContainerStyle={{ height: "60%", width: "100%" }}
                center={{ lat: 51.5074, lng: -0.1278 }}
                zoom={13}
              >
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
                  <button onClick={handleShowShortestPath}>최단 경로</button>
                  <button onClick={handleShowSelectedCourseMarkers}>
                    내 관광지
                  </button>
                </div>
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
                {showShortestPath && directions && (
                  <DirectionsRenderer
                    directions={directions}
                    // options={{
                    //   markerOptions: {
                    //     icon: {
                    //       url: markerIcon,
                    //       scaledSize: new window.google.maps.Size(30, 30),
                    //       labelOrigin: new window.google.maps.Point(15, -10),
                    //     },
                    //   },
                    // }}
                  />
                )}

                {showFoodInfo && renderFoodMarkers()}
                {selectedMarker && renderSelectedCourseMarkers()}
              </GoogleMap>
              <div className={styles.br}>
                <div className={styles.br}>123</div>
              </div>
              <div className={styles.mapbottom}>
                <div className={styles.text}>출발지를 선택해주세요!</div>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectOriginBritish}
                >
                  영국
                </button>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectOriginFrance}
                >
                  프랑스
                </button>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectOriginSpain}
                >
                  스페인
                </button>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectOriginSwiss}
                >
                  스위스
                </button>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectOriginItaly}
                >
                  이탈리아
                </button>
                <button className={styles.air}>항공편 정보보러가기 >></button>
              </div>
              <div className={styles.mapbottom}>
                <div className={styles.text}>도착지를 선택해주세요!</div>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectDestinBritish}
                >
                  영국
                </button>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectDestinFrance}
                >
                  프랑스
                </button>
                <button
                  className={styles.mapbutton}
                  onClick={handleSelectDestionSpain}
                >
                  스페인
                </button>
                <button className={styles.mapbutton}>스위스</button>
                <button className={styles.mapbutton}>이탈리아</button>
                <button className={styles.air}>항공편 정보보러가기 >></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiTravelMap;
