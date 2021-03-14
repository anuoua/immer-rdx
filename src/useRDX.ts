import { shallowEqual, useSelector, useStore } from "react-redux";
import { createRDX } from "./createRDX";
import { useBindActions } from "./useBindActions";

export function useRDX<T extends ReturnType<typeof createRDX>>(rdx: T) {
  const store = useStore();
  if (store.replaceReducer) {
    // @ts-ignore
    store.reducerManager.add(rdx.id, rdx.reducer);
    // @ts-ignore
    store.replaceReducer(store.reducerManager.reduce);
  }
  const state = useSelector(
    (state: any) => state[rdx.id] as ReturnType<T["reducer"]>,
    shallowEqual
  );
  const actions = useBindActions(rdx.actions as T["actions"]);

  return [state, actions] as [typeof state, typeof actions];
}
