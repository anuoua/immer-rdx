# immer-rdx

use redux with immer easily.

## Install

```shell
npm i react redux react-redux immer immer-rdx
// yarn
yarn add react redux react-redux immer immer-rdx
```

## Example

### Static reducer usage

rdx is a object contain module id, reducer and actions which create by createRDX.

```javascript
// App.rdx.ts
import { createRDX } from "immer-rdx";

export const rdx = createRDX(
  "App",
  {
    name: "a",
  },
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  }
);

// const { id, reducer, actions } = rdx
```

create reducer with combineReducers.

```javascript
// redux.ts
import { applyMiddleware, combineReducers, createStore } from "redux";
import { rdx } from "./App.rdx";

export const store = createStore(
  combineReducers({
    [rdx.id]: rdx.reducer,
  }),
  {},
  applyMiddleware()
);
```

wrap provider.

```javascript
// index.tsx
import { render } from "react-dom";
import { store } from "./redux";

import App from "./App";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

use useRDX hook.

```javascript
// App.tsx
import { useRDX } from "immer-rdx";
import { rdx } from "./App.rdx";

export default function App() {
  const [state, actions] = useRDX(rdx);

  function handleClick() {
    actions.setName("b");
  }

  return (
    <div className="App">
      <button onClick={handleClick}>{state.name}</button>
    </div>
  );
}
```

online demo [codesandbox](https://codesandbox.io/s/static-reducer-usage-l4edq)

### Dynamic reducer usage

create reducerManager, and use it's rootReducer property as reducer of createStore.

```javascript
// redux.ts
import { createReducerManager } from "immer-rdx";
import { applyMiddleware, createStore } from "redux";

export const reducerManager = createReducerManager();

export const store = createStore(
  reducerManager.rootReducer,
  {},
  applyMiddleware()
);
```

wrap RDXContext.Provider with reducerManager.

```javascript
// index.tsx
import { RDXContext } from "immer-rdx";
import { render } from "react-dom";
import { store, reducerManager } from "./redux";

import App from "./App";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
render(
  <RDXContext.Provider value={reducerManager}>
    <Provider store={store}>
      <App />
    </Provider>
  </RDXContext.Provider>,
  rootElement
);
```

just createRDX and useRDX.

```javascript
// App.rdx.tsx
import { createRDX } from "immer-rdx";

export const rdx = createRDX(
  "App",
  {
    name: "a",
  },
  {
    setName: (draft) => (name: string) => {
      draft.name = name;
    },
  }
);

// App.tsx
import { useRDX } from "immer-rdx";
import { rdx } from "./App.rdx";

export default function App() {
  const [state, actions] = useRDX(rdx);

  function handleClick() {
    actions.setName("b");
  }

  return (
    <div className="App">
      <button onClick={handleClick}>{state.name}</button>
    </div>
  );
}
```

online demo [codesandbox](https://codesandbox.io/s/dynamic-reducer-usage-e577l)
