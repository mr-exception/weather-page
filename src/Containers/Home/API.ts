import { Axios } from "axios";

export interface IHistoryRecord {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
  rain: { [key: string]: number };
}
const axios = new Axios({
  baseURL: "https://api.openweathermap.org/data/2.5/onecall",
});
/**
 * returns hourly weather report of a given coordinate
 * @param lat
 * @param lon
 * @param dt
 * @returns IHistoryRecord[]
 */
export const getHistory = (
  lat: number,
  lon: number,
  dt: number
): Promise<IHistoryRecord[]> =>
  axios
    .get<string>("/timemachine", {
      params: {
        lon,
        lat,
        dt,
        appid: "2fe507a6db54b13677d5020267c4ca7c",
        units: "metric",
      },
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      return data.hourly;
    });
