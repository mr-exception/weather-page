import react, { useEffect, useState } from "react";
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
import TempHistoryCard from "../../Components/HistoryCards/TempHistoryCard";
import { getHistory, IHistoryRecord } from "./API";
import HumidityHistoryCard from "../../Components/HistoryCards/HumidityHistoryCard";
import CloudsHistoryCard from "../../Components/HistoryCards/CloudsHistoryCard";

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

  const [loadingDetails, setLoadingDetails] = useState(false);
  const [historyRecord, setHistoryRecords] = useState<IHistoryRecord[]>([]);
  useEffect(() => {
    if (!result) return;
    (async () => {
      setLoadingDetails(true);
      const time = Math.ceil(Date.now() / 1000) - 24 * 3600;
      const results = await getHistory(
        result.coord.lat,
        result.coord.lon,
        time
      );
      setHistoryRecords(results);
      setLoadingDetails(false);
    })();
  }, [result?.id]);
  return (
    <Container maxWidth="lg" style={{ marginTop: 10 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item md={10}>
          <SearchBox onSelected={setCityName} />
        </Grid>
        {loading && (
          <Grid item md={10}>
            <LoadingCard />
          </Grid>
        )}
        {!loading && !!result && (
          <Grid item md={10}>
            <SummaryCard data={result} />
          </Grid>
        )}
        {!loadingDetails && historyRecord.length > 0 && (
          <Grid item md={10}>
            <TempHistoryCard records={historyRecord} />
          </Grid>
        )}
        {!loadingDetails && historyRecord.length > 0 && (
          <Grid item md={5}>
            <HumidityHistoryCard records={historyRecord} />
          </Grid>
        )}
        {!loadingDetails && historyRecord.length > 0 && (
          <Grid item md={5}>
            <CloudsHistoryCard records={historyRecord} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default Home;
