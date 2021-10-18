import { Axios } from "axios";
export interface IMapRecord {
  name: string;
  coords: {
    lon: number;
    lat: number;
  };
  status: string;
}
const axios = new Axios({
  baseURL: "https://api.openweathermap.org/data/2.5",
});
/**
 * this api returns current summary status of cities in a
 * specified bouding
 * @param bbox (bbox string)
 * @returns IMapRecord[]
 */
export const getMapStatus = (bbox: string): Promise<IMapRecord[]> =>
  axios
    .get<string>("/box/city", {
      params: {
        bbox,
        appid: "2fe507a6db54b13677d5020267c4ca7c",
        units: "metric",
      },
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      return data.list.map(
        (record: {
          name: string;
          coord: { Lon: number; Lat: number };
          weather: { main: string }[];
        }) => {
          return {
            name: record.name,
            coords: { lon: record.coord.Lon, lat: record.coord.Lat },
            status: record.weather[0].main,
          };
        }
      );
    });
