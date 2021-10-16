import gql from "graphql-tag";

export const GET_CITY_BY_NAME = gql`
  query GetCityByName($name: String!) {
    getCityByName(name: $name) {
      id
      name
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
      }
    }
  }
`;
