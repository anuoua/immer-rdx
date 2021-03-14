import React, { useCallback } from "react";
import { useRDX } from "../src/useRDX";
import { rdx } from "./App.rdx";

export function App() {
  const [state, actions] = useRDX(rdx);

  const handleClick = useCallback(() => {
    actions.setName("nihao");
  }, [actions]);

  return <div onClick={handleClick}>{state.name}</div>;
}
