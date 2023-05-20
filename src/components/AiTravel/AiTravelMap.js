import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { combinedSelectedSpotsArrayState } from "../../recoils/Recoil";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  MarkerClusterer,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";
import styles from "./AiTravelSpotSelect.module.scss";
import Modal from "react-modal";
import { motion } from "framer-motion";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const AiTravelMap = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [selectedCourse] = useRecoilState(combinedSelectedSpotsArrayState);
  const [directions, setDirections] = useState(null);
  const [clusterer, setClusterer] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showShortestPath, setShowShortestPath] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD6HTEklvN8AWBgtd_RdesV5c2PHllWu-Q",
    libraries: ["places", "directions"],
  });

  useEffect(() => {
    if (isLoaded && selectedCourse && selectedCourse.length > 1) {
      calculateDirections();
    }
  }, [isLoaded, selectedCourse]);

  const calculateDirections = () => {
    const waypoints = selectedCourse.map((data, index) => ({
      location: {
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
      },
      label: (index + 1).toString(),
    }));

    console.log("Selected Course Data:", selectedCourse);

    const origin = "London Heathrow Airport, UK";
    const destination = "Gare du Nord, Paris, France";

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        optimizeWaypoints: true, // 경유지 최적화 여부 설정 (선택 사항)
        waypoints: waypoints
          .slice(1, waypoints.length - 1)
          .map((waypoint) => waypoint.location),
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
    setModalContent(
      selectedCourse.map((data, index) => ({
        index: index + 1,
        spot: data.spot,
        description: data.description,
        uri: data.URI,
      }))
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent([]);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClusterClick = (cluster) => {
    const markers = cluster.getMarkers();
    setSelectedMarker(markers);
  };

  const handleShowShortestPath = () => {
    setShowShortestPath(true);
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
                mapContainerStyle={{ height: "100%", width: "100%" }}
                center={{ lat: 51.5074, lng: -0.1278 }}
                zoom={13}
              >
                {directions && <DirectionsRenderer directions={directions} />}
                <MarkerClusterer
                  onLoad={(clusterer) => setClusterer(clusterer)}
                  onClick={handleClusterClick}
                >
                  {(clusterer) =>
                    selectedCourse.map((data, index) => (
                      <Marker
                        key={index}
                        position={{
                          lat: parseFloat(data.latitude),
                          lng: parseFloat(data.longitude),
                        }}
                        label={(index + 1).toString()}
                        onClick={() => handleShowModal()}
                        clusterer={clusterer}
                      />
                    ))
                  }
                </MarkerClusterer>
                {selectedMarker && Array.isArray(selectedMarker) && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(selectedMarker[0].latitude),
                      lng: parseFloat(selectedMarker[0].longitude),
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div>
                      <button onClick={handleShowModal}>최단 경로 보기</button>

                      <h3>Selected Markers</h3>
                      <ul>
                        {selectedMarker.map((marker, index) => (
                          <li key={index}>
                            <h4>{marker.spot}</h4>
                            <p>{marker.description}</p>
                            <a
                              href={marker.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Image
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </InfoWindow>
                )}
                {showShortestPath &&
                  directions &&
                  directions.routes[0].legs.map((leg, index) => (
                    <React.Fragment key={index}>
                      <Marker
                        position={leg.start_location}
                        icon={{
                          url: "IMAGE_URL",
                          scaledSize: new window.google.maps.Size(30, 30),
                        }}
                      />
                      {index === directions.routes[0].legs.length - 1 ? (
                        <Marker
                          position={leg.end_location}
                          icon={{
                            url: "IMAGE_URL",
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                        />
                      ) : null}
                    </React.Fragment>
                  ))}
                {showShortestPath && directions && (
                  <Polyline
                    path={directions.routes[0].overview_path}
                    options={{
                      strokeColor: "#0000FF",
                      strokeOpacity: 0.8,
                      strokeWeight: 5,
                      icons: [
                        {
                          icon: {
                            path: window.google.maps.SymbolPath
                              .FORWARD_CLOSED_ARROW,
                          },
                          offset: "100%",
                        },
                      ],
                    }}
                  />
                )}
              </GoogleMap>
              <button onClick={handleShowShortestPath}>최단경로 보기</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiTravelMap;
