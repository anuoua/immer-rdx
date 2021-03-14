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
  T2 extends TProducers<T3>,
  T3 extends any
>(id: T1, option: T2, initData: T3) {
  const prefix = id + "/";
  const reducer = produce((draft: T3, playload: TPlayload<any>) => {
    const fn = option[playload.type.replace(prefix, "")];
    fn && fn(draft)(...playload.args);
  }, initData as Immutable<T3>);

  const actions = {} as TActions<T2>;

  Object.keys(option).forEach((key) => {
    (actions as any)[key] = (...args: any[]) => ({
      type: prefix + key,
      data: "",
      args,
    });
  });

  return {
    id,
    reducer,
    actions,
  };
}
