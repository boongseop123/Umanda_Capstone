import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  responseState,
  latitudeState,
  longitudeState,
  selectedcourseState,
} from "../../recoils/Recoil";
import { useNavigate } from "react-router";
import GoogleMapReact from "google-map-react";

const AiTravelMap = () => {
  const response = useRecoilValue(responseState);
  const [latitude, setLatitude] = useRecoilState(latitudeState);
  const [longitude, setLongitude] = useRecoilState(longitudeState);
  const selectedCourse = useRecoilValue(selectedcourseState);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(response) && response.length > 0) {
      const data = response.map((item) => {
        return {
          latitude: item.latitude,
          longitude: item.longitude,
        };
      });
      setLatitude(Number(data?.[0]?.latitude));
      setLongitude(Number(data?.[0]?.longitude));
    }
  }, [response, setLatitude, setLongitude]);

  const handleApiLoaded = (map, maps) => {
    if (Array.isArray(response) && response.length > 0) {
      // Add your markers here
      const markers = response.map((data) => {
        const { id, latitude, longitude, spot } = data;
        return new maps.Marker({
          position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          map,
          title: spot,
        });
      });

      // Define your path LatLng array
      const path = response.map((data) => ({
        lat: Number(data.latitude),
        lng: Number(data.longitude),
      }));

      // Create a polyline object passing the path and set the Map to render it.
      new maps.Polyline({
        path,
        map,
      });

      // Define your Map Bounds and set it as fitbounds to the Map.
      const bounds = new maps.LatLngBounds();
      path.forEach((location) => {
        bounds.extend(new maps.LatLng(location.lat, location.lng));
      });
      map.fitBounds(bounds);
    }
  };

  if (!response || !response.length) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBDyVqkHdc6nYQKeYovdTOOAwSuh--JVgg",
        }}
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {selectedCourse && (
          <div
            lat={selectedCourse.latitude}
            lng={selectedCourse.longitude}
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              background: "red",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
            }}
          ></div>
        )}
      </GoogleMapReact>
    </div>
  );
};

export default AiTravelMap;
