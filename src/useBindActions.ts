import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "./createRDX";

export function useBindActions<T extends Actions<any>>(
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
