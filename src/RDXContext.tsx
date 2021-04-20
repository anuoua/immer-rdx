import React from "react";
import { createReducerManager } from "./createReducerManager";

export type RDXContextValue = ReturnType<typeof createReducerManager>;

export const RDXContext = React.createContext<RDXContextValue | undefined>(
  undefined
);
