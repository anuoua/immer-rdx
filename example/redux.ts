import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReducerManager } from "../src/createReducerManager";

export const reducerManager = createReducerManager();

export const store = createStore(
  reducerManager.rootReducer,
  composeWithDevTools(applyMiddleware())
);
