import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { store, reducerManager } from "./redux";
import { RDXProvider } from "../src";

render(
  <RDXProvider store={store} reducerManager={reducerManager}>
    <App />
  </RDXProvider>,
  document.getElementById("app")
);
