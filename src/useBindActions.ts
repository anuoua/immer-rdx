import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { TActions } from "./createRDX";

export function useBindActions<T extends TActions<any>>(
  actions: T,
  deps?: any[]
) {
  const dispatch = useDispatch();
  const bindActions = useMemo(
    () => {
      return bindActionCreators(actions, dispatch);
    },
    deps ? [actions, dispatch, ...deps] : [actions, dispatch]
  );
  return bindActions;
}
