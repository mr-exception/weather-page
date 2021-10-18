import { Axios } from "axios";

export interface ICityRecord {
  name: string;
  country_name: string;
}

const axios = new Axios({
  baseURL: "http://api.geonames.org",
});
export const searchCities = (term: string): Promise<ICityRecord[]> =>
  axios
    .get<string>("/search", {
      params: { username: "mrexception", q: term, type: "json" },
    })
    .then((response) => {
      const data = JSON.parse(response.data);
      const results: ICityRecord[] = [];
      data.geonames.forEach((item: { name: string; countryName: string }) => {
        if (results.find((r) => r.name === item.name)) {
          return;
        }
        results.push({
          name: item.name,
          country_name: item.countryName,
        });
      });
      return results;
    });
