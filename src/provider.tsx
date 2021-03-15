import React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
import { createReducerManager } from "./createReducerManager";

export type RDXContextValue = ReturnType<typeof createReducerManager>;

export const RDXContext = React.createContext<RDXContextValue | undefined>(
  undefined
);

export const RDXProvider: React.FC<{
  reducerManager: RDXContextValue;
  store: Store;
}> = ({ children, reducerManager, store }) => {
  return (
    <RDXContext.Provider value={reducerManager}>
      <Provider store={store}>{children}</Provider>
    </RDXContext.Provider>
  );
};
