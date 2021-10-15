import react, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useQuery } from "@apollo/client";
import { GET_CITY_BY_NAME } from "./Queries";

export default function App() {
  const { data, loading } = useQuery(GET_CITY_BY_NAME);

  function loadMyLocation(): void {
    if (!("geolocation" in navigator)) {
      console.log("geo not supported");
      return;
    }
    console.log("here!");
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords);
    });
  }
  if (loading) return <Container maxWidth="lg">it's loading</Container>;
  const result = data.getCityByName;

  return (
    <Container maxWidth="lg">
      <p>id: {result.id}</p>
      <p>name: {result.name}</p>
      <button onClick={loadMyLocation}>load my location information</button>
    </Container>
  );
}
