import { createReducerManager } from "../src";

describe("createReducerManager", () => {
  const manager = createReducerManager({
    app: (state = {}) => state,
  });

  it("create", () => {
    expect(manager).not.toBe(undefined);
  });

  it("check reduce", () => {
    expect(manager.reduce({ app: { name: "no" } }, {})).toMatchObject({
      app: { name: "no" },
    });
  });

  it("check getReducerMap", () => {
    expect(manager.getReducerMap().app({ name: "no" })).toMatchObject({
      name: "no",
    });
  });

  it("check add", () => {
    manager.add("abc", () => 1);
    expect(manager.getReducerMap().abc()).toBe(1);
  });

  it("remove", () => {
    manager.remove("abc");
    expect(manager.getReducerMap().abc).toBe(undefined);
  });
});
