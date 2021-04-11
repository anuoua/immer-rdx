import { createRDX } from "../src/createRDX";

const id = "PAGE.APP";

const state = {
  name: "xxx",
};

type State = typeof state;

const producers = {
  setName: (draft: State) => (name: string) => {
    draft.name = name;
  },

  useSetName: (draft: State) => (name: string) => {
    producers.setName(draft)(name);
  },
};

export const rdx = createRDX(id, state, producers);
