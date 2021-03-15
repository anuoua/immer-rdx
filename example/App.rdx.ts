import { createRDX } from "../src/createRDX";

export const rdx = createRDX(
  "PAGE.APP",
  {
    name: "app",
  },
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  }
);
