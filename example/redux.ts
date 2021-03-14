import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReducerManager } from "../src/createReducerManager";

const reducerManager = createReducerManager({
  hello: (state = {}) => state,
});

export const store = createStore(
  reducerManager.reduce,
  composeWithDevTools(applyMiddleware())
);

(store as any).reducerManager = reducerManager;
