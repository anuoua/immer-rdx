import { useContext } from "react";
import { shallowEqual, useSelector, useStore } from "react-redux";
import { createRDX } from "./createRDX";
import { RDXContext } from "./RDXContext";
import { useBindActions } from "./useBindActions";

export function useRDX<T extends ReturnType<typeof createRDX>>(rdx: T) {
  const store = useStore();
  const reducerManager = useContext(RDXContext);

  if (reducerManager && !reducerManager.getReducerMap()[rdx.id]) {
    reducerManager.add(rdx.id, rdx.reducer);
    store.replaceReducer(reducerManager.rootReducer);
  }

  const state = useSelector((state: any) => {
    const selectedState = state[rdx.id];
    if (!selectedState) throw new Error(`module ${rdx.id} not found`);
    return selectedState as ReturnType<T["reducer"]>;
  }, shallowEqual);

  const actions = useBindActions(rdx.actions as T["actions"]);

  return [state, actions] as [typeof state, typeof actions];
}
