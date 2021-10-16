import react, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { GET_CITY_BY_NAME } from "./Queries";
import { Grid } from "@mui/material";
import SearchBox from "./Components/SearchBox/SearchBox";

const weatherClient = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
});

interface IWeatherData {
  id: string;
  name: string;
  weather: {
    summary: {
      description: string;
      title: string;
      icon: string;
    };
  };
}
export default function App() {
  const [cityName, setCityName] = useState<string>("london");
  const [result, setResult] = useState<IWeatherData>();
  const { loading } = useQuery(GET_CITY_BY_NAME, {
    client: weatherClient,
    variables: {
      name: cityName,
    },
    onCompleted: (data) => {
      setResult(data.getCityByName);
    },
  });
  return (
    <Container maxWidth="lg" style={{ marginTop: 10 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={8}>
          <SearchBox defaultValue={cityName} onSelected={setCityName} />
        </Grid>
        {loading && (
          <Grid item md={8}>
            loading...
          </Grid>
        )}
        {!loading && !!result && (
          <Grid item md={8}>
            {result.weather.summary.description}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
