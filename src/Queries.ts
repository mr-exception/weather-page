import gql from "graphql-tag";

export const GET_CITY_BY_NAME = gql`
  {
    getCityByName(name: "rasht") {
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
