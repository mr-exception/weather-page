import react, { useState } from "react";
import Container from "@mui/material/Container";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import {
  GET_CITY_BY_NAME,
  ICityResult,
  IGetCityByNameResult,
} from "../../Queries";
import { Grid } from "@mui/material";
import SearchBox from "../../Components/SearchBox/SearchBox";
import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";

const weatherClient = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
});

const Home: React.FC = () => {
  const [cityName, setCityName] = useState<string>("london");
  const [result, setResult] = useState<ICityResult>();
  const { loading } = useQuery(GET_CITY_BY_NAME, {
    client: weatherClient,
    variables: {
      name: cityName,
    },
    onCompleted: (data: IGetCityByNameResult) => {
      setResult(data.getCityByName);
    },
  });
  return (
    <Container maxWidth="lg" style={{ marginTop: 10 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item md={8}>
          <SearchBox onSelected={setCityName} />
        </Grid>
        {loading && (
          <Grid item md={8}>
            <LoadingCard />
          </Grid>
        )}
        {!loading && !!result && (
          <Grid item md={8}>
            <SummaryCard data={result} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default Home;
