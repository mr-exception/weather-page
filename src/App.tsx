import react from "react";
import Home from "./Containers/Home/Home";
import Map from "./Containers/Map/Map";

export default function App() {
  /**
   * since this project is going to be served in github pages. we don't have
   * urls like `https://domain.com/some. so we can't use react-router-dom or
   * react-navigation. best solution is separaing routes by query params
   */

  const hash = location.hash.replace("#", "");
  if (hash === "map") {
    return <Map />;
  }

  return <Home defaultCity={hash === "" ? null : hash} />;
}
