import { Immutable, produce } from "immer";

export type Playload<T extends any[]> = {
  type: string;
  args: T;
};

export type Producers<T> = {
  [index: string]: (draft: T) => (...args: any[]) => void;
};

export type Actions<T extends Producers<any>> = {
  [K in keyof T]: (
    ...args: Parameters<ReturnType<T[K]>>
  ) => Playload<Parameters<ReturnType<T[K]>>>;
};

export const separate = "/";

export function createRDX<
  T1 extends string,
  T2 extends any,
  T3 extends Producers<T2>
>(id: T1, initData: T2, producers: T3) {
  const prefix = id + separate;
  const reducer = produce((draft: T2, playload: Playload<any>) => {
    const fn = producers[playload.type.replace(prefix, "")];
    fn && fn(draft)(...playload.args);
  }, initData as Immutable<T2>);

  const actions = {} as Actions<T3>;

  Object.keys(producers).forEach((key) => {
    const type = prefix + key;
    const actionFn = (...args: any[]) => ({
      type,
      args,
    });
    Object.defineProperty(actionFn, "name", { value: type });
    (actions as any)[key] = actionFn;
  });

  return {
    id,
    reducer,
    actions,
  };
}
