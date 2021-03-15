import React from "react";
import { createStore } from "redux";
import { createRDX } from "../../src/createRDX";
import { createReducerManager } from "../../src/createReducerManager";
import { useRDX } from "../../src/useRDX";

export const rdx = createRDX(
  "test",
  { name: "no" },
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  }
);

export const reducerManager = createReducerManager({});

export const store = createStore(reducerManager.rootReducer);

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
