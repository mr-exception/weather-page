import gql from "graphql-tag";

export interface ICityResult {
  id: string;
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    summary: {
      title: string;
      description: string;
      icon: string;
    };
    temperature: {
      actual: number;
      feelsLike: number;
      min: number;
      max: number;
    };
    clouds: {
      all: number;
      visibility: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
  };
}
export interface IGetCityByNameResult {
  getCityByName: ICityResult;
}
export const GET_CITY_BY_NAME = gql`
  query GetCityByName($name: String!) {
    getCityByName(name: $name, config: { units: metric }) {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        clouds {
          all
          visibility
          humidity
        }
        wind {
          speed
          deg
        }
      }
    }
  }
`;
