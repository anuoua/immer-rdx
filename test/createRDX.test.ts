import { createRDX } from "../src/";

describe("createRDX", () => {
  const rdx = createRDX(
    "test",
    {
      name: "no",
    },
    {
      setName: (draft) => (name: string) => {
        draft.name = name;
      },
    }
  );

  it("create", () => {
    expect(rdx).not.toBe(undefined);
  });

  it("check id", () => {
    expect(rdx.id).toBe("test");
  });

  it("check reduce", () => {
    const state = rdx.reducer(
      { name: "no" },
      { type: "test/setName", args: ["hello"] }
    );
    expect(state).toMatchObject({
      name: "hello",
    });
  });

  it("check actions", () => {
    const playload = rdx.actions.setName("hello");
    expect(playload).toMatchObject({
      type: "test/setName",
      args: ["hello"],
    });
  });
});
