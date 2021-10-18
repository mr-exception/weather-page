import react from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Containers/Home/Home";

export default function App() {
  console.log("test");
  return (
    <Router>
      <Switch>
        <Route path="/*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
