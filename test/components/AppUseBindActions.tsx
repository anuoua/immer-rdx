import React from "react";
import { useSelector } from "react-redux";
import { combineReducers, createStore } from "redux";
import { createRDX } from "../../src/createRDX";
import { useBindActions } from "../../src/useBindActions";

export const rdx = createRDX(
  "test",
  { name: "no" },
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  }
);

export const reducer = combineReducers({
  [rdx.id]: rdx.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = createStore(reducer);

export const TestApp = () => {
  const state = useSelector((state: RootState) => state[rdx.id]);
  const actions = useBindActions(rdx.actions);

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
