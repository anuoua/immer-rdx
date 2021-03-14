import { Reducer } from "react";
import { Action, combineReducers } from "redux";
import { ReducersMapObject } from "redux";

export function createReducerManager<S, A extends Action>(
  initialReducers: ReducersMapObject<S, A> = {} as ReducersMapObject<S, A>
) {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);
  let keysToRemove: string[] = [];

  return {
    getReducerMap: () => reducers as any,

    reduce: (state: any, action: any) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return Object.keys(reducers).length === 0
        ? state
        : combinedReducer(state, action);
    },

    add: (key: string, reducer: Reducer<any, any>) => {
      // @ts-ignore
      if (!key || reducers[key]) {
        return;
      }

      // @ts-ignore
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },

    remove: (key: string) => {
      // @ts-ignore
      if (!key || !reducers[key]) {
        return;
      }

      // @ts-ignore
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
