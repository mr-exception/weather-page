import react from "react";
import Home from "./Containers/Home/Home";
import Map from "./Containers/Map/Map";
import Layout from "./Layout/Layout";

export default function App() {
  /**
   * since this project is going to be served in github pages. we don't have
   * urls like `https://domain.com/some. so we can't use react-router-dom or
   * react-navigation. best solution is separaing routes by hash params.
   * hash params can be change in runtime without refreshing the page, so we
   * can update the url to make it sharable
   */

  const hash = location.hash.replace("#", "");
  if (hash === "map") {
    return (
      <Layout>
        <Map />
      </Layout>
    );
  }

  return (
    <Layout>
      <Home defaultCity={hash === "" ? null : hash} />
    </Layout>
  );
}
