import react from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Containers/Home/Home";
import Map from "./Containers/Map/Map";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
