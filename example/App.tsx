import React, { useCallback } from "react";
import { createRDX } from "../src/createRDX";
import { useRDX } from "../src/useRDX";
import { rdx } from "./App.rdx";

const testRdx = createRDX(
  "TEST",
  {
    name: "test",
  },
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  }
);

export function App() {
  const [state, actions] = useRDX(rdx);
  const [testState, testActions] = useRDX(testRdx);

  const handleClick = useCallback(() => {
    actions.setName("clicked");
  }, [actions]);

  const handleClick2 = useCallback(() => {
    testActions.setName("tested");
  }, [testActions]);

  return (
    <div>
      <button onClick={handleClick}>{state.name}</button>
      <button onClick={handleClick2}>{testState.name}</button>
    </div>
  );
}
