/**
 * @jest-environment jsdom
 */
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount } from "enzyme";
import { store, TestApp } from "./components/AppUseRDX";
import { RDXContext } from "../src";
import { reducerManager } from "../example/redux";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

describe("useRDX", () => {
  const wrapper = mount(
    <RDXContext.Provider value={reducerManager}>
      <Provider store={store}>
        <TestApp />
      </Provider>
    </RDXContext.Provider>
  );

  it("test actions", () => {
    wrapper.find("div").simulate("click");
    expect(wrapper.text()).toBe("hello");
  });
});
