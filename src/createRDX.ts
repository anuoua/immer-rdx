import { Immutable, produce } from "immer";

export type TPlayload<T extends any[]> = {
  type: string;
  args: T;
};

export type TProducers<T> = {
  [index: string]: (draft: T) => (...args: any[]) => void;
};

export type TActions<T extends TProducers<any>> = {
  [K in keyof T]: (
    ...args: Parameters<ReturnType<T[K]>>
  ) => TPlayload<Parameters<ReturnType<T[K]>>>;
};

export function createRDX<
  T1 extends string,
  T2 extends any,
  T3 extends TProducers<T2>
>(id: T1, initData: T2, option: T3) {
  const prefix = id + "/";
  const reducer = produce((draft: T2, playload: TPlayload<any>) => {
    const fn = option[playload.type.replace(prefix, "")];
    fn && fn(draft)(...playload.args);
  }, initData as Immutable<T2>);

  const actions = {} as TActions<T3>;

  Object.keys(option).forEach((key) => {
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
