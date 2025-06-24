import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import RouterMap from "./routes";
import "./index.css";

render(
  () => (
    <Router>
      <RouterMap />
    </Router>
  ),
  document.getElementById("root")!
);