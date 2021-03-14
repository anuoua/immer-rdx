import { createRDX } from "../src/createRDX";

const initData = {
  name: "app",
};

export const rdx = createRDX(
  "PAGE.APP",
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  },
  initData
);
