import React from "react";
import { createStore } from "redux";
import { createRDX } from "../src/createRDX";
import { createReducerManager } from "../src/createReducerManager";
import { useRDX } from "../src/useRDX";

export const rdx = createRDX(
  "test",
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  },
  { name: "no" }
);

export const reducerManager = createReducerManager({});

export const store = createStore(reducerManager.reduce);

(store as any).reducerManager = reducerManager;

export const TestApp = () => {
  const [state, actions] = useRDX(rdx);

  return (
    <div
      onClick={() => {
        actions.setName("hello");
      }}
    >
      {state.name}
    </div>
  );
};
