/**
 * this compnent represents a map which has markers on each city
 * in viewport. markers are icons to tell user what climate is in that city
 */
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Leaflet from "leaflet";

import Cloudy from "../../Icons/cloudy.png";
import SunCloudy from "../../Icons/sun-cloudy.png";
import Foggy from "../../Icons/foggy.png";
import Sunny from "../../Icons/sunny.png";
import { getMapStatus } from "./API";

// icons

const cloudyIcon = Leaflet.icon({
  iconUrl: Cloudy,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});
const sunCloudyIcon = Leaflet.icon({
  iconUrl: SunCloudy,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});
const foggyIcon = Leaflet.icon({
  iconUrl: Foggy,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});
const sunnyIcon = Leaflet.icon({
  iconUrl: Sunny,
  iconSize: [20, 20],
  iconAnchor: [0, 0],
});

/**
 * converts weather status into a link to an icon
 * that represents the weather status
 * @param value string
 * @returns string
 */
function getIcon(value: string): Leaflet.Icon {
  switch (value) {
    case "Clouds":
      return cloudyIcon;
    case "Clear":
      return sunnyIcon;
    case "Fog":
    case "Mist":
      return foggyIcon;
    default:
      return sunCloudyIcon;
  }
}
const Map: React.FC = () => {
  const [map, setMap] = useState<Leaflet.Map>();
  // default center of map
  const [center, setCenter] = useState<{ lat: number; lon: number }>({
    lat: 49.325121,
    lon: 3.224152,
  });
  /**
   * calculates bbox based on current center
   * @returns string
   */
  function calculateBbox() {
    const lonLeft = Math.floor(center.lon - 2);
    const lonRight = Math.floor(center.lon + 2);
    const latTop = Math.floor(center.lat + 2);
    const latBottom = Math.floor(center.lat - 2);
    return `${lonLeft},${latBottom},${lonRight},${latTop},7`;
  }
  // initializes map for the first time
  useEffect(() => {
    if (!!map) return;
    setMap(
      Leaflet.map("map", {
        minZoom: 7,
        maxZoom: 7,
        zoomControl: false,
      }).setView([48.5919574, 2.8749632], 7)
    );
  }, []);
  useEffect(() => {
    if (!map) return;
    // initializes tile layer for the first time
    Leaflet.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        id: "mapbox/light-v10",
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);
    Leaflet.marker([center.lat, center.lon], { icon: cloudyIcon }).addTo(map);
    // listens to dragend and updates the center
    map.on("dragend", () => {
      const center = map.getCenter();
      setCenter({ lat: center.lat, lon: center.lng });
    });
  }, [map]);
  // listens to center change and updates markers on center change
  // also listens to map change first time (because map is not initialized in first load)
  useEffect(() => {
    if (!center || !map) return;
    // load data
    (async () => {
      const results = await getMapStatus(calculateBbox());
      results.forEach((record) => {
        Leaflet.marker([record.coords.lat, record.coords.lon], {
          icon: getIcon(record.status),
        }).addTo(map);
      });
    })();
  }, [center, map]);
  return (
    <Container maxWidth="lg" style={{ marginTop: 10 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item md={11} style={{ display: "flex" }}>
          <div id="map" style={{ flex: 1, height: "90vh" }} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Map;
