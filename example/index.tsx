import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { store, reducerManager } from "./redux";
import { RDXContext } from "../src";
import { Provider } from "react-redux";

render(
  <RDXContext.Provider value={reducerManager}>
    <Provider store={store}>
      <App />
    </Provider>
  </RDXContext.Provider>,
  document.getElementById("app")
);
